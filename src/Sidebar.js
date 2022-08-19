import React from 'react'
import "./Sidebar.css"
import SideBarRow from './SideBarRow';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useStateValue } from './StateProvider';
function Sidebar() {
    const [{user}, dispatch] = useStateValue();
  return (

    <div className = "sidebar">
        <SideBarRow src = {user.photoURL} title = {user.displayName}/>
        <SideBarRow Icon = {LocalHospitalIcon} title = "Covid-19 Information Center"/>
        <SideBarRow Icon = {EmojiFlagsIcon} title = "Pages"/>
        <SideBarRow Icon = {PeopleIcon} title = "Friends"/>
        <SideBarRow Icon = {StorefrontIcon} title = "Marketplace"/>
        <SideBarRow Icon = {VideoLibraryIcon} title = "Videos"/>
        <SideBarRow Icon = {EmojiFlagsIcon} title = "Pages"/>
        <SideBarRow Icon = {ExpandMoreOutlinedIcon} title = "Pages"/>




    </div>
  )

}

export default Sidebar