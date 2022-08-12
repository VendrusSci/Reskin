import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { SceneDropdown } from './Utils/SceneDropdown';
import ToggleSwitch from './Utils/ToggleSwitch';
import './CSS/Skins.css';

export function SkinPreviewFields(props){
    const [scene, setScene] = useState("");

    function onDragonPathChange(e){
        if (e.target.files && e.target.files[0]) {
            props.setDragonFile(e.target.files[0]);
        }  
    }

    function onApparelPathChange(e){
        if (e.target.files && e.target.files[0]) {
            props.setApparelFile(e.target.files[0]);
        }  
    }

    function onSceneChange(value){
        setScene(value);

        if(value > 0){
           fetch(`/api/assets/scene/${value}`, {
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
                <label>Skin Name:</label>
                &nbsp;&nbsp;
                <label>{props.skinName}</label>
            </div>
            <div className='Skin-input'>
                <label>Coverage:</label>
                &nbsp;&nbsp;
                <label>{props.skinType}</label>
            </div>
            <div className='Skin-input'>
                <div>
                    <label>Select dragon:</label> &nbsp;
                    <FontAwesomeIcon data-tip="<p>Your dragon's image without apparel or skins</p>" 
                    icon={faCircleQuestion}/>
                </div>
                <label className="Skin-label-button">
                    <input className='Skin-file-input' onChange={onDragonPathChange} type="file" accept="image/png"/>
                    Choose File
                </label>
            </div>
            <div className='Skin-input'>
                <div>
                    <label>Select apparel:</label> &nbsp;
                    <FontAwesomeIcon data-tip="<p>Apparel images can be created using a Marva's invisibility cloak.<br/>
                                                If you don't have one, select your dragon in the dressing room,<br/>
                                                import their apparel and add the cloak. There's a bug with saving images<br/>
                                                from the dressing room, so right click and 'Open image in new tab'</br>
                                                first, then save the image.
                                                </p>" 
                    icon={faCircleQuestion}/>
                </div>
                <label className="Skin-label-button">
                    <input className='Skin-file-input' onChange={onApparelPathChange} type="file" accept="image/png"/>
                    Choose File
                </label>
            </div>
            <div className='Skin-input'>
                <label>Select scene:</label>
                &nbsp;&nbsp;
                <SceneDropdown scene={scene} onSceneChange={onSceneChange} showDefault={true}/>
            </div>
            <div className='Skin-input'>
                <label>Scenic mode:</label>
                &nbsp;&nbsp;
                <ToggleSwitch isToggled={props.isOpaque} setIsToggled={props.setIsOpaque}/>
            </div>
            <ReactTooltip html={true}/>
        </div>
    );

}