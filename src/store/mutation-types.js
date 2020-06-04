//  使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。
//这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者
//对整个 app 包含的 mutation 一目了然
export const ADD_COUNT = "ADD_COUNT"
export const ADD_TO_CAR = "ADD_TO_CAR"
export const SUBTRACT_COUNT = "SUBTRACT_COUNT"
export const DELETE_GOOD = "DELETE_GOOD"
