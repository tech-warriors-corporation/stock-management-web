import { Subscription } from "rxjs";

import { Response } from "../types/response";

export const NONE_VALUE = ''
export const copy = (value: any) => JSON.parse(JSON.stringify(value))
export const createResponse = <T = any>(data: T, count: number | null = null): Response<T> => ({ data, count })
export const unsubscribeForAll = (subscriptions: Subscription[]) => subscriptions.forEach(subscription => subscription.unsubscribe())
