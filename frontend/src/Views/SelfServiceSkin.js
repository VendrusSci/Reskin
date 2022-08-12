import React, { useState } from 'react';
import { SkinSelfServiceFields } from './SkinSelfServiceFields';
import { SkinSelfServiceDisplay } from './SkinSelfServiceDisplay';
import './CSS/App.css';

export function SelfServiceSkin(){

    const [skinFile, setSkinFile] = useState("");
    const [dragonFile, setDragonFile] = useState("");
    const [sceneFile, setSceneFile] = useState("");
    const [isOpaque, setIsOpaque] = useState(true);

    return(
        <div className='App-body'>
            <SkinSelfServiceFields setDragonFile={setDragonFile} setSceneFile={setSceneFile} setSkinFile={setSkinFile}
                                setIsOpaque={setIsOpaque} isOpaque={isOpaque}/>
            <SkinSelfServiceDisplay skinFile={skinFile} dragonFile={dragonFile} sceneFile={sceneFile}
                                isOpaque={isOpaque}/>
        </div>
    );
}