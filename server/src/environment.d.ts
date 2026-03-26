import express from 'express';

declare global {
    namespace Express {
        interface Request {
            userId: number;
        } interface Response {
            userId: number;
        }
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_HOST: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_NAME: string;
            PORT: number;
            JWT_KEY: string;
        }
    }
}

export {};