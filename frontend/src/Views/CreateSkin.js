import {SkinFields} from './SkinFields.js';
import {SkinDisplay} from './SkinDisplay.js';
import React, { useState, useEffect } from 'react';
import './CSS/App.css';
import toast from 'react-hot-toast';

export function CreateSkin(){

    const [skinFile, setSkinFile] = useState("");
    const [baseFile, setBaseFile] = useState("");
    const [breed, setBreed] = useState("1");
    const [pose, setPose] = useState("1");
    const [coverage, setCoverage] = useState(0);

    useEffect(() => {
        var baseId = breed + '_' + pose; 
        //Fetch base
        fetch('/api/assets/base/' + baseId, {
            method: 'GET'
        })
        .then((response) => {
            const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then(data => {
                if(data.success === false){
                    toast(data.message + ". Fatal error - please report.");
                }
            });
        }
        else{
            return response.blob().then(data => setBaseFile(data));
        }
        })
        .catch((error) => {
            toast('Error - see console');
            console.log(error);
        });
    }, [breed, pose]);

    if(baseFile === undefined || baseFile === "")
        return <h3>Loading</h3>;

    return(
        <div>
            <div className='App-title'>
                <h2>SKIN UPLOAD</h2>
                Check and upload your skin for others to preview with
            </div>
            <div className='App-body'>
                <SkinFields setSkinFile={setSkinFile} setBreed={setBreed} setPose={setPose}
                            skinFile={skinFile} breed={breed}  pose={pose} coverage={coverage}/>
                <SkinDisplay setCoverage={setCoverage} setSkinFile={setSkinFile}
                            skinFile={skinFile} baseFile={baseFile} breed={breed} pose={pose} coverage={coverage}/>
            </div>
        </div> 
    );
}
