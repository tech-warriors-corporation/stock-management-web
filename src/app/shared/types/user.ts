import { Situation } from "../enums/situation";

export type User = {
    userId: number,
    userName: string,
    email: string,
    isAdmin: Situation,
    isActive: Situation,
    dtCreated: Date,
    userPassword?: string,
    dtUpdated?: Date,
    createdByUserId?: number,
}
