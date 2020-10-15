import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  SearchOutlined,
  MoreVert,
  InsertEmoticon,
  Mic,
  ArrowBack,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import "./Sidechat.css";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import firebase from "firebase";

function SideChat(props) {
  const history = useHistory();
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [roomurl, setRoomurl] = useState("");
  const [maxheight, setmaxheight] = useState("0px");

  const [height, setheight] = useState(15);
  const [{ user }, dispatch] = useStateValue();
  const sendmsg = (e) => {
    e.preventDefault();
    console.log(input);
    db.collection("Rooms").doc(roomId).collection("Messages").add({
      name: user.displayName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  const [input, setInput] = useState("");
  const [messages, setmessages] = useState([]);
  useEffect(() => {
    if (roomId) {
      console.log(roomId);
      db.collection("Rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          if (snapshot.data()) {
            setRoomName(snapshot.data().name);
            setRoomurl(snapshot.data().url);
          }
        });
      db.collection("Rooms")
        .doc(roomId)
        .collection("Messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((resultsnap) => {
          setmessages(
            resultsnap.docs.map((doc) => {
              return doc.data();
            })
          );
          console.log(messages);
        });
    }
  }, [roomId]);
  return (
    <div className="sidechat">
      <div className="sidechat_header">
        <Link to="/rooms">
          <IconButton>
            <ArrowBack className="size" />
          </IconButton>
        </Link>
        <Avatar className="size1" src={roomurl} />
        <div className="sidechat_header_info">
          <h3>{roomName}</h3>
          <p>
            Last seen at
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="sidechat_header_right">
          <IconButton>
            <SearchOutlined className="size" />
          </IconButton>
          <IconButton>
            <AttachFile className="size" />
          </IconButton>
          <IconButton
            onClick={(e) => {
              if (maxheight === "0px") {
                setmaxheight("100px");
              } else {
                setmaxheight("0px");
              }
            }}
          >
            <MoreVert className="size" />
          </IconButton>
          <div
            className="remove"
            style={{ maxHeight: maxheight }}
            onClick={() => {
              console.log(history.push("/rooms"));
              props.removeRoom(roomId);
            }}
          >
            <p>Remove Room</p>
          </div>
        </div>
      </div>
      <div className="sidechat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name == user.displayName && "chat_receiver"
            }`}
          >
            <span className="sidechat_name">{message.name}</span>
            {message.message}
            <span className="sidechat_time">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="sidechat_footer">
        <InsertEmoticon className="message" />
        <form>
          <input
            placeholder="Type your message"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            style={{ height: `${height}px` }}
            value={input}
          />
          <button type="submit" onClick={sendmsg}>
            Send the message
          </button>
        </form>
        <Mic className="message" />
      </div>
    </div>
  );
}

export default SideChat;
