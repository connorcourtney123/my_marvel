import axios from 'axios'
import React, {useState} from 'react'
import pow from '../assets/pow.png'
import {useHistory} from 'react-router-dom'


export default function SignUp(props) {
    const history = useHistory();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const signUp = async (e) => {
        try{
            e.preventDefault();

            let response = await axios.post(`http://localhost:3000/user/`, {
                username: username,
                password: password
            })


            props.setUser({username: response.data.username, userId: response.data.userId})

            localStorage.setItem('userId', response.data.userId)

            history.push('/myLists')



        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className="page">
            <div className="page_header">sign up!</div>
            <div className="header_bg"><img id="pow" src={pow} alt=''/></div>

            <form className="user_form">
                <input type="text" placeholder="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
                <input type="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                <button onClick={(e)=>{signUp(e)}}>sign up</button>
            </form>

        </div>
    )
}
