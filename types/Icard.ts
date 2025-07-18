import _default from "@speed-highlight/core/common";
import str = _default.str;

export interface CardData {
    id: number;
    title: string;
    category: string;
    subcategory: string;
    img: string;
    isFree: boolean;
    isFirstFree: boolean;
    minAge: number;
    maxAge: number;
    address: string;
    buildingTitle: string;
    schedule: string;
    timeSlots: string[];
    teacher: string;
    remainingPlaces: string;
    duration: string;
    description: string;
    contents: string[{
        title: string,
        paragraph: string
    }];
}

export class Card {
    id: number;
    title: string;
    category: string;
    subcategory: string;
    img: string;
    isFree: boolean;
    isFirstFree: boolean;
    minAge: number;
    maxAge: number;
    address: string;
    buildingTitle: string;
    schedule: string;
    timeSlots: string;
    teacher: string;
    remainingPlaces: string;
    duration: string;
    description: string;
    contents: string[];

    constructor(data: CardData) {
        this.id = data.id;
        this.title = data.title;
        this.category = data.category;
        this.subcategory = data.subcategory;
        this.img = data.img;
        this.isFree = data.isFree;
        this.isFirstFree = data.isFirstFree;
        this.minAge = data.minAge;
        this.maxAge = data.maxAge;
        this.address = data.address;
        this.buildingTitle = data.buildingTitle;
        this.schedule = data.schedule;
        this.timeSlots = data.timeSlots;
        this.teacher = data.teacher;
        this.remainingPlaces = data.remainingPlaces;
        this.duration = data.duration;
        this.description = data.description;
        this.contents = data.contents;
    }
}