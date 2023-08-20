import { create } from 'zustand'

type Todo = {
  _id: string
  description: string
  title: string
  isComplete: boolean
}

type TodoStore = {
  todos: Todo[]
  fetchTodo: (todos: Todo[]) => void
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  fetchTodo: async (todos) => {
    set(() => ({
      todos: [...todos],
    }))
  },
}))
