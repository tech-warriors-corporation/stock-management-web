export abstract class Base<T> {
    protected abstract count: number
    protected abstract page: number
    protected abstract get(): void
    abstract loading: boolean
    abstract list: T[]
}
