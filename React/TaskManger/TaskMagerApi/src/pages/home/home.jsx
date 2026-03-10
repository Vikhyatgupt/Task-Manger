import React , {useEffect , useState} from "react";
import {useNavigate} from "react-router-dom";
import './home.css';

function Home(){
    const navigate = useNavigate();
    return (
        <>
        {
            <div className="container">
                <div classname = "home-overlay">
                    <h1 className="home-title">Task Manger</h1>
                </div>
                <div className="ADD"> 
                    <button className="btn add-btn" onClick={() => navigate("/add")}>
                        ADD TASK
                    </button>
                    <button className="btn show-btn" onClick={() => navigate("/showall")}>
                        SHOW ALL TASK
                    </button>
                </div>
            </div>
        }
        </>
    )
}
export default Home ;