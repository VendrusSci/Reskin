import React, { useState } from 'react';
import '../CSS/App.css';
import { SceneDisplay } from './SceneDisplay';
import { SceneFields } from './SceneFields';

export function ScenePreview(){

    const [dragonFile, setDragonFile] = useState("");
    const [sceneFile, setSceneFile] = useState("");
    const [isOpaque, setIsOpaque] = useState(true);

    return(
        <div>
            <div className='App-title'>
                <h2>SCENE PREVIEW</h2>
                View your dragon against the site scenes
            </div>
            <br/>
            <div className='App-body-scene'>
                <SceneFields setDragonFile={setDragonFile} setSceneFile={setSceneFile}
                                    setIsOpaque={setIsOpaque} isOpaque={isOpaque}/>
                <br/>
                <SceneDisplay dragonFile={dragonFile} sceneFile={sceneFile}
                                    isOpaque={isOpaque}/>
            </div>
        </div>
    );
}