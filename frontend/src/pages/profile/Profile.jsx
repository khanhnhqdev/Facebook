import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import SideBar from "../../components/sidebar/SideBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import React from "react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;

    useEffect(() => {
        const fetchUser = async () => {
            console.log(username);
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        };
        fetchUser();
    }, [username]);
    return (
        <>
            <Topbar />
            <div className="profile">
                <SideBar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={user.coverPicture
                                    ? PF + user.coverPicture
                                    : PF + "person/noCover.png"}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={user.profilePicture
                                    ? PF + user.profilePicture
                                    : PF + "person/noAvatar.png"}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <RightBar user={user}/>
                    </div>
                </div>
            </div>
        </>
    );
}
