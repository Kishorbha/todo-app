import { useTodo } from '@/hooks/useTodo'
import { create } from 'zustand'
import Api from '@/utils/Api'

type Todo = {
  _id: string
  description: string
  title: string
  isComplete: boolean
}

type TodoStore = {
  todos: Todo[]
  fetchTodo: (todos: Todo[]) => void
  removeTodo: (todoId: string) => void
  addTodo: (todo: Todo) => void
  updateTodo: (todo: Todo) => void
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  fetchTodo: async (todos) => {
    set(() => ({
      todos: [...todos],
    }))
  },

  addTodo: async (todo) => {
    set((state) => ({
      todos: [todo].concat(state.todos),
    }))
  },

  updateTodo: async (updatedTodo) => {
    set((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo,
      ),
    }))
  },

  async removeTodo(todoId) {
    set((state) => ({
      todos: state.todos.filter((todo) => todo._id !== todoId),
    }))
  },
}))
