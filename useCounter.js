import { useState } from "react"



export const useCounter = (initialValue = 10) => {

    const [counter, setCounter] = useState(initialValue)

    const increment = (added = 1) => { 
        setCounter((currCounter) => currCounter+added)
    }

    const decrement = (dec = 1) => { 
        setCounter(currCounter => currCounter-dec)
    }

    const reset = () => { 
        setCounter(initialValue)
    }
    
    return {
        counter,
        increment,
        decrement,
        reset
    }

}

