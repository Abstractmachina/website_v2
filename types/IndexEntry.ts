import ISerializable from "./ISerializable";

export default class IndexEntry implements ISerializable<IndexEntry> {
    
    shortCode: string;
    title: string;
    year: number;
    categories: string[];
    affiliations: string[];
    
    deserialize(input: any): IndexEntry {
        this.shortCode = input.shortCode;
        this.title = input.title;
        this.year = input.year;
        this.categories = input.categories;
        this.affiliations = input.affiliations;

        return this;
    }

}