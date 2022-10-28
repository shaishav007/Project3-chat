
import './App.css';
import { useState } from 'react';
import InputFormComponent from './InputFormComponent';
import ChatComponent from './chat';
import firebase from './Firebase';
import { get, getDatabase, ref, child } from 'firebase/database';
function App() {
  //useState to monitor username
  const[id,setGeneratedID] = useState(0);

  //a state to monitor if game has started

  const[user,setUserName]= useState('');

  const handleClick=(user,roomID,e)=>{
    //figure out where the click came from
    console.log(e.target.value);
    console.log('roomID',roomID);
    //check if the value in the database matches the id
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    get(child(dbRef,`session `+roomID)).then((snapshot)=>{
      if(snapshot.exists()){
        console.log('room exists');
        console.log(snapshot.val());
        
        
      }
      else{
        console.log("No data available");    
            //on click generate a random number 
        const randomID = Math.ceil(Math.random()*1000000);
        // console.log(randomID);
        //change the state now
        roomID = randomID;
        
      }
    }).catch((error)=>{
      console.error(error);
    });
    setUserName(user);
    setGeneratedID(roomID);

    console.log(`id`,id);
    
    
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
