import React, { useState } from 'react';
import '../CSS/App.css';
import { VistaFields } from './VistaFields';
import { VistaDisplay } from './VistaDisplay';


export function VistaPreview(){

    const [dragonFile, setDragonFile] = useState("");
    const [vistaFile, setVistaFile] = useState("");

    return(
        <div>
            <div className='App-title'>
                <h2>VISTA PREVIEW</h2>
                View your dragon against the site vistas
            </div>
            <br/>
            <div className='App-body-scene'>
                <VistaFields setDragonFile={setDragonFile} setVistaFile={setVistaFile}/>
                <br/>
                <VistaDisplay dragonFile={dragonFile} vistaFile={vistaFile}/>
            </div>
        </div>
    );
}