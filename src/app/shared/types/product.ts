import { BooleanAsNumber } from "../enums/boolean-as-number";

export type Product = {
    productId: number
    categoryId: number
    productName: string
    quantity: number
    createdByUserId: number
    isActive: BooleanAsNumber
    dtCreated: Date
    categoryName: string
    categoryIsActive: BooleanAsNumber
    dtUpdated: Date | null
}

export type Products = Product[]

export type NewProduct = {
    productName: string
    categoryId: number
    quantity: number
}

export type EditProduct = {
    productName: string
    categoryId: number
}
