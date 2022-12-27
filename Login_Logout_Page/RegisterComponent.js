import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
const Base_URL='http://localhost:4000/players';

export default function RegisterComponent(props) {
    const history = useHistory();
    const [player, setPlayer] = useState({
        playerId: '',
        password: ''
    });

    const handleOnChange = (e) => {
        setPlayer({...player,[e.target.name] : e.target.value});
    }
    const handleRegister = async() => {
        axios.post(`${Base_URL}/createLogin`,player).then(res => {
            if(res) {
                history.push('/');
            }
        })        
    }
  return (
    <div>
        <div> 
            <label>Player Id</label>
            <input type="text" name="playerId" value={player.playerId} onChange={handleOnChange} /> 
        </div> 
        <div> 
            <label>Password</label>
            <input type="password" name="password" value={player.password} onChange={handleOnChange} /> 
        </div>  
        <button onClick={handleRegister} >Register</button>
	</div>
  )
}
