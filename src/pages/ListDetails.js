import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'


export default function ListDetails(props) {

    const history = useHistory()
    const[movies, setMovies] = useState([])
    const listInfo = props.location.state

    const fetchMovies = async () => {
        try{
            let response = await axios.get(`http://localhost:3000/list/details/`+listInfo.list.id)

            setMovies(response.data.list)

        }catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
        fetchMovies()
    }, [])

    const deleteList = async (e) => {
        try{
            e.preventDefault()
            let response = await axios.delete(`http://localhost:3000/list/`+listInfo.list.id)

            history.push('/myLists')
        }catch(error){
            console.log(error)
        }
    }

    if(listInfo.user.username === listInfo.author){
        return (
            <div className="page">
    
                <div className="movies">
                    {movies.map((movie) => (
                        <img key={movie.id} src={movie.image} alt={movie.name}/>
                    ))}
                </div>
    
                <div className="details_header">
    
                    <div className="list_info">
                        <div className="listName">{listInfo.list.name}</div>
                        <div className="list_author">created by: {listInfo.author}</div>
                    </div>
                    <div className="list_actions">

                        <Link className='list_action' to={{
                            pathname:'/editList',
                            state: {list: listInfo.list, movies: movies, user: listInfo.user}
                        }}>edit</Link>

                        <div className='list_action' onClick={(e)=>{deleteList(e)}}>delete</div>
    
                    </div>
    
                </div>
                
            </div>
        )
    }else{
        return (
            <div className="page">
    
                <div className="movies">
                    {movies.map((movie) => (
                        <img key={movie.id} src={movie.image} alt={movie.name}/>
                    ))}
                </div>
    
                <div className="details_header">
    
                    <div className="list_info">
                        <div className="listName">{listInfo.list.name}</div>
                        <div className="list_author">created by: {listInfo.author}</div>
                    </div>
                    <div className="list_actions">
    
                    </div>
    
                </div>
                
            </div>
        )
    }
}

