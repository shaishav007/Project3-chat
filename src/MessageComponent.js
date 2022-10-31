//making a placeholder function for messagecomponent


const MessageComponent = (props)=>{

    //now if the message says 'has entered', put that as a text in div, we don't actually need a state, we just have to say that user is in and not display the user
    

    return(
        <>
        { 
            // if the message is that the guy has entered
        props.innerData.message==='has entered'||props.innerData.message==='has exited'?
        //when user enters or exits just display has entered or exited
        <div className="enterOrExit">
           { props.innerData.username+" "+props.innerData.message }
        </div>:
        //any regular message 
        (  
        <div className={
            (props.innerData.username !== props.myUsername)?
            "msgBody":
            "me"
            }>
            <div className="userName">
                {props.innerData.username}
                
            </div>
            <div className="text">
                {props.innerData.message}
            </div>
            
        </div>)
        }
        </>
    );
}

export default MessageComponent;