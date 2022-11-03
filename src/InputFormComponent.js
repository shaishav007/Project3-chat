import {  useState } from "react";
import firebase from './Firebase';
import { get, getDatabase, ref, child } from 'firebase/database';

const InputFormComponent=(props)=>{
    //set a state for user and roomNumber
    const [user,setUser]= useState('');
    const [roomID,setRoomID] = useState(0);

    //set a state for gameMode, once the button is clicked changed this state to joinMode or newMode
    const[gameMode, setGameMode]= useState('New');

    //when the user types in the username and the roomID they get stored in the above state
    const setUserAndRoomID=(e)=>{
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
            //if room exists, check if the username is blank
            if(user===''){
                alert(`ghost users not allowed, If you dont have a name then generate a name using my name generator api?`)
                props.loadChatroom(roomID,'lazyGuy');
            }else{
                props.loadChatroom(roomID,user);
            }
            
        }
        else{
            //room doesn't exist
            alert(`room unavailable`);
        }
        }).catch((error)=>{
        console.error(error);
        alert(`Firebase error:`,error);
        });
    }   

    //if the user selects join a room then stuff that's written here will happen
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

    //SOME TODO HERE
    //if the user clicks on new and not join then just assign a random room, maybe also SET THE CHAT ROOM DATA TO 0
    const configureNewMode=()=>{
        if(user===''){
            alert(`ghost users not allowed, If you dont have a name then generate a name using my name generator api?`)
        }else{
            //name is not blank, create a random number and generate the chatroom
            const randomID = Math.ceil(Math.random()*1000000);
            //maybe update THE DATABASE USERCOUNT BEFORE THIS?
            props.loadChatroom(randomID,user);
        }
    }

    return(
        <div>
          <form className='entryForm'>
            <div className="inputContainer">
                <label >Please enter your username </label>
                <input type="text" onChange={setUserAndRoomID} value={user} name="username"/>
            </div>
            <div className="inputContainer">
            {/* this field is visible if game mode is set to join */}
            {
                (gameMode==='join')?
                <>
                    <label >Please write the room ID you want to join</label>
                    <input type="text" onChange={setUserAndRoomID} value={roomID} name="roomID"/>
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