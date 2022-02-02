import React from 'react';
import TopBar from "../../components/topbar/Topbar";
import SideBar from "../../components/sidebar/SideBar";
import RightBar from "../../components/rightbar/RightBar";
import Feed from "../../components/feed/Feed";
import "./home.css"
export default function Home() {
    return (
        <>
            <TopBar/>
            <div className="homeContainer">
                <SideBar/>
                <Feed/>
                <RightBar/>
            </div>
        </>

    )
}