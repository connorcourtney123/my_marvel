import axios from 'axios'
import React, {useState, useEffect} from 'react'
import pow from '../assets/pow.png'
import {useHistory} from 'react-router-dom'

export default function CreateList(props) {
    const history = useHistory()

    const [allMovies, setAllMovies] = useState([])

    const [newName, setNewName] = useState('')
    var newList = []

    const drop_downs = document.getElementById('drop_downs')

    const fetchAllMovies = async () => {
        try{
            let response = await axios.get(`http://localhost:3000/movies/`)

            setAllMovies(response.data.movies)

        }catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
        fetchAllMovies()
    }, [])

    const createList = async (e) => {
        try{
            e.preventDefault()
            
            getInput()

            let response = await axios.post(`http://localhost:3000/list/`, {
                name: newName,
                list: newList
            },
            {
                headers: {
                    Authorization: props.user.userId
                }
            })

            history.push('/myLists')

        }catch(error){
            console.log(error)
        }
    }

    const getInput = () => {
            let listArray = [...drop_downs.children]

            listArray.map((select)=> (
                newList = [...newList, select.value]
            ))
    }

    const populateDropdown = (movies) => {
        return movies.map((movie) => (
            <option key={movie.id} value={movie.name}>{movie.name}</option>
        ));
    }

    const addMovie = (e) => {
        e.preventDefault();
        const drop_downs = document.getElementById('drop_downs')

        let newDrop = document.createElement('select')

        newDrop.className = "drop_down"

        let defaultOption = document.createElement('option')
        defaultOption.vaule=''
        defaultOption.innerHTML = 'select a movie...'
        newDrop.appendChild(defaultOption)

        populateDropdown(allMovies).map((option) => {
            let newOption = document.createElement('option')
            newOption.value = option.props.value
            newOption.innerHTML = option.props.children
            newDrop.appendChild(newOption)
        })

        drop_downs.appendChild(newDrop)




    }






    return (
        <div className="page">
            <div className="page_header">create list</div>
            <div className="header_bg"><img id="pow" src={pow}/></div>

            <form className="user_form">
                <input type="text" placeholder="list name" value={newName} onChange={(e) => {setNewName(e.target.value)}}></input>
                <div id="drop_downs">
                    <select className="drop_down" name="movie_0" id="movie_0">
                        <option value=''>select a movie...</option>
                        {populateDropdown(allMovies)}
                    </select>
                </div>
                <button id="add_movie" onClick={(e)=>addMovie(e)}>+</button>
                <button onClick={(e) => createList(e)}>create list</button>
            </form>
        </div>
    )
}
