import { useEffect, useState } from "react"


const getLocalitem = (key,initvalue)=>{
    if (typeof window === 'undefined') return initvalue
    const localitem = JSON.parse(localStorage.getItem(key))
    if(localitem) return localitem
    if (initvalue instanceof Function) return initvalue()
}

const useLocalStorage = (key,initvalue)=>{
    const [value,setValue] = useState(()=>{
        return getLocalitem(key,initvalue)
    })

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[key,value])

    return [value,setValue]
}

export default useLocalStorage;