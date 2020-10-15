// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAg3MzNLytBLwuohCFEblwO5FxiZRT81Js",
    authDomain: "whatsapp-clone-aae9e.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-aae9e.firebaseio.com",
    projectId: "whatsapp-clone-aae9e",
    storageBucket: "whatsapp-clone-aae9e.appspot.com",
    messagingSenderId: "150231501913",
    appId: "1:150231501913:web:5e406238688f62b84cf548",
    measurementId: "G-7EK9DQ0T0W"
  };
  const firebaseapp = firebase.initializeApp(firebaseConfig)
  const db = firebaseapp.firestore()
  const auth = firebaseapp.auth()
  const provider = new firebase.auth.GoogleAuthProvider();
  export {auth, provider}
  export default db



//   import React,{useEffect, useState} from "react";
// import "./sidebar.css";
// import SidebarChat from "./Chat";
// import { Avatar, IconButton } from "@material-ui/core";
// import { DonutLarge, Chat, MoreVert, SearchOutlined } from "@material-ui/icons";
// import db from "../firebase"

// function Sidebar() {
//   const [rooms, setRooms] = useState([])
//   useEffect(() => {
//     db.collection("Rooms").onSnapshot(snapshot=>{
//       setRooms(snapshot.docs.map(item=>(
//         {
//           id:item.id,
//           data:item.data()
//         }
//       )))
//     })
   
//   }, [])
//   return (
//     <div className="sidebar">
//       <div className="sidebar_header">
//         <Avatar className="size1" />
//         <div className="sidebar_header_right">
//           <IconButton>
//             <DonutLarge className="size" />
//           </IconButton>
//           <IconButton>
//             <Chat className="size" />
//           </IconButton>
//           <IconButton>
//             <MoreVert className="size" />
//           </IconButton>
//         </div>
//       </div>
//       <div className="sidebar_search">
//         <div className="sidebar_searchcointainer">
//           <SearchOutlined />
//           <input placeholder="Search or start a new chat" type="text" />
//         </div>
//       </div>
//       <div className="sidebar_chats">
//         <SidebarChat addnewchat/>
//         {rooms.map((room)=>(
//           <SidebarChat key={room.id} id={room.id} name={room.data.name} />)
//         )}
//       </div>
//     </div>
//   );
// }

// export default Sidebar;
