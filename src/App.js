import "./scss/styles.scss"
// import './App.css';

import { useState } from 'react';
import InputFormComponent from './InputFormComponent';
import ChatComponent from './chat';
import firebase from './Firebase';
import { get, getDatabase, ref, child, push, set } from 'firebase/database';


function App() {
  //useState to monitor username
  const[id,setGeneratedID] = useState(0);

  //a state to monitor if game has started
  const[user,setUserName]= useState('');

  //when the user clicks on the button this snippet brings the user back. Its the best way to exit chat
  const bringBack=(roomNumber,user)=>{
    //first tell everybody in the room that this user has left the chat
    pushFinalEntry(roomNumber,user);

    //update the user count
    updateUserCount(-1);

    console.log(`${user} just exited`);
    //add the code to exit out of the chat
    setGeneratedID(0);
  }

  //NEED SOME WORK HERE. A FUNCTION CAN BE MADE TO DO THE RIGHT ENTRY
  //pushing the entry that says that user has entered
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

  //pushing the entry that user has exited
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

  //function updateUsercount gets the userCount from the data in the firebase and adds one to it or subtracts when one leaves
  const updateUserCount=(value)=>{
    const database = getDatabase(firebase);
    const dbRef = ref(database,'chatRoomData');
    //get the current value and then set it in its then method
    get(dbRef,'userCount').then((snapshot)=>{
      
      const currentUsers = snapshot.val().userCount;
      set(dbRef,{'userCount':currentUsers+value});

    });
  }

  //the function takes the number and the username and initialises that chat window.
  const loadChatRoom=(roomNumber,user)=>{
    //just before the chatroom is added, also add the current number of users? 
    updateUserCount(1);

    //push that user has entered in the database
    console.log('user has entered');
    pushInitialEntry(roomNumber,user);
    
    setUserName(user);
    setGeneratedID(roomNumber);

  }

  return (
    <div className="App">
      {/* //when user clicks the button, they will get a random number and a chat will start , id=0 will bring them back to the input form*/}
      
      {
        id!==0?
        (
          <ChatComponent uID={id} username={user} />
        )  :(

          <InputFormComponent    loadChatroom={loadChatRoom}/>
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

//SO before taking my break and maybe bringing groceries home, I need to just say my thoughts about the real time updation of how many people and how do we know they are present. we can add a usercount and an array to the database along with all the entries inside the session. 

//first step is that once end session is clicked it will delete data for everyone so we will just modify that to remove everyone and 