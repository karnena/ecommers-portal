import React from 'react'
import Cookies from 'js-cookie'



function TestButton() {
    const cheking = async () => {
        const url = "http://127.0.0.1:8000/testing"
        const myToken = Cookies.get("jwt_token")
        const options = {
            method: "GET",
            headers:{
                "Content-Type":"application/json",
                'Access-Control-Allow-Origin': "*",
                "Authorization": "Bearer " + myToken
            },
            
        }
        const result = await fetch(url, options)
        if (result.ok){
            const data = await result.json()
            console.log(data)
        }
        
    }
    return (
        <div onClick={cheking}>
            TestButton
        </div>
    )
}

export default TestButton
