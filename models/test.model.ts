import mongoose, { Schema, Model } from "mongoose";
import createModel from "./createModel";
// import { IPost, IPostMethods } from "../types/IPost";



interface ITest {
    content: string
}
interface ITestMethods {

}


type TestModel = Model<ITest, {}, ITestMethods>;


const testSchema = new Schema<ITest, TestModel, ITestMethods>({
    content: {type: String, required:true}
});


export default createModel<ITest, TestModel>("Test", testSchema);
