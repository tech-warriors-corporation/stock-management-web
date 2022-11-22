import { Product } from "./product";
import { Category } from "./category";
import { BooleanAsNumber } from "../enums/boolean-as-number";
import { User } from "./user";

export type Output = {
    outputId: number
    product: Product
    category: Category
    productQuantity: number
    hasProductExpiration: BooleanAsNumber
    productWentTo: string
    createdBy: User
    dtExited: Date
    dtCreated: Date
    outputDescription: string | null
    dtUpdated: Date | null
}

export type Outputs = Output[]
