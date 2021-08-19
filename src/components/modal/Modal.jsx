import React from 'react'
import "./modal.scss"
import ReactDom from 'react-dom'
import {useState} from "react"
export default function Modal({open, onClose, width, length, configGrid, configSpeed}) {
    const maxLength = 10;
    const maxWidth = 10;
    
    const [state, setState] = useState({width: width, length:length})
    if(!open){
        return null
    }
    const lengthList= [];
    for(let i=1; i<= maxLength; i++){
        lengthList.push(i);
    }
    const widthList= []
    for(let i=1; i<= maxWidth; i++){
        widthList.push(i);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

       
        state[name] = value;
        setState({...state})
        console.log("state", state)
    }
    
    const handleSubmit = ()=> {
        onClose();
        configGrid(state.length, state.width);
    }
    const handleSpeedChange = (e) => {
        const name = e.target.value;

        if (name === "Hard"){
            configSpeed(500)
        }else if (name === "Medium"){
            configSpeed(750)
        }else{
            configSpeed(1000)
        }

    }

    return ReactDom.createPortal(
        <>
                <div className="overlay"></div>
                <div className="modal">
                <form action="">
                    <label htmlFor="length">Length:</label>
                        <select name="length" value={state.length} onChange={handleChange}>
                            {lengthList.map((d,index) => (
                                <option value={d}>{d}</option>
                            ))}
                        </select> <br />

                    <label htmlFor="width">Width:  </label>
                        <select name="width" value={state.width} onChange={handleChange}>
                            {widthList.map((d) => (
                                <option value={d}>{d}</option>
                            ))}

                        </select> <br />

                    <label htmlFor="speed">Speed:  </label>
                        <select name="length" value="Easy" onChange={handleSpeedChange}>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                        </select> <br />
                        
                </form>    
                <button onClick={handleSubmit} type="submit">Submit</button>

                </div>
        
        </>,
        document.getElementById('portal')

    )
}

