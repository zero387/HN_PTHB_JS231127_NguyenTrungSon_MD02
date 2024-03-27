import { configureStore } from '@reduxjs/toolkit'
import a from "../reducers/todoList"

export const store = configureStore({
  reducer: {
    todoList: a,
  },
})