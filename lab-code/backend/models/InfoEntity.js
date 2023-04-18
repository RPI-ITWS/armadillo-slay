import {BaseEntity} from "./BaseEntity";

export class InfoEntity extends BaseEntity {
    constructor(name, description, url, mediaType, keywords) {
        super();
        this.name = name;
        this.description = description;
        this.url = url;
        this.mediaType = mediaType;
        this.keywords = keywords;
    }
}