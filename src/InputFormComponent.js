import {  useState } from "react";
import firebase from './Firebase';
import { get, getDatabase, ref, child } from 'firebase/database';

const InputFormComponent=(props)=>{
    //enter your name
    //create new chat or join existing
    //when they click on join existing then ask for the code and then open that particular session.
    const [user,setUser]= useState('');
    const [roomID,setRoomID] = useState(0);

    //set a state for gameMode, once the button is clicked changed this state to joinMode or newMode
    const[gameMode, setGameMode]= useState('New');

    //state to see if the user is starting a fresh game

    const handleInputChange=(e)=>{
        e.preventDefault();
        const source = e.target.name;
        if(source==='username'){
            setUser(e.target.value);
        }
        else if(source==="roomID"){
            setRoomID(e.target.value);
        }
       
        
    }

    //function to check database if room is available
    const checkIfRoomAvailable=(roomID)=>{
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        get(child(dbRef,`session `+roomID)).then((snapshot)=>{
        if(snapshot.exists()){
            //room exists, so if this alert shows it means we can load the chatroom gotta make this component in app.js
            alert('room exists');

            //also check if the user is not blank
            if(user===''){
                alert(`ghost users not allowed, If you dont have a name then generate a name using my name generator api?`)
                props.loadChatroom(roomID,'lazyGuy');
            }else{
                props.loadChatroom(roomID,user);
            }
            
        }
        else{
            //room doesn't exist
            alert(`room doesn't exist`);
        }
        }).catch((error)=>{
        console.error(error);
        alert(`Firebase error:`,error);
        });
    }   

    const configureJoinMode=(e)=>{
        e.preventDefault();
        //note that the gameMode is set to join only if somebody hasn't already joined
        if(gameMode!=='join'){
            setGameMode('join');
        //so once this is set to join, it can trigger a re-render. I want this to make sure the room field is visible now
        }
        else{
            // Now we want the user to search the database for whatever the roomId someone types
            //whensomebody types this just search if there is a child available in the database
            checkIfRoomAvailable(roomID);


        }
        
    }

    const configureNewMode=()=>{
        if(user===''){
            alert(`ghost users not allowed, If you dont have a name then generate a name using my name generator api?`)
        }else{
            //name is not blank, create a random number and generate the chatroom
            const randomID = Math.ceil(Math.random()*1000000);
            props.loadChatroom(randomID,user);
        }
    }

    return(
        <div>
          <form className='entryForm'>
            <div>
                <label >Please enter your username </label>
                <input type="text" onChange={handleInputChange} value={user} name="username"/>
            </div>
            <div>
            {/* this field is visible if game mode is set to join */}
            {
                (gameMode==='join')?
                <>
                    <label >Please write the room ID you want to join</label>
                    <input type="text" onChange={handleInputChange} value={roomID} name="roomID"/>
                </>:
                <></>
            }   
            </div>
               
            

            <div className="buttons">
                
                <button value="create" onClick={configureNewMode}> Start New</button>
                    
                
                {/* on click set the mode to join */}
                <button value="join" onClick={configureJoinMode}> Join With Someone</button>
            </div>

          </form>
        </div>
    );
}

export default InputFormComponent;