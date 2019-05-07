import { IQueryOrNavCb } from "./index.t"

export type IReLaunch = (url: string, ...payload: IQueryOrNavCb[]) => void
