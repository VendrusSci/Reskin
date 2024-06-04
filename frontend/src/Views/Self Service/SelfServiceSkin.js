import React, { useState } from 'react';
import { SkinSelfServiceFields } from './SkinSelfServiceFields';
import { SkinSelfServiceDisplay } from './SkinSelfServiceDisplay';
import '../CSS/App.css';

export function SelfServiceSkin(){

    const [skinFile, setSkinFile] = useState("");
    const [dragonFile, setDragonFile] = useState("");
    const [sceneFile, setSceneFile] = useState("");
    const [isOpaque, setIsOpaque] = useState(true);
    const [skinUrl, setSkinUrl] = useState('');

    return(
        <div>
            <div className='App-title'>
                <h2>SELF-SERVICE PREVIEW</h2>
                View your dragon with a skin without upload or preview link
            </div>
            <div className='App-body'>
                <SkinSelfServiceFields setDragonFile={setDragonFile} setSceneFile={setSceneFile} setSkinFile={setSkinFile}
                                    setIsOpaque={setIsOpaque} isOpaque={isOpaque}/>
                <SkinSelfServiceDisplay skinFile={skinFile} dragonFile={dragonFile} sceneFile={sceneFile}
                                    isOpaque={isOpaque}/>
            </div>
            {/* <div>
                <div className='App-body'>
                    <label className='Skin-label'>Get transparent image url for skin id: </label>
                    <input onChange={(e) => setSkinUrl( 'https://www1.flightrising.com/static/cms/skins/art/' + e.target.value + '.png')}></input>
                </div>
                <a href={skinUrl} target='_blank' rel='noreferrer' className='Skin-clickable-link' visited='cadetblue'>{skinUrl}</a>
            </div> */}
            
        </div>
    );
}