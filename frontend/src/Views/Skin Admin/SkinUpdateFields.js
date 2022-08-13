import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {BreedDropdown} from '../Utils/BreedDropdown';
import {PoseDropdown} from '../Utils/PoseDropdown';
import '../CSS/Skins.css';
import '../CSS/Modal.css';

export function SkinUpdateFields(props){

  var fullUrl = window.location.href;
  const adminUrl = fullUrl
  const previewUrl = fullUrl.substring(0, fullUrl.lastIndexOf('/'));
  const navigate = useNavigate();

  const [previewModalIsOpen, setPreviewModalIsOpen] = useState(false);
  const [adminModalIsOpen, setAdminModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  function onSkinPathChange(e){
    if (e.target.files && e.target.files[0]) {
      props.setSkinFile(e.target.files[0]);
    }      
  }

  function onSkinNameChange(e){
    props.setSkinName(e.target.value);      
  }

  function uploadSkin(){
    if(!props.skinFile){
      toast('No skin file selected');
      return;
    }

    const formData = new FormData();
    formData.append('skinName', props.skinName);
    formData.append('breed', props.breed);
    formData.append('pose', props.pose);
    formData.append('coverage', props.coverage);
    formData.append('skinFile', props.skinFile);
    formData.append('skinId', props.skinId);
    formData.append('accessGuid', props.accessGuid);

    fetch('/api/skin', {
      method: 'PUT',
      body: formData
    })
    .then((response) => response.json())
    .then((result) => {
      if(result.success){
        toast("Skin successfully updated");
      }
      else{
        toast(result.message);
        console.log(result.message);
      }
    })
    .catch((error) => {
      toast('Error - see console');
      console.log(error);
    })
  }

  function deleteSkin(){
    const formData = new FormData();
    formData.append('skinId', props.skinId);
    formData.append('accessGuid', props.accessGuid);

    fetch('/api/skin', {
      method: 'DELETE',
      body: formData
    })
    .then((response) => response.json())
    .then((result) => {
      if(result.success){
        toast("Skin successfully deleted");
        setDeleteModalIsOpen(false);
        return navigate("..");
      }
      else{
        toast(result.message);
        console.log(result.message);
        setDeleteModalIsOpen(false);
      }
    })
    .catch((error) => {
      toast('Error - see console');
      console.log(error);
      setDeleteModalIsOpen(false);
    })
  }

  return(
    <div className='Skin-fields'>
      <div className='Skin-input'>
          <label>Share Url:</label>
          <div>
            <button className='Skin-button' onClick={() => setPreviewModalIsOpen(true)}>View</button>
            <Modal className="Skin-modal" overlayClassName="Skin-modal-overlay" isOpen={previewModalIsOpen} onRequestClose={() => setPreviewModalIsOpen(false)} ariaHideApp={false}>
              <div className='modal-header'>
                Share Url
              </div>
              <div className="modal-body">
                <p>This is the URL for sharing with other people so that they can preview your skin on their dragons.</p>
                <p>{previewUrl}</p>
              </div>
              <div className="modal-footer">
                <CopyToClipboard text={previewUrl}
                  onCopy={() => toast("Copied preview url to clipboard")}>
                  <button className='modal-btn'>Copy to clipboard</button>
                </CopyToClipboard>
                &nbsp;&nbsp;
                <button className='modal-btn' onClick={() => setPreviewModalIsOpen(false)}>Close</button>
              </div>
            </Modal>
            &nbsp;&nbsp;
            <CopyToClipboard text={previewUrl}
              onCopy={() => toast("Copied preview url to clipboard")}>
              <button className='Skin-button'>Copy to clipboard</button>
            </CopyToClipboard>
          </div>
      </div>
      <div className='Skin-input'>
          <label>Admin Url:</label>
          <div>
            <button className='Skin-button' onClick={() => setAdminModalIsOpen(true)}>View</button>
            <Modal className="Skin-modal" overlayClassName="Skin-modal-overlay" isOpen={adminModalIsOpen} onRequestClose={() => setAdminModalIsOpen(false)} ariaHideApp={false}>
              <div className='modal-header'>
                Admin Url
              </div>
              <div className="modal-body">
                <p>Do not give this out publicly!</p>
                <p>Anyone with this url can change the uploaded skin or settings.</p>
                <p>{adminUrl}</p>
              </div>
              <div className="modal-footer">
                <CopyToClipboard text={adminUrl}
                  onCopy={() => toast("Copied admin url to clipboard")}>
                  <button className='modal-btn'>Copy to clipboard</button>
                </CopyToClipboard>
                &nbsp;&nbsp;
                <button className='modal-btn' onClick={() => setAdminModalIsOpen(false)}>Close</button>
              </div>
            </Modal>
            &nbsp;&nbsp;
            <CopyToClipboard text={adminUrl}
                onCopy={() => toast("Copied admin url to clipboard")}>
                <button className='Skin-button'>Copy to clipboard</button>
            </CopyToClipboard>
          </div>
      </div>
      <div className='Skin-input'>
        <label>Skin Name:</label>
        <textarea className='Skin-textarea' value={props.skinName} onChange={onSkinNameChange}></textarea>
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
        <label className="Skin-label-button">
          <input className='Skin-file-input' onChange={onSkinPathChange} type="file" accept="image/png"/>
          Choose File
        </label>
        <input className='Skin-file-input' onChange={onSkinPathChange} type="file" accept="image/png"/>
      </div>
      <div className='Skin-action'>
        <button className='Skin-action-button' onClick={uploadSkin}>UPLOAD</button>
      </div>
      <div className='Skin-action'>
        <button className='Skin-action-button' onClick={() => setDeleteModalIsOpen(true)}>DELETE</button>
        <Modal className="Skin-modal" overlayClassName="Skin-modal-overlay" isOpen={deleteModalIsOpen} onRequestClose={() => setDeleteModalIsOpen(false)} ariaHideApp={false}>
          <div className='modal-header'>
            Confirm Skin Deletion
          </div>
          <div className="modal-body">
            <p>This will delete the skin data and image from the server, breaking all preview and admin links.</p>
            <p>This does not prevent you from re-uploading the skin.</p>
            <p>Are you sure?</p>
          </div>
          <div className="modal-footer">
            <button className='modal-btn' onClick={() => deleteSkin()}>Confirm</button>
            &nbsp;&nbsp;
            <button className='modal-btn' onClick={() => setDeleteModalIsOpen(false)}>Close</button>
          </div>
        </Modal>
      </div>
    </div>
  );
}