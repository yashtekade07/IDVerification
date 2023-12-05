import {server} from '../store'
import axios from 'axios'

export const getHistory=({id='',name='',last_name=''})=>async(dispatch)=>{
    try {
        dispatch({type:"getHistoryRequest"});
        const {data}=await axios.get(`${server}/history?identification_number=${id}&name=${name}&last_name=${last_name}`,{
            headers:{
            "Content-Type":"application/json"
            },
            withCredentials:true,
        })
        dispatch({type:"getHistorySuccess",payload:data.history});
    } catch (error) {
        dispatch({type:"getHistoryFail",payload:error.response.data.message});
    }
}