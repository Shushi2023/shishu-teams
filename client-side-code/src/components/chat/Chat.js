import axios from "axios";
import React, {useRef, useState, useEffect} from "react"
import './chat.css' 
import { ChatEngine } from 'react-chat-engine'
import { useAuth } from "../../contexts/Authcontex"

const Chat = () => {
    
    const {currUser} = useAuth();
    const [ loading, setLoading ] = useState(true)
    console.log("User ", currUser)
    const getFile = async (url) => {
        let response = await fetch(url);
        let data = await response.blob();
        return new File([data], "test.jpg", { type: 'image/jpeg' });
    }

    useEffect(() => {
        if(currUser){
            axios.get('https://api.chatengine.io/users/me', {
                headers : {
                    'project-id' : process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID, 
                    'user-name' : currUser.email, 
                    'user-secret' : currUser.uid
                }
            })
            .then(() => setLoading(false))
            .catch(e => {
                let formdata = new FormData()
                formdata.append('email', currUser.email)
                formdata.append('username', currUser.email)
                formdata.append('secret', currUser.uid)
                
                if(currUser.photoURL){
                    getFile(currUser.photoURL)
                    .then(avatar => {
                    formdata.append('avatar', avatar, avatar.name)
            
                    axios.post(
                        'https://api.chatengine.io/users/',
                        formdata,
                        { headers: { "private-key": "560b46cb-e848-4803-9034-b8ea7232be6c" }}
                    )
                    .then(() => setLoading(false))
                    .catch(e => console.log('e', e.response))
                    })
                }
                else{
                    axios.post(
                        'https://api.chatengine.io/users/',
                        formdata,
                        { headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY }}
                    )
                    .then(() => setLoading(false))
                    .catch(e => console.log('e', e.response))
                }
              })
        }
    })
    return (
        
        <ChatEngine 
            height = 'calc(100vh - 66px)'
            projectID = {process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
            userName = {currUser.email}
            userSecret = {currUser.uid}
        />
        
  )
}

export default Chat;