// imrse
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AllCharacters() {
    const [serverData, setServerData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/allCharacters')
          .then(async res => {
            const data = await res.json();
    
            console.log(data);
    
            setServerData(data.payload);
          })
    }, [])

    return (  
        <ul>
            {serverData.length > 0 ? serverData.map((character) => 
                (
                <li key={character._id}>
                    <Link to={`/mcu/${character.name}`} >{character.name}</Link>
                </li>
                )
            ) : <h1>loading...</h1>}
        </ul>
    );
}

export default AllCharacters;