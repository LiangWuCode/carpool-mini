import { defineStore, acceptHMRUpdate } from 'pinia'


export const useTest = defineStore({
  /**
   * 仓库id是唯一标识
   * 
  */
  id: 'test',
  /**
   * 存储全局状态
   * 1.必须是箭头函数: 为了在服务器端渲染的时候避免交叉请求导致数据状态污染
   * 和 TS 类型推导
  */
  state: () => {
    return {
      count: 0,
      list: [1, 2, 3, 4]
    }
  },
  /**
   * 用来封装计算属性 有缓存功能  类似于computed
   */
  getters: {
    items: (state) => {
      return state.list.map(v => v * 10)
    }
  },
  /**
   * 编辑业务逻辑  类似于methods
   */
  actions: {
    addList(item: number) {
      this.list.push(item)
    }
  }
})

// 添加热更新
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTest, import.meta.hot))
}