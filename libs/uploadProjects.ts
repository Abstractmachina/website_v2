#! /usr/bin/env node
// 'This script populates submissions from a CSV file to your database. 
// Specify csv file path as argument 
// - e.g.: node populatedb "./data/submissions_test_230421.csv"'

import connectDb from "@/libs/connectDb";
import Test from '@/models/test.model';

// const mongoose = require("mongoose");
  
// // Get arguments passed on command line
// const filepath = process.argv[2];

// const Submission = require("./models/submission");
// const MediaContent = require("./models/mediaContent");

// let submissions = [];

// const htmlentities = require("html-entities");


// -------------	MAIN	-----------------------
// main().catch((err) => console.log("main err: ",err));
  
export async function uploadProjects() {
    try {
        console.log("Debug: About to connect");
        // console.log(mongoDB);
        // mongoose.connect(mongoDB);
        // console.log(railwayMongo2);
        // mongoose.connect(railwayMongo2);
        await connectDb();
    
        console.log("Debug: Should be connected?");
        console.log("... Populating database now ...");
    
        // await importSubmissions(filepath);
    
        const newTest = new Test({
            content: "this is a test 0"
        })
    
        await newTest.save();
    
    
        console.log("... Populating database completed ...");
        console.log("Debug: Closing mongoose");
        // mongoose.connection.close();

    } catch (err) {
        console.log(err);
    }
}


//------------	HELPERS	------------------------------
