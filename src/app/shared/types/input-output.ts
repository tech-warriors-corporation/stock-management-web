import { BooleanAsNumber } from "../enums/boolean-as-number";

export type InputOutputFilter = {
    productId: number | null
    hasProductExpiration: BooleanAsNumber | null
    createdById: number | null
}
