import {server} from '../store'
import axios from 'axios'

export const View=({id,name,lastName})=>async(dispatch)=>{
    try {
        dispatch({type:"getRequest"});
        const {data}=await axios.get(`${server}/user?identification_number=${id}&name=${name}&last_name=${lastName}`)
        console.log(data);
        dispatch({type:"getSuccess",payload:data.user});
    } catch (error) {
        dispatch({type:"getFail",payload:error.response.data.message});
    }
}
export const Upload=(identification_number,name,last_name,date_of_birth,date_of_issue,date_of_expiry)=>async(dispatch)=>{
    try {
        dispatch({type:"postRequest"});
        const {data}=await axios.post(`${server}/user`,{identification_number,name,last_name,'date-of-birth': date_of_birth,
        'date-of-issue': date_of_issue,
        'date-of-expiry': date_of_expiry},{
            headers:{
            "Content-Type":"application/json"
            },
            withCredentials:true,
        })
        console.log(data);
        dispatch({type:"postSuccess",payload:data});
    } catch (error) {
        dispatch({type:"postFail",payload:error.response.data.message});
    }
}

export const Update=(identification_number,name,newId,last_name,date_of_birth,date_of_issue,date_of_expiry)=>async(dispatch)=>{
        try {
        dispatch({type:"updateProfileRequest"});
        const {data}=await axios.put(`${server}/user`,{
            identification_number: identification_number,
            new_id:newId,
            name:name,
            last_name:last_name,
            'date-of-birth': date_of_birth,
            'date-of-issue': date_of_issue,
            'date-of-expiry': date_of_expiry
        },{
            headers:{
            "Content-Type":"application/json"
            },
            withCredentials:true,
        })
        console.log(data);
        dispatch({type:"updateProfileSuccess",payload:data});
    } catch (error) {
        dispatch({type:"updateProfileFail",payload:error.response.data.message});
    }
}
export const Delete=(identification_number)=>async(dispatch)=>{
    try {
        dispatch({type:"deleteProfileRequest"});
        console.log(identification_number);
        const {data}=await axios.delete(`${server}/user`,{
            headers:{
            "Content-Type":"application/json"
            },
            data: {
                identification_number: identification_number
              },
            withCredentials:true,
        })
        dispatch({type:"deleteProfileSuccess",payload:data.message});
    } catch (error) {
        dispatch({type:"deleteProfileFail",payload:error.response.data.message});
    }
}