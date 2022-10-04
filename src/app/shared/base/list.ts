export abstract class List<T> {
    abstract loading: boolean
    abstract list: T[]
    abstract count: number
    protected abstract page: number
    protected readonly abstract perPage: number
    protected abstract get(): void
}
