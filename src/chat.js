import firebase from './Firebase';
import { getDatabase, ref, onValue, push,remove } from 'firebase/database';
import {useState,useEffect,useRef} from 'react';
import MessageComponent from './MessageComponent';
const ChatComponent = (props)=>{
   
    const [inputState, setInputState] = useState('');
    
    //defining a state for messageList
    const[messageInfo,setMessageInfo]=useState([]);

    //defining a ref variable, onValue, just scroll this into view
    const messageEndRef = useRef(null)

    //on useEffect just update the chat if there's anything already
    useEffect(()=>{
        const database = getDatabase(firebase)

        // we then create a variable that makes reference to our database
        const dbRef = ref(database,'session '+props.uID);
        
        // add an event listener to that variable that will fire
        // from the database, and call that data 'response'.
        onValue(dbRef, (response) => {
           // here we use Firebase's .val() method to parse our database info the way we want it
        //   console.log(response.val());
          let messages =[];
          for (let entry in response.val()){
            // console.log(entry,response.val()[`${entry}`]);
            //this was tricky
            const info = response.val()[`${entry}`];
            messages.push(info);
          }
          setMessageInfo(messages);

          //scroll the div into view here
        //   console.log(messageEndRef);
          messageEndRef.current.scrollIntoView();
          
        });
        //this is not supposed to run twice
        console.log('This should not run twice');
        
        //I don't like this step
    },[props.uID]);

    const handleSubmit=(e) => {
        e.preventDefault();

        // create a variable that holds our database details
        const database = getDatabase(firebase)

        // we then create a variable that makes reference to our database
        const dbRef = ref(database,'session '+props.uID);
        
        // add an event listener to that variable that will fire
        // from the database, and call that data 'response'.
        onValue(dbRef, (response) => {
           // here we use Firebase's .val() method to parse our database info the way we want it
        //   console.log(response.val());
          let messages =[];
          for (let entry in response.val()){
            // console.log(entry,response.val()[`${entry}`]);
            //this was tricky
            const info = response.val()[`${entry}`];
            messages.push(info);
          }
          setMessageInfo(messages);
          
        })

        //now that we have what's in the message we just need the message and the timestamp and the username so we will have a dummy username 'user1' for it
        
        const entry={
            'timeStamp':Date.now(),
            'username':props.username,
            'message':inputState
        };

        //push this entry into the current reference
         push(dbRef,entry);
        setInputState('');
    };

    const handleChange=(e)=>{
        //whenever anybody writes anything just update the state of the user message. and on send push to db
        setInputState(e.target.value);
    }

    const deleteEverything=()=>{
        //reimport database here and delete everything
        const database = getDatabase(firebase)

        // we then create a variable that makes reference to our database
        const dbRef = ref(database,'session '+props.uID);
        
        remove(dbRef).then(()=>{
            console.log('removed everything');
        })

    }

    const userIsHere=(userStatus)=>{
        alert(userStatus);
    }

    return(
        <section>
            <div className="chatWindow">
                chat id:{props.uID},
                player name:{props.username}
                {/* for each message in messages, make a message component */}
                {
                    messageInfo.map((entry)=>
                    {   
                        return(
                            <MessageComponent innerData={entry} myUsername={props.username} userIsHere={userIsHere}/>
                        )
                    })
                }
                {/* Empty div to scroll to */}
                <div ref={messageEndRef} className="messageEndDiv"/>
            </div>
            <div className="messageForm">
                 <form >
                    <label>
                        type message and send:
                    </label>
                    <input type="text" onChange={handleChange} value={inputState}/>
                    <button  onClick={handleSubmit}>Send</button> 
                </form> 
            </div>
            <button className='bigDeleteButton' onClick={deleteEverything}>End Session</button>
        </section>
    );
}

export default ChatComponent;


//So we have App.js where we generate a random number as the unique id. And then that unique ID and username are passed as a prop to chatcomponent, uID also the same as session ID for the database

//now chatcomponent has an inputfield where there is a button to send an image. 

//when the app starts, a useEffect is run to fill the value from the database? or maybe not coz the database is empty right now. We'll see. Anyway it just has to run once.

//use a state variable for whatever is typed in the input

//so when the user types a message and clicks on the send button, the handleclick should push the entry to the database in the format and then change the inputstate to ''.

//in the onValue method when the data is received, it just has to be populated appropriately in the chatwindow div of the chatcomponent. Haven't reached this but I have an instinct it will work.
