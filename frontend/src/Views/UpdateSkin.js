import {SkinUpdateFields} from './SkinUpdateFields.js';
import {SkinDisplay} from './SkinDisplay.js';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import './CSS/App.css';
import toast from 'react-hot-toast';

export function UpdateSkin(){
    const [skinFile, setSkinFile] = useState("");
    const [baseFile, setBaseFile] = useState(undefined);
    const [breed, setBreed] = useState(undefined);
    const [pose, setPose] = useState(undefined);
    const [coverage, setCoverage] = useState(0);
    const [skinInfo, setSkinInfo] = useState(undefined);
    const [skinName, setSkinName] = useState("");
    const navigate = useNavigate();
    
    const location = useLocation();
    var urlParts = location.pathname.split("/");
    var skinId = urlParts[urlParts.length - 2];
    var accessGuid = location.search.substring(location.search.lastIndexOf('=') + 1);

    useEffect(() =>{
        //Check access guid
        fetch('/api/skin/' + skinId + '/' + accessGuid, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.success === false){
                toast(result.message);
                return navigate("../skins");
            }
        })
        .catch((error) => {
            console.log(error);
            return navigate("../skins");
        });

        //Fetch skin data
        fetch('/api/skin/' + skinId, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((result) => {
            setSkinInfo(result);
            setBreed(result.currentBreed);
            setPose(result.currentPose);
            setSkinName(result.skinName);
        })
        .catch((error) => {
            console.log(error);
        });

        //Fetch skin image
        fetch('/api/skin/' + skinId +'/image', {
            method: 'GET'
        })
        .then((response) => response.blob())
        .then((blob) => {
            setSkinFile(blob);
        })
        .catch((error) => {
            console.log(error);
        });

    }, [skinId, accessGuid, location, navigate]);

    useEffect(() => {
        if(breed !== undefined && pose !== undefined){
            var baseId = breed + '_' + pose; 
            //Fetch base
            fetch('/api/assets/base/' + baseId, {
                method: 'GET'
            })
            .then((response) => response.blob())
            .then((blob) => {
                setBaseFile(blob);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }, [breed, pose]);

    if(skinInfo === undefined || skinFile === undefined || baseFile === undefined)
        return <h3>Loading</h3>;

    return( 
        <div className='App-body'>
            <SkinUpdateFields setSkinFile={setSkinFile} setBreed={setBreed} setPose={setPose} setSkinName={setSkinName}
                        skinFile={skinFile} breed={breed}  pose={pose} coverage={coverage} skinName={skinName}
                        skinId={skinId} accessGuid={accessGuid}/>
            <SkinDisplay setCoverage={setCoverage} 
                        skinFile={skinFile} baseFile={baseFile} breed={breed} pose={pose} coverage={coverage}/>
        </div>
    );
}