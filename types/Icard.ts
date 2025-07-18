export interface CardData {
    id: number;
    title: string;
    category: string;
    subcategory: string;
    img: string;
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
    contents: string[{
        title: string,
        paragraph: string
    }];
}