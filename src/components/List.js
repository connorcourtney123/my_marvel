import axios from 'axios'
import React, {useEffect, useState} from 'react'
import env from 'react-dotenv'
import {Link} from 'react-router-dom'

export default function List(props) {

    const [author, setAuthor] = useState('')

    const fetchAuthor = async () => {
        try{
            let response = await axios.get(`http://localhost:3000/user/author/`+props.list.userId)

            setAuthor(response.data.username)

        }catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
        fetchAuthor()
    })

    return (
        
            <Link className="list" to={{
                pathname:'/listDetails',
                state: {list: props.list, author: author, user: props.user}
            }}>
                <div className="list_name">{props.list.name}</div>
                <div className="author">by: {author}</div>
            </Link>
            
    )
}
