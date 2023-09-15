import connectDb from "@/libs/connectDb";
import { NextRequest, NextResponse } from "next/server";

import Test from '@/models/test.model';

export const GET = async (req: NextRequest) => {
    console.log("GET /api/projects");

}

export const POST = async (req: NextRequest) => {
    console.log("POST /api/projects");

    try {
        await connectDb();
    
        const body = await req.json();
    
        const newTest = new Test({
            content: "this is a test 0"
        })
    
        await newTest.save();
        console.log("Test uploaded successfully");
        return NextResponse.json({success:true}, {status:200});

    } catch (err) {
        console.error(err);
        return NextResponse.json({success:false, error: "Internal server error"}, {status:500});
    }


}