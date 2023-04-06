import React, { useState } from "react";
import "reactjs-popup/dist/index.css";
import AddPopup from "./AddPopup";
import Bottom from './Bottom';
import { AiOutlineClose } from 'react-icons/ai';

function Header() {
    const [popupValue, setPopupValue] = useState(false);
    const togglePop = () => {
        setPopupValue(!popupValue)
    };
    return (
     <>
     <div className = 'title'>TODO List</div>
      <div className = 'header'>
        {/* <Popup trigger = { <button className = 'button' >Add Task</button> } ></Popup> */}
        <button className = 'button' onClick = {togglePop}>Add Task</button>
        { (popupValue && 
            <div className = "popupBg">
                <div className = "popupBox" >
                    <div className = "alignCloseTag">
                        <div className = "closeTag" onClick = {togglePop}>
                            <div className = "closeIcon"><AiOutlineClose /></div>
                        </div>
                        <AddPopup />
                    </div>
                </div>
            </div> ) }
        <select className = 'dropDown'>
          <option>All</option>
          <option>Incompleted</option>
          <option>Completed</option>
        </select>
      </div>
      <Bottom />
      </>
    )
}
export default Header