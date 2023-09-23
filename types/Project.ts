import ISerializable from "@/types/ISerializable";




export class Project implements ISerializable<Project> {

    title: string;
    subtitle: string;
    categories: [string];
    html: string;
    location: string;
    year: number;
    affiliations: [string];
    shortCode: string;
    preview: string;

    deserialize(input: any): Project {
        this.title = input.title;
        this.subtitle = input.subtitle;
        this.categories = input.categories;
        this.html = input.html;
        this.location = input.location;
        this.year = input.year;
        this.affiliations = input.affiliations;
        this.shortCode = input.shortCode;
        this.preview = input.preview;

        return this;
    }
};
