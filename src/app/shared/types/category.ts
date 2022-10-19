import { BooleanAsNumber } from "../enums/boolean-as-number";

export type Category = {
    categoryId: number
    categoryName: string
    createdByUserId: number
    isActive: BooleanAsNumber
    dtCreated: Date
    dtUpdated: Date | null
}

export type Categories = Category[]

export type NewCategory = {
    categoryName: string
}

export type EditCategory = {
    categoryName: string
}
