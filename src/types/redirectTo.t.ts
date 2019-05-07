import { IQueryOrNavCb } from "./index.t"

export type IRedirectTo = (url: string, ...payload: IQueryOrNavCb[]) => void
