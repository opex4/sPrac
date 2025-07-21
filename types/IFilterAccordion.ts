import _default from "@speed-highlight/core/common";
import str = _default.str;

export interface IFilterAccordion {
    category: {
        title: string;
        counter: number;
        isSelected: boolean;
    },
    subCategory: [{
        title: string;
        counter: number;
        isSelected: boolean;
    }],
    isOpen: boolean;
}