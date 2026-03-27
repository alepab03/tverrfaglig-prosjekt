import express from 'express';
import { connectToDB } from '../lib/db.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (request, response) => {
    const {username, password} = request.body;
    try {
        const db = await connectToDB();
        const [rows] = await db.query('SELECT * FROM Users WHERE username = ?', [username]);
        if (rows.length > 0) {
            return response.status(409).json({message : 'user already exists'});
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO Users (username, password) VALUES (?, ?)', [username, hashPassword]);

        response.status(201).json({message: 'user created successfully'});
    } catch(error) {
        response.status(500).json(error);
        console.log(error);
    }
});

router.post('/login', async (request, response) => {
    const {username, password} = request.body;
    try {
        const db = await connectToDB();
        const [rows] = await db.query('SELECT * FROM Users WHERE username = ?', [username]);
        if (rows.length === 0) {
            return response.status(404).json({message : 'user does not exist'});
        }

        const isMatch = await bcrypt.compare(password, rows[0].Password);
        if (!isMatch) {
            return response.status(401).json({message : 'wrong password'});
        }
        const token = jwt.sign({id: rows[0].UserId}, process.env.JWT_KEY, {expiresIn: '3h'});
        response.status(201).json({token: token});
    } catch(error) {
        response.status(500).json(error);
        console.log(error);
    }
});

interface JwtPayload {
    id: number;
}

const verifyToken = async (request: any, response: any, next: any) => {
    try {
        const token = request.headers['authorization'].split(' ')[1];
        if(!token) {
            return response.status(403).json({message : "No token provided"});
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY) as JwtPayload;
        request.userId = decoded.id;
        next();
    } catch (error) {
        return response.status(500).json({message: "server error"});
    }
};

router.get('/home', verifyToken, async (request, response) => {
    try {
        const db = await connectToDB();
        const [rows] = await db.query('SELECT * FROM Users WHERE UserID = ?', [request.userId]);
        if (rows.length === 0){
            return response.status(404).json({message: 'user does not exist'});
        }
        console.log("user:", rows[0]);
        return response.status(201).json({user: rows[0]});
    } catch(error) {
        return response.status(500).json({message: "server error"});
    }
});

router.get('/users', async (request, response) => {
    try {
        const db = await connectToDB();
        const [rows] = await db.query('SELECT UserId, Username, Permission FROM Users');
        return response.status(201).json({users: rows});
    } catch(error) {
        console.log(error);
        return response.status(500).json({message: "server error"});
    }
});

router.post('/edit-user', async (request, response) => {
    const {userId, deletion, permission} = request.body;
    try {
        const db = await connectToDB();
        if (deletion === true) {
            await db.query('DELETE FROM Users WHERE UserId = ?', [userId]);
        } else {
            await db.query('UPDATE Users SET Permission = ? WHERE UserId = ?', [permission, userId]);
        }
        return response.status(201).json({message: 'user successfully edited'});
    } catch(error) {
        return response.status(500).json({message: 'server error'});
    }
});
export default router;