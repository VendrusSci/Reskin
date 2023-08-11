import React, { useState, useEffect } from 'react';
import mergeImages from 'merge-images';
import toast from 'react-hot-toast';
import '../CSS/Skins.css';
import '../CSS/Image.css';

export function SkinSelfServiceDisplay(props){

    const [skinImg, setSkinImg] = useState();
    const [sceneImg, setSceneImg] = useState();
    const [sceneBgPath, setSceneBgPath] = useState(undefined);
    const [sceneStyle, setSceneStyle] = useState("Scene_overlay");
    const imageRef = React.useRef(null);

    useEffect(() => {
        var skinUrl, dragonUrl

        if(!props.dragonFile)
            dragonUrl = '/skin_bg.png';
        else
            dragonUrl = URL.createObjectURL(props.dragonFile);
        
        if(props.skinFile){
            skinUrl = URL.createObjectURL(props.skinFile);
            mergeImages([dragonUrl, skinUrl])
                .then((img) => {
                  setSkinImg(img);
                  if(!props.dragonFile && props.sceneFile){
                    toast("Skin selected without dragon - background applied")
                  }
                });
        }
        else{
            setSkinImg('/nodragon.png');
        }

        // free memory when ever this component is unmounted
        return () => {
          URL.revokeObjectURL(skinUrl);
          URL.revokeObjectURL(dragonUrl);
        }
      }, [props.baseFile, props.skinFile, props.dragonFile, props.apparelFile, 
          props.sceneFile, props.pose, props.breed]);
    
    useEffect(() => {
      if(props.sceneFile){
        setSceneBgPath('/scene_bg.png');
        setSceneImg(URL.createObjectURL(props.sceneFile));
      }
      else{
        setSceneBgPath(undefined);
        setSceneImg(undefined);
      }

      if(props.isOpaque){
        setSceneStyle('Scene_overlay');
      }
      else{
        setSceneStyle('Scene_overlay_faded')
      }

      return () => {
        URL.revokeObjectURL(props.sceneFile);
      }
    }, [props.sceneFile, props.isOpaque]);

    return(
      <div className='Skin-images'>
        <div className='Image_wrapper container'>
          <img className='Image_overlay_preview' id='skinImage' alt="" ref={imageRef} src={skinImg}></img>
          <img className={sceneStyle} id='sceneImage' alt="" src={sceneImg}></img>
          <img className='Scene_background' id='sceneBackground' alt="" src={sceneBgPath}></img>
        </div>
      </div>
    );
}