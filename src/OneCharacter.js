import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function OneCharacter() {
    const { name } = useParams();

    const [character, setCharacter] = useState({})

    useEffect(() => {
        fetch(`http://localhost:3001/api/getCharacterByName/${name}`)
            .then(async res => {
                let result = await res.json()
                setCharacter(result.payload)
            })
    }, [name])

    return (  
        <>
            <h1>The character {character.name} debuted in the film {character.debut} that was released in {character.debutYear}</h1>
        </>
    );
}

export default OneCharacter;