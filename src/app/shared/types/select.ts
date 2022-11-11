import { BooleanAsNumber } from "../enums/boolean-as-number";

export type SelectOption = {
    value: number | string
    text: string
    isActive: BooleanAsNumber
}

export type SelectOptions = SelectOption[]
