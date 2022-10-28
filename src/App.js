
import './App.css';
import { useState } from 'react';
import InputFormComponent from './InputFormComponent';
import ChatComponent from './chat';
function App() {
  //useState to monitor username
  const[id,setGeneratedID] = useState(0);

  //a state to monitor if game has started

  const[user,setUserName]= useState('');

  const handleClick=(user)=>{
    //on click generate a random number 
    const randomID = Math.ceil(Math.random()*1000000);
    console.log(randomID);
    //change the state now

    setGeneratedID(randomID);
    setUserName(user);
  }

  


  return (
    <div className="App">
      {/* //when user clicks the button, they will get a random number and a chat will start */}
      
      {
        
        id!==0?
        (
          <ChatComponent uID={id} username={user}/>
        )  :(

          <InputFormComponent clickFunction={handleClick} />
        )
      }
    </div>
  );
}

export default App;
