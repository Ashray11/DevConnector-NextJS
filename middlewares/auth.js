import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export default function auth(req) {
    const token = req.headers.get('x-auth-token');

    if(!token) {
        return NextResponse.json(
            [{ message: "No token, authorization denied." }],
            { status: 401 }
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        return null;
    } catch (error) {
        return NextResponse.json(
            [{ message: "Token is not valid!" }],
            { status: 401 }
        );
    }
};