import React from 'react';
import { Avatar } from "@material-ui/core";
import "./SideBarRow.css";

/** Creating a reusable componenet */
/** Passing a component we need capital letter so we don't need to import */
function SideBarRow( {src, Icon, title} ) {
  return (
    <div className = "sidebarRow">

    {src && <Avatar src={src} />} 
    {Icon && <Icon />} 


    
     <h4> {title} </h4>
    </div>
  )
}

export default SideBarRow