import React, {useContext} from 'react';
import {Search, Person, Chat, Notifications} from '@mui/icons-material';
import './topbar.css';
import {Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
export default function TopBar() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="topBarContainer">
            <div className="topBarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo"> Facebook</span>
                </Link>

            </div>
            <div className="topBarCenter">
                <div className="searchBar">
                    <Search className="searchIcon"/>
                    <input placeholder="search for post, friend and videos" className="searchInput"/>
                </div>
            </div>
            <div className="topBarRight">
                <div className="topBarLinks">
                    <span className="topBarLink"> Home</span>
                    <span className="topBarLink"> Timeline</span>
                </div>
                <div className="topBarIcons">
                    <div className="topBarIconItem">
                        <Person/>
                        <span className="topBarIconBadge"> 1 </span>
                    </div>
                    <div className="topBarIconItem">
                        <Chat/>
                        <span className="topBarIconBadge"> 1 </span>
                    </div>
                    <div className="topBarIconItem">
                        <Notifications/>
                        <span className="topBarIconBadge"> 1 </span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img
                        src={
                            user.profilePicture
                                ? PF + user.profilePicture
                                : PF + "person/noAvatar.png"
                        }
                        alt=""
                        className="topBarImg"
                    />
                </Link>
            </div>
        </div>
    )
}