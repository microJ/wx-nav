import { IParamsOrNavCb } from "./index.t"

export type INavigateTo = (url: string, ...payload: IParamsOrNavCb[]) => void
