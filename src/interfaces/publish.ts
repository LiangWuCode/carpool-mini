export interface IDateOptions {
    text: string
    id: string
  }
  // 生成日期集合
  export interface IDateOptionsAll {
    text: string
    id: string
    children: IDateOptions[]
  }

  export interface INotesItem {
    value: string
    checked: boolean
  }