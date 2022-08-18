import React, { useState } from 'react'
import "./MessageSender.css"
import { Avatar } from "@material-ui/core"
import VideocamIcon from '@mui/icons-material/Videocam';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useStateValue } from './StateProvider';
import db from "./firebase"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


function MessagerSender() {
  const [{user}, dispatch] = useStateValue();
  const [input, setInput] = useState("")
  const [imageURL, setImageURL] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault(); 
    db.collection('posts').add({
      message: input,
      image: imageURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      profilePic: user.photoURL,
      username: user.displayName,

    })
    /* Stops it from refreshing */
    /*Just to make changes to git */
    // Some cleber DB stuff
    //Reset the values
    setInput("")
    setImageURL("")

  }
  return (
    <div className = "messageSender">
      <div className = "messageSender__top">
        <Avatar src = {user.photoURL} />
        <form>
          <input 
          value = {input}
          onChange= {(e) => setInput(e.target.value)}
          className = "messageSender__input"
          placeholder = "What's on your mind?"/>
          <input value = {imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          placeholder = "imageURL (Optional)"/>
          <button onClick = {handleSubmit} type = "submit">
            Hidden Submit
          </button>

        </form>
      </div>

      <div className = "messageSender__bottom">
        <div className = "messageSender__option"> 
        <VideocamIcon style = {{color: "red" }}/>
        <h3> Live Video </h3>
        </div>
        <div className = "messageSender__option"> 
        <PhotoLibraryIcon style = {{color: "green" }}/>
        <h3> Photo/Video </h3>
        </div>
        <div className = "messageSender__option"> 
        <InsertEmoticonIcon style = {{color: "orange" }}/>
        <h3> Feeling/Activity </h3>
        </div>
      </div>
    </div>
  )
}

export default MessagerSender