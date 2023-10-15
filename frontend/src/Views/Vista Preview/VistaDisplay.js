import React, { useState, useEffect } from 'react';
import '../CSS/Skins.css';
import '../CSS/Image.css';

export function VistaDisplay(props){

    const [iconImg, setIconImg] = useState();
    const [iconBgImg, setIconBgImg] = useState();
    const [vistaImg, setVistaImg] = useState();
    const [vistaBgImg, setVistaBgImg] = useState();
    const [isIconVisible, setIsIconVisible] = useState(true);
    const imageRef = React.useRef(null);
    const vistaBgPath = '/vista_bg.png';
    const iconBgPath = '/icon_bg.png';

    useEffect(() => {
        if(!props.dragonFile){
          setIsIconVisible(false);
          setIconImg(undefined);
          setIconBgImg(undefined);
        }
          
        else{
          setIconImg(URL.createObjectURL(props.dragonFile));
          setIconBgImg(iconBgPath);
          setIsIconVisible(true);
        }

        // free memory when ever this component is unmounted
        return () => {
          URL.revokeObjectURL(iconImg);
        }
      }, [props.dragonFile]);
    
    useEffect(() => {
      let vistaUrl;
      if(props.vistaFile){
        vistaUrl = URL.createObjectURL(props.vistaFile);
        setVistaImg(vistaUrl);
        setVistaBgImg(vistaBgPath);
      }
      else{
        setVistaImg(undefined);
        setVistaBgImg(undefined);
      }

      return () => {
        URL.revokeObjectURL(vistaImg);
      }
    }, [props.vistaFile]);

    return(
          <div className='Vista_wrapper container'>
            { isIconVisible ?
              <div>
                <img className='VistaPreview_icon' id='dragonImage' alt="" ref={imageRef} src={iconImg}></img>
                <img className='VistaPreview_iconbg' id='iconbgImage' alt="" src={iconBgImg}></img>
              </div>
              : ""
            }
              <img className='VistaPreview_vista' id='vistaImage' alt="" src={vistaImg}></img>
              <img className='VistaPreview_vistabg' id='vistaBackground' alt="" src={vistaBgImg}></img>
          </div>
    );
}