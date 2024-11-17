import axios from "../../api/Axios"
import useAuth from "./useAuth"


const useRefreshToken = ()=>{
    const {setAuth} = useAuth()
    const refresh = async ()=>{
        const response = await axios.get('refresh',
            {withCredentials:true}
        )
        setAuth((prevState)=>({
            ...prevState,
            accesstoken: response?.data?.accesstoken
        }))
        return response?.data?.accesstoken
    }
    return refresh
}

export default useRefreshToken;