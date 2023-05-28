import { IHelper } from "./helper.interface";

export type HelperModel = Record<string, IHelper>

export type HelperResponse = { [key: string]: HelperModel }


