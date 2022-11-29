const dateSeparator = '/'
const addPadZeroToDate = (datePart: string | number) => `${datePart}`.padStart(2, '0')
export const dateTextMask = [/\d/, /\d/, dateSeparator, /\d/, /\d/, dateSeparator, /\d/, /\d/, /\d/, /\d/]
export const DATE_LENGTH = dateTextMask.length
export const DATE_FORMAT_HINT = 'dd/mm/aaaa'
export const getPreviousDate = (date = today(), previousDays = 1) => new Date(date.setDate(date.getDate() - previousDays))

export const today = () => {
    const date = new Date()
    const timeZone = date.getTimezoneOffset() / 60

    date.setHours(23 - timeZone, 59, 59, 59)

    return date
}

export const formatDateToString = (date: Date) => {
    const day = addPadZeroToDate(date.getDate())
    const month = addPadZeroToDate((date.getMonth() + 1))
    const year = date.getFullYear()

    return `${day}${dateSeparator}${month}${dateSeparator}${year}`
}

export const formatStringToDate = (dateString: string): Date | null => {
    if(dateString.length !== DATE_LENGTH) return null

    const [day, month, year] = dateString.split(dateSeparator)

    return new Date(+year, (+month) - 1, +day)
}
