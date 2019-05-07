import { INavCb } from "./index.t"

export type INavigateBack = (...payload: Array<number | INavCb>) => void
