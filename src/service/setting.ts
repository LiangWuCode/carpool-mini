import { get, post } from '@/common/utils/httpRequest'
import { IUserSetting } from '@/interfaces/setting'

// 获取用户设置信息
export const findByUserId = () => {
    return get(`/userSettings/findByUserId`)
}


// 更改用户设置
export const updateUserSetting = (userSetting: IUserSetting) => {
    return post(`/userSettings/updateUserSetting`, userSetting)
}