import React, { useState, useEffect } from 'react';
import mergeImages from 'merge-images';
import {PNG} from 'pngjs/browser'
import toast from 'react-hot-toast';
import './CSS/Skins.css';
import './CSS/Image.css';
import ToggleSwitch from './Utils/ToggleSwitch';

export function SkinDisplay(props){
  const [skinImg, setSkinImg] = useState();
  const [overflow, setOverflow] = useState(0);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [skinTestImg, setSkinTestImg] = useState();
  const [validSkinFile, setValidSkinFile] = useState();
  const imageRef = React.useRef(null);

  useEffect(() => {
    if(props.skinFile){
      var skinUrl = URL.createObjectURL(props.skinFile);
      setSkinTestImg(skinUrl);

      return () => {
        URL.revokeObjectURL(skinUrl);
      }
    }
  }, [props.skinFile]);

  useEffect(() => {
    var skinUrl, baseUrl
    if(validSkinFile && props.baseFile){
      skinUrl = URL.createObjectURL(validSkinFile);
      baseUrl = URL.createObjectURL(props.baseFile);
      mergeImages([baseUrl, skinUrl])
                .then((img) => setSkinImg(img));      

      //Generate coverage info
      getCoverageData(validSkinFile, baseUrl).then((coverageData) =>{
        props.setCoverage.call(undefined, coverageData[0].toFixed(2));
        setOverflow(coverageData[1].toFixed(2));
        generateHeatmap(coverageData[2]);
      });
    }
    else{
      setOverflow(0);
      props.setCoverage.call(undefined, 0);
      baseUrl = URL.createObjectURL(props.baseFile);
      setSkinImg(baseUrl);
    }
      
    // free memory when ever this component is unmounted
    return () => {
      URL.revokeObjectURL(skinUrl);
      URL.revokeObjectURL(baseUrl);
    }
  }, [validSkinFile, props.pose, props.breed, props.setCoverage, props.baseFile]);

  function onSkinTestLoad(e){
    if(e.target.width !== 350 && e.target.height !== 350){
      props.setSkinFile("");
      setValidSkinFile("");
      setOverflow(0);
      props.setCoverage.call(undefined, 0);
      toast(`Skin file must be 350 x 350 px (was ${e.target.width} x ${e.target.height} px)`);
    }
    else if(props.skinFile.size > 300000){
      props.setSkinFile("");
      setValidSkinFile("");
      setOverflow(0);
      props.setCoverage.call(undefined, 0);
      toast(`Skin file too large to be a valid skin`);
    }
    else
      setValidSkinFile(props.skinFile);
    
  }

  return(
    <div className='Skin-images'>
        <div className='Image_wrapper container'>
          <img className='Image_overlay' id='skinImage' alt='' ref={imageRef} src={skinImg}></img>
          <canvas className='Canvas_overlay' width={350} height={350} style={{visibility: showHeatmap ? 'visible' : 'hidden'}} id='heatmapImg' alt=''></canvas>
        </div>
        <div className='Skin-data'>
          <label>Coverage: {props.coverage}%</label>
          &nbsp;&nbsp;
          <label>Overflow: {overflow}%</label>
        </div>
        <p className='Skin-note'>Note: The overflow % takes transparency into account; the heatmap does not</p>
        <div className='Skin-data'>
          <ToggleSwitch isToggled={showHeatmap} setIsToggled={setShowHeatmap}/>
          &nbsp;&nbsp;
          <label>Show overflow pixels</label>
        </div>
        <img alt='' className='Image_hidden' onLoad={onSkinTestLoad} src={skinTestImg}></img>
    </div>
  );
}

async function getCoverageData(skinFile, basePath){
  var skinPNG = await getPNG(skinFile);
  let blob = await fetch(basePath).then(r => r.blob());
  var basePNG = await getPNG(blob);

  var skinGamma = []
  for(var i = 0; i < skinPNG.data.length; i += 4){
    skinGamma.push(skinPNG.data[i+3]);
  }

  var baseGamma = []
  for(i = 0; i < basePNG.data.length; i += 4){
    baseGamma.push(basePNG.data[i+3]);
  }

  var skinArea = 0;
  var baseArea = 0;
  var pixelsOutside = 0;
  var heatmap = [];
  for(i = 0; i < baseGamma.length; i++){
    skinArea += skinGamma[i];
    baseArea += baseGamma[i] > 128 ? baseGamma[i] : 0;
    if(baseGamma[i] < 128 && skinGamma[i] > 0){
      pixelsOutside += skinGamma[i];
      heatmap[i] = skinGamma[i];
    }
    else
      heatmap[i] = 0;
  }
  return [skinArea/baseArea*100, pixelsOutside/baseArea*100, heatmap];
}

function getPNG(blob) {
  return new Promise((resolve, reject) => {
    var baseReader = new FileReader();

    baseReader.onloadend = function(e){
      new PNG({filterType: 4}).parse(e.target.result, function(error, image){
        if(error){
          reject(error);
          return;
        }
        resolve(image);
      });
    };

    baseReader.readAsArrayBuffer(blob);
  });
}

function generateHeatmap(heatmapArr) {
    var imgArr = new Uint8ClampedArray(350*350*4);
    for(var i = 0; i < heatmapArr.length; i++){
      imgArr[i*4] = 255;
      imgArr[i*4+1] = 0;
      imgArr[i*4+2] = 0;
      imgArr[i*4+3] = heatmapArr[i];
    }
    const canvas = document.getElementById('heatmapImg');
    const ctx = canvas.getContext('2d');
    var imgData = new ImageData(imgArr, 350, 350);
    ctx.putImageData(imgData,0,0);
}
