import React, {useState} from 'react';


 
const UserIdPrompt = (props) => {
    const [inputText, setInputText] = useState(0);

    return (
        <div>
            <span style={{display: 'block'}}>What is your user id? (numbers only)</span>
            <input value={inputText} type="number" onChange={e => setInputText(e.target.value)}/>
            <button onClick={() => props.setUserId(inputText)}>
                SAVE
            </button>
        </div>
    )
}
export default UserIdPrompt