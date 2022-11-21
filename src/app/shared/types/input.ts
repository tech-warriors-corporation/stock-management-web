import { Product } from "./product";
import { BooleanAsNumber } from "../enums/boolean-as-number";
import { User } from "./user";
import { Category } from "./category";

export type Input = {
    inputId: number
    product: Product
    category: Category
    productQuantity: number
    hasProductExpiration: BooleanAsNumber
    isDonation: BooleanAsNumber
    createdBy: User
    dtEntered: Date
    dtCreated: Date
    inputDescription: string | null
    unitPrice: number | null
    totalPrice: number | null
    dtUpdated: Date | null
}

export type Inputs = Input[]

export type NewInput = {
    productId: number,
    productQuantity: number,
    unitPrice: number | null,
    isDonation: BooleanAsNumber,
    hasProductExpiration: BooleanAsNumber,
    dtEntered: Date | null,
    inputDescription: string | null,
}

export type EditInput = {
    unitPrice: number | null,
    isDonation: BooleanAsNumber,
    hasProductExpiration: BooleanAsNumber,
    inputDescription: string | null,
}
