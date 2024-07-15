import { get, uploadFile } from '@/common/utils/httpRequest'

//获取数据字典
export const getDictData = (dictType: string) => {
  return get(`/common/getDictData`, { dictType: dictType })
}

//上传图片
export const uploadFileAction = (imageUrl: string) => {
  return uploadFile(`/common/uploadFile`, imageUrl)
}
//获取协议
export const getNoticesByType = (type: string) => {
  return get(`/common/getNoticesByType`, { type: type })
}

//上传分享图片
export const uploadFileForShareAction = (imageUrl: string) => {
  return uploadFile(`/common/uploadFileForShare`, imageUrl)
}

//获取分享图片
export const getRiderUrlById = (id: number) => {
  return get(`/common/getRiderUrlById`, { id: id })
}


