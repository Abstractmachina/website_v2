import mongoose, { Schema, Model } from "mongoose";
import createModel from "./createModel";

interface IProject {
    title: string,
    subtitle: string,
    categories: [string],
    html: string,
    location: string,
    year: number,
    affiliations: [string],
    shortCode: string,
    preview: string
}

interface IProjectMethods { }

type ProjectModel = Model<IProject, {}, IProjectMethods>;

const projectSchema = new Schema<IProject, ProjectModel, IProjectMethods>({
    title: { type: String, required: true },
    subtitle: { type: String },
    categories: { type: [String]},
    html: { type: String, required: true },
    location: { type: String },
    year: { type: Number, required: true },
    affiliations: { type: [String] },
    shortCode: { type: String, required: true },
    preview: { type: String},
})


export default createModel<IProject, ProjectModel>("Project", projectSchema);