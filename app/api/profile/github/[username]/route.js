import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    try {
        const response = await fetch(`https://api.github.com/users/${params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`, {
            method: 'GET',
            headers: { 'User-Agent': 'node.js' }
        });

        if (!response.ok) {
            return NextResponse.json({ message: "No Github Profile found." }, { status: 404 });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error." }, { status: 500 });
    }
};