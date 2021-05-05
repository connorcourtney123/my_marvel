import React from 'react'
import List from '../components/List'


export default function ListOfLists(props) {
    return (
        <div>
            
            <div className="lists_container">
                {props.allLists.map((list) => (
                    <List key={list.id} list={list} user={props.user}/>
                ))}

            </div>
            
        </div>
    )
}
