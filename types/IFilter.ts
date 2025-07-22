import type { IFilterAccordion } from "~/types/IFilterAccordion";
import type { IComboBoxAge } from "~/types/IComboBoxAge";
import _default from "@speed-highlight/core/common";
import str = _default.str;

export interface IFilter {
    filterAccordion: IFilterAccordion[];
    comboBoxAge: IComboBoxAge[],
    selectedAge: string;
}