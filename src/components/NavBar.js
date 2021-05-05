import React from 'react'
import {Link} from 'react-router-dom'

export default function NavBar(props) {

    const logout = () => {
        localStorage.removeItem('userId')
        props.setUser({})
    }

    if(JSON.stringify(props.user) !== '{}'){
        return (
            <div className="nav_bar">
            <div className="logo">MY MARVEL</div>

            <Link className="nav_link" to="/home">community lists</Link>
            <Link className="nav_link" to="/myLists">my lists</Link>
            <Link className="nav_link" to="/create">create new list</Link>
            <Link className="nav_link" to="/home" onClick={() => logout()}>logout</Link>
        </div>

        )
    }else{
        return (
            <div className="nav_bar">
            <div className="logo">MY MARVEL</div>
            <Link className="nav_link" to="/home">community lists</Link>
            <Link className="nav_link" to="/signup">sign up</Link>
            <Link className="nav_link" to="/login">login</Link>
        </div>
        )
    }

}
