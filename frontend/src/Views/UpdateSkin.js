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
                return navigate("..");
            }
        })
        .catch((error) => {
            console.log(error);
            return navigate("..");
        });

        //Fetch skin data
        fetch('/api/skin/' + skinId, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.success === true){
                setSkinInfo(result);
                setBreed(result.currentBreed);
                setPose(result.currentPose);
                setSkinName(result.skinName);
            }
            else{
                toast(result.message);
                setSkinInfo(undefined);
                setBreed(undefined);
                setPose(undefined);
                setSkinName(undefined);
            }
        })
        .catch((error) => {
            console.log(error);
        });

        //Fetch skin image
        fetch('/api/skin/' + skinId +'/image', {
            method: 'GET'
        })
        .then((response) => response.blob())
        .then((response) => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(data => {
                    if(data.success === false){
                        toast(data.message);
                        return navigate("..");
                    }
                });
            }
            else{
                return response.blob().then(data => setSkinFile(data));
            }
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
            .then((response) => {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then(data => {
                        if(data.success === false){
                            toast(data.message);
                            return navigate("..");
                        }
                    });
                }
                else{
                    return response.blob().then(data => setBaseFile(data));
                }
            })  
            .catch((error) => {
                console.log(error);
            });
        }
    }, [breed, pose, navigate]);

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