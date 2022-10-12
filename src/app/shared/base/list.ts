import { Dictionary } from "../types/dictionary";

export abstract class List<T> {
    abstract loading: boolean
    abstract list: T[]
    abstract count: number
    protected abstract filters: Dictionary | null
    protected abstract page: number
    protected readonly abstract perPage: number
    protected abstract get(): void
}
