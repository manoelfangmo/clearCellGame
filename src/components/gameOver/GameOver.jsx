import React from 'react'
import "./gameOver.scss"
import ReactDom from 'react-dom'
import {useState} from "react"
export default function Modal({gameOver}) {
    if(!gameOver){
        return null;
    }
    function refreshPage() {
        window.location.reload(false);
      }

    return ReactDom.createPortal(
        <>
                <div className="overlay1"></div>
                <div className="modal1">
                <button onClick={refreshPage} className="button">Restart</button>
                

                </div>
        
        </>,
        document.getElementById('portal1')

    )
}

