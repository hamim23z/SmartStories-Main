import { NextResponse } from 'next/server';
import mysql from 'mysql2';
import dotenv from 'dotenv'

dotenv.config();

// connection to mysql database
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export async function POST(req) {
    try {
        const data = await req.json();
        const { name, age, location, story, stayPrivate } = data;

        if (!name || !story) {
            return NextResponse.json({ message: 'Name and story are required' }, { status: 400 });
        }

        const stayPrivateValue = stayPrivate === 'Yes' ? 1 : 0;
        const insertStory = new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO stories (name, age, location, story, stay_private) VALUES (?, ?, ?, ?, ?)',
                [name, age, location, story, stayPrivateValue],
                (err, result) => {
                    if (err) {
                        reject(err); 
                    } else {
                        resolve(result);
                    }
                }
            );
        });
        await insertStory;
        return NextResponse.json({ message: 'Story submitted successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error handling the request:', error);
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}