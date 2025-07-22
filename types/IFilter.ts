import type { IFilterAccordion } from "~/types/IFilterAccordion";
import _default from "@speed-highlight/core/common";
import str = _default.str;

export interface IFilter {
    filterAccordion: IFilterAccordion[];
    selectedAge: string;
}