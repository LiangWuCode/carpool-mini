import { get, uploadFile } from '@/common/utils/httpRequest'

export const getDictData = (dictType: string) => {
  return get(`/common/getDictData`, { dictType: dictType })
}

export const uploadFileAction = (imageUrl: string) => {
  return uploadFile(`/common/uploadFile`, imageUrl)
}
