//making a placeholder function for messagecomponent

const MessageComponent = (props)=>{
    console.log(props.innerData.message);
    //yet to write logic for self message and other person's message
    return(
        <div className="msgBody">
            <div className="userName">
                {props.innerData.username}
                
            </div>
            <div className="text">
                {props.innerData.message}
            </div>
        </div>
    );
}

export default MessageComponent;