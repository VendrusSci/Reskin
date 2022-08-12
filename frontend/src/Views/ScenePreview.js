import React, { useState } from 'react';
import './CSS/App.css';
import { SceneDisplay } from './SceneDisplay';
import { SceneFields } from './SceneFields';

export function ScenePreview(){

    const [dragonFile, setDragonFile] = useState("");
    const [sceneFile, setSceneFile] = useState("");
    const [isOpaque, setIsOpaque] = useState(true);

    return(
        <div className='App-body-scene'>
            <SceneFields setDragonFile={setDragonFile} setSceneFile={setSceneFile}
                                setIsOpaque={setIsOpaque} isOpaque={isOpaque}/>
            <SceneDisplay dragonFile={dragonFile} sceneFile={sceneFile}
                                isOpaque={isOpaque}/>
        </div>
    );
}