import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise'

export async function POST(req:Request){
    const connection = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
    });}