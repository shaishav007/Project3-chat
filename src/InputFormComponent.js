import { useState } from "react";

const InputFormComponent=(props)=>{
    //enter your name
    //create new chat or join existing
    //when they click on join existing then ask for the code and then open that particular session.
    const [user,setUser]= useState('');
    const [roomID,setRoomID] = useState(0);

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

    return(
        <div>
          <form className='entryForm'>
            <div>
                <label >Please enter your username </label>
                <input type="text" onChange={handleInputChange} value={user} name="username"/>
            </div>

          
                
               
                    <label >Please write the room ID you want to join</label>
                <input type="text" onChange={handleInputChange} value={roomID} name="roomID"/>
               
               
            

            <div className="buttons">
                
                <button value="create" onClick={
                    (e)=>{props.clickFunction(user,roomID,e)
                    }}> Start New</button>
                    
                

                <button value="join" onClick={
                    (e)=>{
                        props.clickFunction(user,roomID,e);
                    }}> Join With Someone</button>
            </div>

          </form>
        </div>
    );
}

export default InputFormComponent;