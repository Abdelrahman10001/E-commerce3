import { createContext, useState } from "react";


export let CounterContext = createContext()



export default function CounterContextProvider(props) {

    let [counter,setCounter] = useState(0)

    function changecounter(){
        setCounter(Math.floor(Math.random()*100))
    }
    return <>
    
        <CounterContext.Provider value={{ counter, changecounter }}>
            {props.children}
        </CounterContext.Provider>

    </>

}
