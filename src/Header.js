import React from 'react';
import './Header.css';
import ButtonWithDropDown from './DropdownButton';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Avatar, IconButton } from '@material-ui/core'
import ForumIcon from '@mui/icons-material/Forum';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useStateValue } from './StateProvider';

function Header() {
    const [{user}, dispatch] = useStateValue();

  return (
    <div className = "header">
        <div className = "header__left"> 
        <img src = "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/2048px-Facebook_f_logo_%282021%29.svg.png" alt = ""/>
        <div className = "header__input">
            <SearchIcon/>
            <input placeholder = "Search LinkedUp" type = "text" />
        </div>
        </div>
     
        <div className = "header__center">
            <div className = "header__option header__option--active">
                <HomeIcon fontsize = "large"/>
                Home
            </div>
            <div className = "header__option">
                <PeopleIcon fontsize = "large"/>
                Friends
            </div>
            <div className = "header__option">
                <WorkIcon fontsize = "large"/>
                Jobs
            </div>
            <div className = "header__option">
                <CampaignIcon fontsize = "large"/>
                Referrals
            </div>
            <div className = "header__option">
                <ForumIcon fontsize = "large"/>
                Messages
            </div>

    
        </div>
        <div className = "header__right">
            <div className = "header__dropdown">
                <ButtonWithDropDown />
            </div>
            <div className = "header__info">
                <Avatar src={user.photoURL} />
                <h4>{user.displayName}</h4>
            </div>
        </div>
    </div>
  )
}


export default Header