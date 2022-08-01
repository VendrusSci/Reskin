import { SkinPreviewFields } from './SkinPreviewFields';
import { SkinPreviewDisplay } from './SkinPreviewDisplay';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import './CSS/App.css';
import toast from 'react-hot-toast';

export function PreviewSkin(){

    const [dragonFile, setDragonFile] = useState("");
    const [apparelFile, setApparelFile] = useState("");
    const [sceneFile, setSceneFile] = useState("");
    const [skinInfo, setSkinInfo] = useState(undefined);
    const [skinFile, setSkinFile] = useState(undefined);
    const [baseFile, setBaseFile] = useState(undefined);
    const [isOpaque, setIsOpaque] = useState(true);
    const location = useLocation();
    
    var skinId = location.pathname.slice(location.pathname.lastIndexOf("/") + 1, location.pathname.length) ;
    const navigate = useNavigate();

    useEffect(() =>{
        //Fetch skin data
        fetch('/api/skin/' + skinId, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.success === false){
                toast(result.message);
                return navigate("..");
            }
            setSkinInfo(result);

            var baseId = result.currentBreed + '_' + result.currentPose; 
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
        })
        .catch((error) => {
            console.log(error);
        });

        //Fetch skin image
        fetch('/api/skin/' + skinId + '/image', {
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
                return response.blob().then(data => setSkinFile(data));
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }, [skinId, navigate]);

    if(skinInfo === undefined || skinFile === undefined)
        return <h3>Loading</h3>;

    const {skinName, currentBreed, currentPose, skinType} = skinInfo;

    if(baseFile === undefined)
        return <h3>Loading</h3>;

    return(
        <div className='App-body'>
            <SkinPreviewFields setDragonFile={setDragonFile} setApparelFile={setApparelFile} setSceneFile={setSceneFile} setIsOpaque={setIsOpaque}
                                skinName={skinName} skinType={skinType} isOpaque={isOpaque}/>
            <SkinPreviewDisplay baseFile={baseFile} skinFile={skinFile}  dragonFile={dragonFile} apparelFile={apparelFile} sceneFile={sceneFile}
                                breed={currentBreed} pose={currentPose} isOpaque={isOpaque}/>
        </div>
    );
}