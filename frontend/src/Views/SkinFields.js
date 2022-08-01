import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import {BreedDropdown} from './Utils/BreedDropdown';
import {PoseDropdown} from './Utils/PoseDropdown';
import './CSS/Skins.css';

export function SkinFields(props){
    const[skinName, setSkinName] = useState("Unnamed Skin");
    const navigate = useNavigate();

    function onSkinPathChange(e){
      if (e.target.files && e.target.files[0]) {
        props.setSkinFile(e.target.files[0]);
      }      
    }

    function onSkinNameChange(e){
      setSkinName(e.target.value);      
    }

    function uploadSkin(){
      if(!props.skinFile){
        toast('No skin file selected');
        return;
      }

      const formData = new FormData();
      formData.append('skinName', skinName);
      formData.append('breed', props.breed);
      formData.append('pose', props.pose);
      formData.append('coverage', props.coverage);
      formData.append('skinFile', props.skinFile);

      fetch('/api/skin', {
        method: 'POST',
        body: formData
      })
      .then((response) => response.json())
      .then((result) => {
        if(result.success === true){
          toast("Upload successful");
          navigate(`skins\\${result.skinId}\\admin?accessGuid=${result.accessGuid}`);
        }
        else{
          toast(result.message);
          console.log(result.message);
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }

    return(
      <div className='Skin-fields'>
        <div className='Skin-input'>
          <label>Skin Name:</label>
          <textarea className='Skin-textarea' value={skinName} onChange={onSkinNameChange}></textarea>
        </div>
        <div className='Skin-input'>
          <label>Breed:</label> 
          <BreedDropdown breed={props.breed} setBreed={props.setBreed}/>
        </div>
        <div className='Skin-input'>
          <label>Pose:</label>
          <PoseDropdown pose={props.pose} setPose={props.setPose}/>
        </div>
        <div className='Skin-input'>
          <label>Select skin:</label>
          <label className="Skin_label_button">
              <input className='Skin-file-input' onChange={onSkinPathChange} type="file" accept="image/png"/>
              Choose File
          </label>
        </div>
        <div className='Skin-upload'>
          <button className='Skin-upload-button' onClick={uploadSkin}>UPLOAD</button>
        </div>
      </div>
    );
}