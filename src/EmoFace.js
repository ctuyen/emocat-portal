import React, {useState, useRef} from 'react';
import './styles/EmoFace.css';
import smile from './smile.svg';
import sad from './sad.svg';
import respondFace from './undraw_respond_8wjt.svg';

function EmoFace() {
  const [emo, setEmo] = useState('smile'), [imgClass, setImgClass] = useState('');
  const imgRef = useRef(null);

  const handleNextStep = (emotion) => {
    console.log("emotion  ", emotion);

    switch (emotion) {
      case 'sad': {
        setImgClass('fadeOut')
        setTimeout(() => {
          imgRef.current.src = sad;
          setImgClass('fadeIn');
        }, 1000)
        setEmo('toSmile');
        break;
      }
      case 'smile': {
        setImgClass('fadeOut')
        setTimeout(() => {
          imgRef.current.src = smile;
          setImgClass('fadeIn');
        }, 1000)
        setEmo('toSad');
        break;
      }
      default: {
        setImgClass('fadeOutUp')
        setTimeout(() => {
          imgRef.current.src = respondFace;
          setImgClass('fadeIn');
        }, 2000)
        if (emo === 'toSad') setEmo('sad');
        if (emo === 'toSmile') setEmo('smile');
      }
    }
  }
  return (
    <div>
      <div className="flex justify-center mt-8">
        <img ref={imgRef} className={`${imgClass} w-1/2 md:w-1/4`} src={respondFace} alt=""/>
      </div>
      <div className={'flex justify-center absolute w-full'} style={{position: 'absolute',bottom: '2rem'}}>
        <button type="button" className={`text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`} onClick={() => handleNextStep(emo)}>Check emotion</button>
      </div>
    </div>
  )
}

export default EmoFace;
