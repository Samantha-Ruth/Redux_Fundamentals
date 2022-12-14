const initialState = []

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      // Can return just the new todos array - no extra object around it
      return [
        ...state,
        {
          id: nextTodoId(state),
          text: action.payload,
          completed: false,
        },
      ]
    }
    case 'todos/todoToggled': {
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo
        }

        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    }
    case 'todos/colorSelected': {
      // need to add an object of the action.payload?
      const { color, todoId } = action.payload
      return state.map((todo) => {
        if (todo.id !== todoId) {
          return todo
        }

        return {
          // just return todo, not state
          ...todo,
          // and updated color from payload
          color,
        }
      })
    }
    case 'todos/todoDeleted': {
      // filter out todo from the array and only show deleted items.  Doesn't update anything.
      return state.filter((todo) => todo.id !== action.payload)
    }

    case 'todos/allCompleted': {
      return state.map((todo) => {
        return {
          ...todo,
          completed: true,
        }
      })
    }
    case 'todos/completedCleared': {
      return state.filter((todo) => !todo.completed)
    }

    default:
      return state
  }
}
