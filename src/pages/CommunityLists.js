import React from 'react'
import pow from '../assets/pow.png'
import ListOfLists from '../components/ListOfLists'

export default function CommunityLists(props) {
    return (
        <div className="page">
            
            <div className="page_header">community lists</div>
            <div className="header_bg"><img id="pow" src={pow}/></div>

            <ListOfLists allLists={props.allLists} user={props.user}/>
        </div>
    )
}
