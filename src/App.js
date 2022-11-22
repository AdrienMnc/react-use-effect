import { useEffect, useState } from "react";
import { useRef } from "react";

import "./App.css";

const App = () => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const [dataArray, setDataArray] = useState([]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  function handleClick() {
    setDataArray([...dataArray, message]);
    // inputRef.current.value = "";
    console.log(dataArray);
  }

  //Effet de bord premier rendu composant, chargement local liste
  useEffect(() => {
    const localList = JSON.parse(localStorage.getItem("list"));
    // console.log("Affichage liste:" + localList);
    if (localList) {
      setDataArray(localList);
    }
  }, []);

  //Effet de bord lors de la modification de la liste
  useEffect(() => {
    if (dataArray.length > 0) {
      localStorage.setItem("list", JSON.stringify(dataArray));
    }
  }, [dataArray]);

  return (
    <>
      <div className="App">
        <input
          ref={inputRef}
          type="text"
          id="message"
          name="message"
          onChange={handleChange}
          value={message}
        />
        <h2>Message: {message}</h2>
        <button onClick={handleClick}>Log message</button>
        <ul>
          {dataArray.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;

/**
 * 
  *   - Créez un nouveau projet React.
      - Dans le composant App, créez une variable d’état contenant un tableau vide appelée “list”
      - Ajoutez un simple <input type=“text”> et un bouton. Lors du click, le texte saisi dans l’input
        devra être ajouté à la variable d’état “list”.
      - Ajoutez un effet de bord qui, dès que la variable d’état “list” change, affiche un message
        dans la console.
      - Affichez maintenant le tableau à l’aide d’une boucle sur la page.
 * 
 * 
 * 
 */
