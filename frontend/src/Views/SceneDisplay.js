import React, { useState, useEffect } from 'react';
import './CSS/Skins.css';
import './CSS/Image.css';

export function SceneDisplay(props){

    const [dragonImg, setDragonImg] = useState();
    const [sceneImg, setSceneImg] = useState();
    const [sceneBgPath, setSceneBgPath] = useState(undefined);
    const [sceneStyle, setSceneStyle] = useState("Scene_overlay");
    const imageRef = React.useRef(null);

    useEffect(() => {
        var dragonUrl

        if(!props.dragonFile)
            dragonUrl = undefined;
        else
            dragonUrl = URL.createObjectURL(props.dragonFile);

        setDragonImg(dragonUrl);

        // free memory when ever this component is unmounted
        return () => {
          URL.revokeObjectURL(dragonUrl);
        }
      }, [props.dragonFile]);
    
    useEffect(() => {
      if(props.sceneFile){
        setSceneBgPath('/scene_bg_full.png');
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
          <img className='Image_overlay_preview' id='dragonImage' alt="" ref={imageRef} src={dragonImg}></img>
          <img className={sceneStyle} id='sceneImage' alt="" src={sceneImg}></img>
          <img className='Scene_background' id='sceneBackground' alt="" src={sceneBgPath}></img>
        </div>
      </div>
    );
}