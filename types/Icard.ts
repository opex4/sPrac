import _default from "@speed-highlight/core/common";
import str = _default.str;

export interface ICard {
    id: number;
    title: string;
    category: string;
    subcategory: string;
    img: string;
    isFree: boolean;
    cost: string;
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
    contents: [{
        title: string,
        paragraph: [
            {
                h5: string,
                li: string[]
            }
        ]
    }];
}