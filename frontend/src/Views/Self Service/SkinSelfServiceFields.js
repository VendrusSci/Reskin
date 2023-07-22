import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { SceneDropdown } from '../Utils/SceneDropdown';
import ToggleSwitch from '../Utils/ToggleSwitch';
import { FileSubmitModal } from '../Utils/FileSubmitModal';
import '../CSS/Skins.css';

export function SkinSelfServiceFields(props){

    const [scene, setScene] = useState("");
    const [dragonModalIsOpen, setDragonModalIsOpen] = useState(false);

    function onSkinPathChange(e){
        if (e.target.files && e.target.files[0]) {
            resizeImage(e.target.files[0]).then(
                function(value){
                    props.setSkinFile(value);
                },
                function(error){
                    console.log(error);
                    toast('Unable to parse skin image');
                }
            );
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

    async function resizeImage(file){
        var img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        var newFile;
        const promise = new Promise(resolve => {
            img.onload = function (event) {
                // Dynamically create a canvas element
                var canvas = document.createElement("canvas");
                canvas.width=350;
                canvas.height=350;
                var ctx = canvas.getContext("2d");

                // Actual resizing
                ctx.drawImage(img, 0, 0, 350, 350);

                canvas.toBlob(blob => {
                    newFile = blob; 
                    resolve();
                });
            }
        })
        await promise;
        return newFile;
    }

    return(
        <div className='Skin-fields'>
            <div className='Skin-input'>
                <div>
                    <label>Select skin:</label> &nbsp;
                    <FontAwesomeIcon data-tip="<p>Skin images will be automatically resized to 350x350px </br>
                                                if they are over or under that size. This may result in </br>
                                                reduced quality compared to the actual skin.</p>" 
                    icon={faCircleQuestion}/>
                </div>
                <label className="Skin-label-button">
                    <input className='Skin-file-input' onChange={onSkinPathChange} type="file" accept="image/png"/>
                    Choose File
                </label>
            </div>
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
            <ReactTooltip html={true}/>
        </div>
    );
}