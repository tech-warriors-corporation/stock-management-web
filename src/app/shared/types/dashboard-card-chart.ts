import { ChartType, Row } from "angular-google-charts";

import { Dictionary } from "./dictionary";

export type DashboardCardChart = {
    height: number
    dynamicResize: boolean
    type: ChartType
    columns: string[]
    options: Dictionary
    data: Row[]
}
