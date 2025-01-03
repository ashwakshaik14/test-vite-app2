const url="https://test-vite-app1.onrender.com/api"

export const register=(data)=>{
    return fetch(`${url}/user/register`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data)
    })
}