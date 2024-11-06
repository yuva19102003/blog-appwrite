import { NextResponse } from "next/server";
import { client, account, ID } from "../../../Appwrite/appwrite";

export async function POST(request) {

    const res = await request.json();
    const email = res.email;
    const password = res.password;

    try {
        const userAccount = await account.createEmailPasswordSession(email, password);
        return NextResponse.json({ success: true, userAccount });
    } catch (error) {
        console.error('user failed to login',error);
        return NextResponse.json({ success: false, error: error.message });
    }

}