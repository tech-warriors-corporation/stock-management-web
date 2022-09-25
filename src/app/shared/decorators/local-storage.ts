export function LocalStorage(name: string){
    name = `STM_${name}`.replace(/[^a-z0-9]/gi, '_').toUpperCase()

    return (target: any, propertyName: string) =>
        Object.defineProperty(target, propertyName, {
            get: () => JSON.parse(localStorage.getItem(name) || 'null'),
            set: (value: any) => localStorage.setItem(name, JSON.stringify(value))
        })
}
