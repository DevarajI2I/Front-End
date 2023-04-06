import React from "react";

function AddPopup() {
    return(
        <div className = "addPopup">
            <form>
                <div className = "align popupTitle"><h1 className = "popupTitle">Add TODO</h1>
                    <div className = "algin label">
                        <label className = "label">Title</label>
                        <br />
                        <input className = "input"></input>
                    </div>
                    <div><br />
                        <label className = "labelStatus">Status</label> <br />
                        <select className = "inputs">
                            <option>Completed</option>
                            <option>Incompleted</option>
                        </select>
                    </div>
                    <div className = "popupBottom">
                        <button className = "addButton">Add Task</button>
                        <button className = "cancelButton">cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default AddPopup