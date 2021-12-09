import React from 'react'



function TestButton() {
    const cheking = async () => {
        const url = "http://127.0.0.1:8000/test"
        const options = {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:'{"user":"santosh"}'
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
