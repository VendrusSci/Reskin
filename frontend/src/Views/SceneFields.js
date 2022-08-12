import React, { useState } from 'react';
import { SceneDropdown } from './Utils/SceneDropdown';
import ToggleSwitch from './Utils/ToggleSwitch';
import './CSS/Skins.css';

export function SceneFields(props){
    const [scene, setScene] = useState("");

    function onDragonPathChange(e){
        if (e.target.files && e.target.files[0]) {
            props.setDragonFile(e.target.files[0]);
        }  
    }

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
                <label className="Skin-label-button">
                    <input className='Skin-file-input' onChange={onDragonPathChange} type="file" accept="image/png"/>
                    Choose File
                </label>
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