import * as _ from 'lodash';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function LoginComponent(props) {
    const Base_URL='http://localhost:4000/players';
    const history = useHistory();
    const [player, setPlayer] = useState({
        playerId: '',
        password: ''
    });

    const handleOnChange = (e) => {
        setPlayer({...player,[e.target.name] : e.target.value});
    }
    const handleLogin = async() => {
        axios.get(`${Base_URL}/checkLogin`).then(response => {
            let res = _.get(response, 'data')
            res.forEach(element => {
                if(_.isEqual(element,player)) {
                    history.push(`/dashboard/${player.playerId}`);
                }
            });
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
        <button onClick={handleLogin} >Login</button>
        <a href='/register'>To register a player</a>
	</div>
  )
}
