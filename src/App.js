import "./scss/styles.scss"
// import './App.css';

import { useState } from 'react';
import InputFormComponent from './InputFormComponent';
import ChatComponent from './chat';
import firebase from './Firebase';
import { get, getDatabase, ref, child, push } from 'firebase/database';


function App() {
  //useState to monitor username
  const[id,setGeneratedID] = useState(0);
  //a state to monitor if game has started

  const[user,setUserName]= useState('');

  const handleClick=(user,roomID,e)=>{
    //figure out where the click came from
    console.log(e);
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

  
  const bringBack=(roomNumber,user)=>{
    pushFinalEntry(roomNumber,user);

    console.log(`${user} just exited`);
    //add the code to push user just exited out of the chat
    setGeneratedID(0);
  }

  const pushInitialEntry=(roomNumber,user)=>{
    //pushes the text initial entry
    const database = getDatabase(firebase);
    // pushes the message - has entered into the database

    const dbRef = ref(database,'session '+roomNumber);
    push(dbRef,{
      'timeStamp':Date.now(),
      'username':user,
      'message':'has entered'
    });
  }

  const pushFinalEntry = (roomNumber,user)=>{
    console.log(roomNumber,user);
    //pushes the text final entry
   
    const database = getDatabase(firebase);
    // pushes the message - has entered into the database

    const dbRef = ref(database,'session '+roomNumber);
    push(dbRef,{
      'timeStamp':Date.now(),
      'username':user,
      'message':'has exited'
    });
  }

  const loadChatRoom=(roomNumber,user)=>{

    //push that user has entered in the database
    console.log('user has entered');
    pushInitialEntry(roomNumber,user);
    
    setUserName(user);
    setGeneratedID(roomNumber);
    
    
  }

  return (
    <div className="App">
      {/* //when user clicks the button, they will get a random number and a chat will start */}
      
      {
        
        id!==0?
        (
          <ChatComponent uID={id} username={user}/>
        )  :(

          <InputFormComponent clickFunction={handleClick} loadChatroom={loadChatRoom}/>
        )
      }
      {
        id!==0?
          <button onClick={()=>{bringBack(id,user)}}>Go Back</button>
        :<></>
      }
    </div>
  );
}

export default App;
