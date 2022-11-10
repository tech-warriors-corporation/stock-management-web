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
