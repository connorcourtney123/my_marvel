import axios from 'axios'
import React, {useState, useEffect} from 'react'
import pow from '../assets/pow.png'
import env from 'react-dotenv'
import {useHistory} from 'react-router-dom'


export default function EditList(props) {
    const listInfo = props.location.state.list
    const list = props.location.state.movies
    const user = props.location.state.user

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


    const loadOldList = () =>{


        setNewName(listInfo.name)


        list.map((movie) => (
            addOldMovie(movie.name)
        ))



    }
    useEffect(()=>{
        loadOldList()
    }, [])



    const editList = async (e) => {
        try{
            e.preventDefault()

            getInput()

            let response = await axios.put(`http://localhost:3000/list/edit`,{
                listId: listInfo.id,
                name: newName,
                list: newList
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
        e.preventDefault()

        let newDrop = document.createElement('select')

        newDrop.className = "drop_down"

        let defaultOption = document.createElement('option')
        defaultOption.value=''
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

    const addOldMovie = (movie) => {

        let newDrop = document.createElement('select')

        newDrop.className = "drop_down"

        let oldOption = document.createElement('option')
        oldOption.value=movie
        oldOption.innerHTML = movie
        newDrop.appendChild(oldOption)

        let defaultOption = document.createElement('option')
        defaultOption.value=''
        defaultOption.innerHTML = 'select a movie...'
        newDrop.appendChild(defaultOption)

        populateDropdown(allMovies).map((option) => {
            let newOption = document.createElement('option')
            newOption.value = option.props.value
            newOption.innerHTML = option.props.children
            newDrop.appendChild(newOption)
        })
        

        document.getElementById('drop_downs').appendChild(newDrop)
    }


    return (
        <div className="page">
            <div className="page_header">create list</div>
            <div className="header_bg"><img id="pow" src={pow} alt=''/></div>
            
            <form className="user_form">
                <input type="text" placeholder="list name" value={newName} onChange={(e) => {setNewName(e.target.value)}}></input>
                <div id="drop_downs">

                </div>
                <button id="add_movie" onClick={(e)=>{addMovie(e)}}>+</button>
                <button onClick={(e) => editList(e)}>save changes</button>
            </form>
        </div>
    )
}
