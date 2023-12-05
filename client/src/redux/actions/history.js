import {server} from '../store'
import axios from 'axios'

export const getHistory=({id,name,lastName})=>async(dispatch)=>{
    try {
        dispatch({type:"getHistoryRequest"});
        const {data}=await axios.get(`${server}/history?identification_number=${id}&name=${name}&last_name=${lastName}`,{
            headers:{
            "Content-Type":"application/json"
            },
            withCredentials:true,
        })
        console.log(data);
        dispatch({type:"getHistorySuccess",payload:data.history});
    } catch (error) {
        dispatch({type:"getHistoryFail",payload:error.response.data.message});
    }
}