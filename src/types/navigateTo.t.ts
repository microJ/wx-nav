import { IQueryOrNavCb } from "./index.t"

export type INavigateTo = (url: string, ...payload: IQueryOrNavCb[]) => void
