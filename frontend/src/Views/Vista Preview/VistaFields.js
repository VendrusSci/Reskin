import React, { useState } from 'react';
import { FileSubmitModal } from '../Utils/FileSubmitModal';
import { VistaDropdown } from '../Utils/VistaDropdown';
import '../CSS/Skins.css';

export function VistaFields(props){
    const [vista, setVista] = useState("");
    const [dragonModalIsOpen, setDragonModalIsOpen] = useState(false);

    function onVistaChange(value){
        setVista(value);

        if(value > 0){
           fetch(`/api/assets/vista/${value}`, {
                method: 'GET',
            })
            .then((response) => response.blob())
            .then((blob) => {
                props.setVistaFile(blob);
            })
            .catch((error) => {
                console.log(error);
            }); 
        }
        else{
            props.setVistaFile(undefined);
        }
    }

    return(
        <div className='Skin-fields'>
            <div className='Skin-input'>
                <label>Select dragon:</label> &nbsp;
                <button className='Skin-button' onClick={() => setDragonModalIsOpen(true)}>Upload</button>
                <FileSubmitModal setFile={props.setDragonFile} modalIsOpen={dragonModalIsOpen} setModalIsOpen={setDragonModalIsOpen} title={"Upload Dragon Image"}/>
            </div>
            <div className='Skin-input'>
                <label>Select vista:</label>
                &nbsp;&nbsp;
                <VistaDropdown vista={vista} onVistaChange={onVistaChange}/>
            </div>
        </div>
    );
}