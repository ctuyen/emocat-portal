import React, { useState, useRef } from 'react';
import './styles/EmoFace.css';
import smile from './smile.svg';
import sad from './sad.svg';
import happy from './happy.svg';
import respondFace from './undraw_respond_8wjt.svg';
import LogoCat from "./khao-manee-cat.svg";

function EmoFace() {
  const [emo, setEmo] = useState('toStart'), [imgClass, setImgClass] = useState(''), [info, setInfo] = useState("Heyoo!  I am EmoCat");
  const imgRef = useRef(null);

  document.onkeydown = (e) => {
    if (e.code !== 'Space' || e.isComposing || e.keyCode === 229) {
      return;
    }

    handleNextStep(emo);
  };

  const handleNextStep = (emotion) => {
    switch (emotion) {
      case 'sad': {
        setImgClass('fadeOut');
        setInfo('PROCESSING...')
        setTimeout(() => {
          imgRef.current.src = sad;
          setImgClass('fadeIn');
          setInfo('DISSATISFIED!');
          setEmo('toSmile');
        }, 1000)
        break;
      }
      case 'smile': {
        setImgClass('fadeOut');
        setInfo('PROCESSING...');
        setTimeout(() => {
          imgRef.current.src = happy;
          setImgClass('fadeIn');
          setInfo('SATISFIED!');
          setEmo('toSad');
        }, 1000)
        break;
      }
      default: {
        setImgClass('fadeOutUp');
        setInfo('LISTENING...');
        setTimeout(() => {
          imgRef.current.src = respondFace;
          setImgClass('fadeIn');
        }, 2000)
        if (emo === 'toStart') setEmo('smile');
        if (emo === 'toSad') setEmo('sad');
        if (emo === 'toSmile') setEmo('smile');
      }
    }
  }
  return (
    <div>
      <div className="flex justify-center mt-20">
        <img ref={imgRef} className={`${imgClass} w-1/2 md:w-1/4`} src={respondFace} alt="" />
      </div>

      <div tabIndex={-1} className={'flex justify-center absolute w-full text-5xl'} style={{ position: 'absolute', bottom: '6rem' }} onClick={() => handleNextStep(emo)}>
        <span className={`${emo === 'toSmile' ? 'text-red-600 ' : ''}${emo === 'toSad' ? 'text-green-600 ' : ''} mx-16 leading-loose`}>{info}</span>
        {info.includes('LISTENING') && <img className={`inline-block recording`} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAABF0lEQVR4nO3ZTa4BYRBAUcTUImzPgmzPIiyAkTAj3fq7fs6ZmSjJTXn12moFAAAAwL9YV4P3x/Pl8fXpsBv6Wer5N5tiKHcCxASICRATICZATICYADEBYgLEBIhtl3rj+llLPf9VNiAmQEyAmAAxAWKLXUFz1VfMqPk2ICZATICYADEBYpOvoPpK+RU2ICZATICYADEBYh/7LOiZ+gp713wbEBMgJkBMgJgAMQFiAsQEiAkQEyAmQEyAmACxr30aWv8G/a75NiAmQEyA2OS/AfV38K+wATEBYgLEBIgJEPvY/4TrK2vUfBsQEyAmQEyAmACxxa6gf7li5rIBMQFiAsQEiAkQEyAmQEyAmAAxAWICAAAAAMAgV6+VLgF7uz9jAAAAAElFTkSuQmCC" />}
        {info.includes('Hey') && <img
          className="h-20 w-auto"
          src={LogoCat}
          alt="EmoCat Logo"
        />}
      </div>
    </div>
  )
}

export default EmoFace;
