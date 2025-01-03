const url="http://localhost:4444/api"

export const register=(data)=>{
    return fetch(`${url}/user/register`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data)
    })
}