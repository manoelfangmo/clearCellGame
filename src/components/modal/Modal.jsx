import React from 'react'
import "./modal.scss"
import ReactDom from 'react-dom'
export default function Modal({open, onClose, width, setWidth, length, setLength}) {
    const maxLength = 10;
    const maxWidth = 10;
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

    const changeLength = (e) => {
        setLength(e.target.value);
    }
    const changeWidth = (e) =>{
        setWidth(e.target.value);
    }

    return ReactDom.createPortal(
        <>
                <div className="overlay"></div>
                <div className="modal">
                <form action="">
                    <label for="length">Length:</label>
                        <select value={length} onChange={changeLength}>
                            {lengthList.map((d,index) => (
                                <option value={d}>{d}</option>
                            ))}
                        </select> <br />

                    <label for="width">Width:  </label>
                        <select value={width} onChange={changeWidth}>
                            {widthList.map((d) => (
                                <option value={d}>{d}</option>
                            ))}

                        </select> <br />

                    <label for="speed">Speed:  </label>
                        <select name="length">

                        </select> <br />
                        
                </form>    
                <button onClick={onClose} type="submit">Submit</button>

                </div>
        
        </>,
        document.getElementById('portal')

    )
}

