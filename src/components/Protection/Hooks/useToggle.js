import useLocalStorage from "./useLocalStorage"


const useToggle = (key,initvalue)=>{
    const [value,setValue] = useLocalStorage(key,initvalue)
    const toggle = (value)=>{
        setValue((prevState)=>{
            return  typeof value === 'boolean' ? value : !prevState
        })
    }
    return [value,toggle]
}

export default useToggle;