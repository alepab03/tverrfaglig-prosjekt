import express from 'express';
import { connectToDB } from '../lib/db.ts';
import bcrypt from 'bcrypt';

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

export default router;