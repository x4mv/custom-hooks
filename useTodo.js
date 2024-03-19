import { todoReducer } from "../08-useReducer/todoReducer"
import { useEffect, useReducer } from "react"


const init = () => { 
    return JSON.parse( localStorage.getItem('todos')) || []
}



export const useTodo = () => { 

    const [todos, dispatch] = useReducer(todoReducer, [], init)

    //* guardando los todos en el local storage
    useEffect(() => {
        
        localStorage.setItem('todos', JSON.stringify(todos))

    }, [todos])
    
    //* calculando los todos pendientes y los totales
    const total = todos.length

    const pending = todos.filter(todo => todo.done === false).length


    //* funciones que modifican mi arreglo de todos
    const onAggTodo = (newTodo) => { 

        const action = { 
            type:'[TODO] Add',
            payload:newTodo, 
        }

        dispatch(action)
    }

    const handleDeleteTodo = (id) => { 
        
        const action = {
            type: '[TODO] Delete',
            payload:id, 
        }

        dispatch(action)
    }

    const onToggleTodo = (id) => { 

        
        const action = {
            type: '[TODO] Toggle',
            payload:id, 
        }

        
        dispatch(action)

    }



    return { 
        onAggTodo, 
        handleDeleteTodo, 
        onToggleTodo, 
        todos,
        total,
        pending,
    }
}