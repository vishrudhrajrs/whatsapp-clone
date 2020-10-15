import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, colors } from "@material-ui/core";
import db from "../firebase"
import { Link } from "react-router-dom";


function Chat(props) {
 
 let Colors = {
  blue:"#0f3057",
  blue1:"#00587a",
  pink_red:"#ff414d",
  voilet:"#2a3d66",
  voilet1:"#9d65c9",
  red:"#ec0101",
  l_blue:"#318fb5",
  d_red:"#7d0633",
  orange1:"#f08a5d",
  orange:"#ff5722",
  
};

var randomProperty = function (obj) {
  var keys = Object.keys(obj);
  return obj[keys[ keys.length * Math.random() << 0]];
};
const [color, setColor] = useState("#800080")
  const createchat = () => {
  
    const roomname = prompt("Please enter name of chat name");
    const roomurl = prompt("Please enter image url");
    if (roomname) {
      db.collection("Rooms").add({
        name:roomname,
        url:roomurl,
      })
    }
  }; 
  const [Messages, setMessages] = useState([])
  useEffect(()=>{
setColor(randomProperty(Colors))
  },[])
  useEffect(()=>{
      if(props.id){
        db.collection("Rooms").doc(props.id).collection("Messages").orderBy("timestamp", "desc").onSnapshot(snap=>{
          setMessages(snap.docs.map(message=>(message.data())))
        })
      }
    },[props.id])
  return !props.addnewchat ? (
    <Link className="link"  to={`/rooms/${props.id}`}>
    <div className="sidebarchat">
      <Avatar src={props.url==="" ? "something" : props.url} alt={props.name} style={{backgroundColor:color}}/>
   
      <div className="sidebarchat_info">
        <h3>{props.name}</h3>
  <span>{Messages[0]?.message.substring(0,20)}{Messages[0]?.message.length > 20 && "..."}</span>
      </div>
    </div>
    </Link>
  ) : (
    <div className="sidebarchat_add" onClick={createchat}>
      <h2>Add new Chat</h2>
    </div>
  );
}

export default Chat;
// Colors.names = {
//   blue:"#0f3057",
//   blue1:"#00587a",
//   pink_red:"#ff414d",
//   voilet:"#2a3d66",
//   red:"#ec0101",
//   l_blue:"#318fb5",
//   d_red:"#7d0633",
//   orange:"#ff5722",
//   purple:"#150485",
// };



// Colors.names = {
//   aqua: "#00ffff",
 
//   black: "#000000",
//   blue: "#0000ff",
//   brown: "#a52a2a",

//   darkblue: "#00008b",
//   darkcyan: "#008b8b",
//   darkgrey: "#a9a9a9",
//   darkgreen: "#006400",
//   darkkhaki: "#bdb76b",
//   darkmagenta: "#8b008b",
//   darkolivegreen: "#556b2f",
//   darkorange: "#ff8c00",
//   darkorchid: "#9932cc",
//   darkred: "#8b0000",
//   darksalmon: "#e9967a",
//   darkviolet: "#9400d3",
//   fuchsia: "#ff00ff",
//   gold: "#ffd700",
//   green: "#008000",
//   indigo: "#4b0082",
//   khaki: "#f0e68c",
//   lightblue: "#add8e6",
//   lightcyan: "#e0ffff",
//   lightgreen: "#90ee90",
//   lightgrey: "#d3d3d3",

//   lime: "#00ff00",
//   magenta: "#ff00ff",
//   maroon: "#800000",
//   navy: "#000080",
//   olive: "#808000",
//   orange: "#ffa500",
//   pink: "#ffc0cb",
//   purple: "#800080",
//   violet: "#800080",
//   red: "#ff0000",
// };