import { NextResponse } from "next/server";
import pool from "../../libs/mysql";

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

export async function GET() {
    try {
        const db = await pool.getConnection()
        const query = 'SELECT * FROM sensor_data LIMIT 100'
        const [rows, fields] = await db.execute(query)
        db.release()

        console.log(rows)

        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
    

    
}