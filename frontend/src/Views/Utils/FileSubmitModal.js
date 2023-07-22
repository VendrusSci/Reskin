import React from 'react';
import Modal from 'react-modal';
import {PNG} from 'pngjs/browser'

export function FileSubmitModal(props){

    function handlePathChange(e){
        if (e.target.files && e.target.files[0]) {
            props.setFile(e.target.files[0]);
            props.setModalIsOpen(false);
        }  
    }

    function handlePaste(e){
        let clipboardItems = e.clipboardData.items;
        let key = Object.keys(clipboardItems).find( key => clipboardItems[key].type === 'image/png');

        cleanImage(clipboardItems[key].getAsFile()).then((output) =>{
            props.setFile(output);
            props.setModalIsOpen(false);
        });
    }
    
    return (
        <Modal className="Skin-modal" overlayClassName="Skin-modal-overlay" isOpen={props.modalIsOpen} onRequestClose={() => props.setModalIsOpen(false)} ariaHideApp={false}>
            <div className='modal-header'>
                {props.title}
            </div>
            <div className="modal-body">
                <input id="paste-url-input" placeholder="Paste Copied Image" onPaste={handlePaste}/>
                <p>Or</p>
                <label className="Skin-label-button">
                    <input className='Skin-file-input' onChange={handlePathChange} type="file" accept="image/png"/>
                    Choose File
                </label>
                <br/>
                <p>Please note: due to OS and browser clipboard implementation issues, pasted images may appear with a black background.</p>
                <p>re:SKIN attempts to correct for this, but may have odd results.</p>
            </div>
        </Modal>
    )
}

async function cleanImage(imageFile){
    var image = await getPNG(imageFile);
    //if top left pixel is full black, tidy up
    if(image.data[0] === 0 && image.data[1] === 0 && image.data[2] === 0)
    for(var i = 0; i < image.data.length; i += 4){
      if(image.data[i] === 0 && image.data[i+1] === 0 && image.data[i+2] === 0)
        image.data[i+3] = 0;
    }
  
    var rs = image.pack();
    const streamToBlob = require('stream-to-blob')
    let blob = await streamToBlob(rs, "image/png");
    return blob;
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