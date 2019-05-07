import { IParamsOrNavCb } from "./index.t"

export type IRedirectTo = (url: string, ...payload: IParamsOrNavCb[]) => void
