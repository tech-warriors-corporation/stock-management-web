import { BooleanAsNumber } from "../enums/boolean-as-number";

export type AutocompleteOption = {
    value: number
    text: string
    isActive: BooleanAsNumber
}

export type AutocompleteOptions = AutocompleteOption[]
