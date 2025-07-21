
export interface IIncompleteCard {
    id: number;
    title: string;
    category: string;
    subcategory: string;
    cost: string;
    isFirstFree: boolean;
    minAge: number;
    maxAge: number;
    address: string;
    buildingTitle: string;
    schedule: string;
    timeSlots: string[];
}