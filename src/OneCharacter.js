import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function OneCharacter() {
  const { name } = useParams();

  const navigate = useNavigate();

  // character holds the initial MCU character document
  const [character, setCharacter] = useState({});
  // handles the ability to edit or not
  const [isEditing, setIsEditing] = useState(false);
  // these handle what is being edited
  const [debutInput, setDebutInput] = useState("");
  const [debutYearInput, setDebutYearInput] = useState("");

  // runs when name is changed (when you initially arrive at this page) or if `isEditing` is changed, so you can immediately see changes once it's been edited
  useEffect(() => {
    fetch(
      `https://mcu-back-end-sk7l.onrender.com/api/getCharacterByName/${name}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
          "Access-Control-Allow-Origin": "*",
        },
      }
    ).then(async (res) => {
      let result = await res.json();
      setCharacter(result.payload);
      setDebutInput(result.payload.debut);
      setDebutYearInput(result.payload.debutYear);
    });
  }, [name, isEditing]);

  // Toggles the ability to edit. If editing is true, the details become input fields and the button to submit the form appears.
  function toggleEditing() {
    isEditing ? setIsEditing(false) : setIsEditing(true);
  }

  // This runs when you submit the edited fields
  function handleOnSubmit(e) {
    e.preventDefault();

    console.log("Submitted!");

    // prepares the changes being made to the document
    let sendBody = {
      debut: debutInput,
      debutYear: debutYearInput,
    };

    fetch(
      `https://mcu-back-end-sk7l.onrender.com/api/updateCharacter/${character._id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(sendBody),
      }
    ).then(() => {
      // This will make the useEffect run so the page updates with the current character details
      setIsEditing(false);
    });
  }

  function handleDelete() {
    fetch(
      `https://mcu-back-end-sk7l.onrender.com/api/deleteCharacter/${character._id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
          "Access-Control-Allow-Origin": "*",
        },
      }
    ).then(() => {
      navigate("/mcu");
    });
  }

  return (
    <>
      <h1>The character {character.name}</h1>
      <ul>
        <form onSubmit={handleOnSubmit}>
          <li>
            debuted in &nbsp;
            {isEditing ? (
              <input
                type="text"
                name="debut"
                value={debutInput}
                onChange={(e) => setDebutInput(e.target.value)}
              />
            ) : (
              <span>{character.debut}</span>
            )}
            .
          </li>
          <li>
            This was released in &nbsp;
            {isEditing ? (
              <input
                type="text"
                name="debutYear"
                value={debutYearInput}
                onChange={(e) => setDebutYearInput(e.target.value)}
              />
            ) : (
              <span>{character.debutYear}</span>
            )}
            .
          </li>
          {isEditing ? <button type="submit">Submit edit</button> : <br />}
        </form>
      </ul>
      <button onClick={toggleEditing}>
        {isEditing ? "Stop editing" : "Edit character details"}
      </button>
      <button onClick={handleDelete}>Delete This Character</button>
    </>
  );
}

export default OneCharacter;
