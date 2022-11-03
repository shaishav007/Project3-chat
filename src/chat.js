import firebase from './Firebase';
import { getDatabase, ref, onValue, push,remove, get, set } from 'firebase/database';
import {useState,useEffect,useRef} from 'react';
import MessageComponent from './MessageComponent';
const ChatComponent = (props)=>{
   //defining a state for getting input from the user in the chat window
    const [inputState, setInputState] = useState('');
    
    //defining a state for messageList
    const[messageInfo,setMessageInfo]=useState([]);

    //defining a ref variable, onValue, just scroll this into view
    const messageEndRef = useRef(null)

    //one state for the userCount variable
    const [userCount,setUserCount]=useState(0);

    //function to get the userCount data from the database
    const updateUserCount=()=>{
        //get the userCount variable from the database
        const database = getDatabase(firebase);
        const dbRef = ref(database,'chatRoomData');
        //now get the datafrom the database
        get(dbRef,'userCount').then((snapshot)=>{
            if(snapshot.val()===null){
                //which means there is no userCount present, set it 
                set(dbRef,{'userCount':1})
            }
            //weird structure
            setUserCount(snapshot.val().userCount);
        }).catch((error)=>{
            console.log(error);
        });
    }

    //a useEffect to update the count?- MAYBE THERE IS A BETTER WAY, THIS WILL FIRE 1000s of times
    useEffect(()=>{
        updateUserCount();
    })

    //This is the useEffect for chats. Update the chat when the page loads
    useEffect(()=>{
        const database = getDatabase(firebase)
        const dbRef = ref(database,'session '+props.uID);
        onValue(dbRef, (response) => {
          //for all messages in the response, display them on the UI
          let messages =[];
          for (let entry in response.val()){
            //this was tricky
            const info = response.val()[`${entry}`];
            messages.push(info);
          }
          setMessageInfo(messages);
          //scroll the div into view here
          messageEndRef.current.scrollIntoView();
        });

        //I don't like writing props.uID here. I want it to be blank but netlify refuses to run on []
    },[props.uID]);

    
    //When the user clicks send message then the message is sent.
    const handleSubmit=(e) => {
        //first avoid refresh
        e.preventDefault();

        //SOME WORK TO BE DONE HERE
        //THIS IS AN EXAMPLE OF REPEATED CODE. I WANT TO REWRITE THIS CODE 
        const database = getDatabase(firebase)
        const dbRef = ref(database,'session '+props.uID);
        onValue(dbRef, (response) => {
           // here we use Firebase's .val() method to parse our database info the way we want it
          let messages =[];
          for (let entry in response.val()){
            const info = response.val()[`${entry}`];
            messages.push(info);
          }
          setMessageInfo(messages);
          
        })

        //now that we have what's in the message we just need the message and the timestamp and the username so we can just put that in
        
        const entry={
            'timeStamp':Date.now(),
            'username':props.username,
            'message':inputState,
            'iconUrl':props.iconUrl
        };

        //push this entry into the current reference
         push(dbRef,entry);
        setInputState('');
    };

    //simple function to handle change
    const handleChange=(e)=>{
        //whenever anybody writes anything just update the state of the user message. and on send push to db
        setInputState(e.target.value);
    }

    //when user clicks on end session just delete the chat entry
    const deleteEverything=()=>{
        //reimport database here and delete everything
        const database = getDatabase(firebase)

        // we then create a variable that makes reference to our database
        const dbRef = ref(database,'session '+props.uID);
        
        remove(dbRef)
    }

    

    return(
        <section>
            <div className="chatWindow">
                <div>
                chat id:{props.uID},
                player name:{props.username}
                </div>
                <div>
                    {userCount} people in here
                </div>
                
                {/* for each message in messages, make a message component */}
                {
                    messageInfo.map((entry)=>
                    {   
                        return(
                            <MessageComponent innerData={entry} myUsername={props.username} />
                        )
                    })
                }
                {/* Empty div to scroll to */}
                <div ref={messageEndRef} className="messageEndDiv"/>
            </div>
            <div >
                 <form className="messageForm">
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


//I think this needs a major rewrite but also what do I do with the amount of users. Counting them? I think that has to be people whose internet connection is not working and they might not be connected to firebase and might drop out. Wonder how they get that?
