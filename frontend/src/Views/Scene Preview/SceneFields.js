import React, { useState } from 'react';
import { SceneDropdown } from '../Utils/SceneDropdown';
import ToggleSwitch from '../Utils/ToggleSwitch';
import { FileSubmitModal } from '../Utils/FileSubmitModal';
import '../CSS/Skins.css';

export function SceneFields(props){
    const [scene, setScene] = useState("");
    const [dragonModalIsOpen, setDragonModalIsOpen] = useState(false);

    function onSceneChange(value){
        setScene(value);

        if(value > 0){
           fetch(`/api/assets/scene/${value}?fullImage=${true}`, {
                method: 'GET',
            })
            .then((response) => response.blob())
            .then((blob) => {
                props.setSceneFile(blob);
            })
            .catch((error) => {
                console.log(error);
            }); 
        }
        else{
            props.setSceneFile(undefined);
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
                <label>Select scene:</label>
                &nbsp;&nbsp;
                <SceneDropdown scene={scene} onSceneChange={onSceneChange} showDefault={false}/>
            </div>
            <div className='Skin-input'>
                <label>Scenic mode:</label>
                &nbsp;&nbsp;
                <ToggleSwitch isToggled={props.isOpaque} setIsToggled={props.setIsOpaque}/>
            </div>
        </div>
    );
}