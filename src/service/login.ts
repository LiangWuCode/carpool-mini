import { get } from "@/common/utils/httpRequest"


export const loginAction = (code: string) => {
    return get(`/common/login`,{code:code})
  }