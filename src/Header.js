import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import { Avatar, IconButton } from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add';
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
            <input placeholder = "Search Website" type = "text" />
        </div>
        </div>
     
        <div className = "header__center">
            <div className = "header__option header__option--active">
                <HomeIcon fontsize = "large"/>
            </div>
            <div className = "header__option">
                <FlagIcon fontsize = "large"/>
            </div>
            <div className = "header__option">
                <SubscriptionsOutlinedIcon fontsize = "large"/>
            </div>
            <div className = "header__option">
                <StorefrontOutlinedIcon fontsize = "large"/>
            </div>
            <div className = "header__option">
                <SupervisedUserCircleOutlinedIcon fontsize = "large"/>
            </div>

    
        </div>
        <div className = "header__right"></div>
        <div className = "header__info">
            <Avatar src={user.photoURL} />
            <h4>{user.displayName}</h4>
            <IconButton>
                <AddIcon />
            </IconButton>
            <IconButton>
                <ForumIcon />
            </IconButton>
            <IconButton>
                <NotificationsActiveIcon />
            </IconButton>
            <IconButton>
                <ExpandMoreIcon />
            </IconButton>

        </div>
    </div>
  )
}

export default Header