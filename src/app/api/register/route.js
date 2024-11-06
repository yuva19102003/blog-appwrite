import { NextResponse } from "next/server";
import { client, account, ID } from "../../../Appwrite/appwrite";

export async function POST(request) {

    const res = await request.json();
    
    const email = res.email;
    const password = res.password;
    const name = res.name; 


  try {
    const userAccount = await account.create(ID.unique(),email, password, name);
    return NextResponse.json({ success: true, userAccount });

  } catch (error) {

    console.error('User registration failed:', error);
    return NextResponse.json({ success: false, error: error.message });
    
  }
}