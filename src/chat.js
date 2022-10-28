import firebase from './Firebase';
import { getDatabase, ref, onValue, push,remove } from 'firebase/database';
import {useState} from 'react';
import MessageComponent from './MessageComponent';
const ChatComponent = (props)=>{
   
    const [inputState, setInputState] = useState('');
    
    //defining a state for messageList
    const[messageInfo,setMessageInfo]=useState([]);
    

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
          
        })
    },[]);

    const handleSubmit=(e) => {
        e.preventDefault();
        
        console.log('submit clicked');

        
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
                            <MessageComponent innerData={entry} />
                        )
                    })
                }
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
