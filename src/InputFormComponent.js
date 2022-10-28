import { useState } from "react";

const InputFormComponent=(props)=>{
    //enter your name
    //create new chat or join existing
    //when they click on join existing then ask for the code and then open that particular session.
    const [user,setUser]= useState('');

    //state to see if the user is starting a fresh game

    const handleInputChange=(e)=>{
        e.preventDefault();
       
        setUser(e.target.value);
    }

    return(
        <div>
          <form className='entryForm'>
            <div>
                <label >Please enter your username </label>
                <input type="text" onChange={handleInputChange} value={user}/>
            </div>

          
                
               
                    <label >Please write the room ID you want to join</label>
                <input type="text" />
               
               
            

            <div className="buttons">
                
                <button onClick={
                    ()=>{props.clickFunction(user)
                    }}> Start New</button>
                    
                

                <button onClick={
                    ()=>{
                        props.clickFunction(user);
                    }}> Join With Someone</button>
            </div>

          </form>
        </div>
    );
}

export default InputFormComponent;