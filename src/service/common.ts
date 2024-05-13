import { get } from "@/common/utils/httpRequest"


export const getDictData = (dictType: string) => {
    return get(`/common/getDictData`,{dictType:dictType})
  }