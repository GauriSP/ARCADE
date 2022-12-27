import React from 'react';
//import {useState} from 'react';
import { useParams } from "react-router-dom";

function DashBoardComponent(props) {
    let { id } = useParams();

    return(
        <div>
            <h1>Welcome to dashboard </h1>
            <h2> Hello, {id} </h2>
        </div>
    )
}

export default DashBoardComponent;