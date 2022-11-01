
const MessageComponent = (props)=>{

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
            <div className='msgFlexParent'>
                <div className="imgDiv">
                    <img src={require('./assets/dog_placeholderPic.jpg')} alt={props.innerData.username+'s pic'}/>
                </div>
                <div className="text">
                    {props.innerData.message}
                </div>
            </div>
            
        </div>)
        }
        </>
    );
}

export default MessageComponent;