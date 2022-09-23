import { BooleanAsNumber } from "../enums/boolean-as-number";

export type User = {
    userId: number,
    userName: string,
    email: string,
    isAdmin: BooleanAsNumber,
    isActive: BooleanAsNumber,
    dtCreated: Date,
    userPassword?: string,
    dtUpdated?: Date,
    createdByUserId?: number,
}
