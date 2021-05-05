import React, {useState} from 'react'
import pow from '../assets/pow.png'
import {useHistory} from 'react-router-dom'
import axios from 'axios'


export default function LogIn(props) {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const logIn = async (e) => {
        try{
            e.preventDefault()

            let response = await axios.post(`http://localhost:3000/user/login`, {
                username: username,
                password: password
            })

            //console.log(response)

            props.setUser({username: response.data.username, userId: response.data.userId})

            localStorage.setItem('userId', response.data.userId)

            history.push('/myLists')

        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className="page">
            <div className="page_header">log in!</div>
            <div className="header_bg"><img id="pow" src={pow}/></div>

            <form className="user_form">
                <input type="text" placeholder="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
                <input type="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                <button onClick={(e) => logIn(e)}>log in</button>
            </form>

        </div>
    )
}
