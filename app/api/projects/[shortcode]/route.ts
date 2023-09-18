import connectDb from "@/libs/connectDb";
import { NextRequest, NextResponse } from "next/server";

import Project from "@/models/project.model";

export const GET = async (req: NextRequest, { params }: { params: { shortcode: string } }) => {
    console.log(`GET /api/projects/${params.shortcode}`);

    try {
        await connectDb();
        const project = await Project.findOne({ shortCode: params.shortcode }).exec();
        
        // project not found
        if (!project) {
            return NextResponse.json({ success: false, message: 'Project does not exist!', project: null }, { status: 400 });
        }
        // success
        return NextResponse.json({ success: true, project: project }, { status: 200 });
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, project: null, message: 'Internal server error' }, { status: 500 });
    }
}