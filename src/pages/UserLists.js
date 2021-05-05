import axios from 'axios'
import React, {useEffect, useState} from 'react'
import pow from '../assets/pow.png'
import ListOfLists from '../components/ListOfLists'
import env from 'react-dotenv'

export default function UserLists(props) {

    const [myLists, setMyLists] = useState([])

    // fetch all lists made by user
    const fetchMyLists = async () => {
        try{
            let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/lists`, {
                headers: {
                    Authorization: props.user.userId
                }
            })

            setMyLists(response.data.lists)

        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchMyLists()
    }, [])



     //resize pow to fit length of username
     const resizePow = () => {
        const pow_bg = document.querySelector('#pow');
        const header_txt = document.querySelector('.page_header').innerHTML
        var width = header_txt.length*4;
        pow_bg.style.width= width.toString() + 'vw';
    }
    useEffect(()=>{
        resizePow()
    }, [])

    return (
        <div className="page">
            
            <div className="page_header">{props.user.username}'s lists</div>
            <div className="header_bg"><img id="pow" src={pow} alt=''/></div>

            <ListOfLists allLists={myLists} user={props.user}/>
        </div>
    )
}
