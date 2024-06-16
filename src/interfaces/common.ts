export interface IUserInfo {
  nickName: string
  avatar: string
  token: string
  chatInfo: string
  couponCount: number
  mobile: string
  rideCount: number
  sex: number
  cardCount: number
  residueCount: number
}

export interface IPageRequestCommon {
  pageNum: number
  pageSize: number
}

export interface IPageResponseCommon {
  pageNum: number
  pageSize: number
}

export interface IChangeUserInfo {
  avatarUrl: string
  username: string
  photo: string
  sex: number
  chatInfo: string
}
