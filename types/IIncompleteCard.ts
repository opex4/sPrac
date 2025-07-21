
export interface IIncompleteCard {
    id: number;
    title: string;
    category: string;
    subcategory: string;
    isFree: boolean;
    cost: string;
    isFirstFree: boolean;
    minAge: number;
    maxAge: number;
    address: string;
    buildingTitle: string;
    schedule: string;
    timeSlots: string[];
}