import React,{useEffect, useState} from "react";
import "./sidebar.css";
import SidebarChat from "./Chat";
import { Avatar, IconButton } from "@material-ui/core";
import { DonutLarge, Chat, MoreVert, SearchOutlined } from "@material-ui/icons";
import db, {auth} from "../firebase"
import { useStateValue } from "../StateProvider";
import { actionType } from '../reducer'

function Sidebar() {
  const [{user}, dispatch] = useStateValue();
  const [rooms, setRooms] = useState([])
  const [search, setsearch] = useState("")
  const signOut= ()=>{
    auth.signOut().then(()=>{
      dispatch({
        type: actionType.SET_USER,
        user:null
    })
    }).catch(err=>{
      alert(err.message)
    });
    
  
  }
  
  useEffect(() => {
    db.collection("Rooms").onSnapshot(snapshot=>{
      setRooms(snapshot.docs.map(item=>(
        {
          id:item.id,
          data:item.data()
        }
      )))
    })
   
  }, [])
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar className="size1" src={user?.photoURL} onClick={signOut}/>
        <div className="sidebar_header_right">
          <IconButton>
            <DonutLarge className="size" />
          </IconButton>
          <IconButton>
            <Chat className="size" />
          </IconButton>
          <IconButton>
            <MoreVert className="size" />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchcointainer">
          <SearchOutlined />
          <input placeholder="Search or start a new chat" type="text" value={search} onChange={(e)=>{
            setsearch(e.target.value);
            console.log(e.target.value);
            console.log("search", search)
          }}/>
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat addnewchat/>
        {rooms.map((room)=>{
          if(room.data.name.toLowerCase().includes(search.toLowerCase()) || search===""){
          return (<SidebarChat key={room.id} id={room.id} url={room.data.url} name={room.data.name} />)
          }
        }
        )}
      </div>
    </div>
  );
}

export default Sidebar;
