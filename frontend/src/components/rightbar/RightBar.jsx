import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import {Add, Remove} from "@mui/icons-material";

export default function RightBar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const DEFAULT_ID = "0";
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    let [followed, setFollowed] = useState(
        currentUser.followings.includes(user ? user._id : DEFAULT_ID)
    );
    followed = currentUser.followings.includes(user ? user._id : DEFAULT_ID)

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user ? user._id : DEFAULT_ID));
    }, [currentUser])

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
    }, [user]);

    const handleClick = async () => {
        try {
            if (followed) {
                await axios.put(`/users/${user._id}/unfollow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
                await axios.put(`/users/${user._id}/follow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: "FOLLOW", payload: user._id });
            }
        } catch (err) {
        }
    };

    const HomeRightBar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src={PF + "/gift.png"} alt="" />
                    <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
                </div>
                <img className="rightBarAd" src={PF + "/ad.png"} alt="" />
                <h4 className="rightBarTitle">Online Friends</h4>
                <ul className="rightBarFriendList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        );
    };

    const ProfileRightBar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <button className="rightBarFollowButton" onClick={handleClick}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove /> : <Add />}
                    </button>
                )}
                <h4 className="rightBarTitle">User information</h4>
                <div className="rightBarInfo">
                    <div className="rightBarInfoItem">
                        <span className="rightBarInfoKey">City:</span>
                        <span className="rightBarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightBarInfoItem">
                        <span className="rightBarInfoKey">From:</span>
                        <span className="rightBarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightBarInfoItem">
                        <span className="rightBarInfoKey">Relationship:</span>
                        <span className="rightBarInfoValue">
                            {user.relationship === 1 ? "Single"
                            : user.relationship === 2
                                ? "Married"
                                : "-"}
                        </span>
                    </div>
                </div>
                <h4 className="rightBarTitle">User friends</h4>
                <div className="rightBarFollowings">
                    {friends.map((friend) => (
                        <Link
                            to={"/profile/" + friend.username}
                            style={{ textDecoration: "none" }}
                        >
                            <div className="rightbarFollowing">
                                <img
                                    src={
                                        friend.profilePicture
                                            ? PF + friend.profilePicture
                                            : PF + "person/noAvatar.png"
                                    }
                                    alt=""
                                    className="rightBarFollowingImg"
                                />
                                <span className="rightBarFollowing">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        );
    };
    return (
        <div className="rightBar">
            <div className="rightBarWrapper">
                {user ? <ProfileRightBar /> : <HomeRightBar />}
            </div>
        </div>
    );
}
