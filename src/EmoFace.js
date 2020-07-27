import React, {useState, useRef} from 'react';
import './styles/EmoFace.css';
import smile from './smile.svg';
import sad from './sad.svg';

function EmoFace() {
  const [step, setStep] = useState(0), [imgClass, setImgClass] = useState('hidden');
  const imgRef = useRef(null);

  document.onkeyup = event => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    if (event.code === 'Enter') handleNextStep();
  }

  const handleNextStep = () => {
    console.log("step  ", step);

    switch (step) {
      case 0: {
        imgRef.current.src = smile;
        setImgClass('fadeIn');
        break;
      }
      case 1: {
        setImgClass('fadeOut');
        break;
      }
      case 2: {
        imgRef.current.src = sad;
        setImgClass('fadeIn');
        break;
      }
      case 3: {
        setImgClass('fadeOut');
        break;
      }
      default:
    }
    step < 3 ? setStep(step + 1) : setStep(0);
  }
  return (
    <div>
      <div className="flex justify-center">
        <img ref={imgRef} className={`${imgClass} w-1/2 md:w-1/4`} src={smile} alt=""/>
        {/*<img className={`${sadCls} w-1/2 md:w-1/4`} src={sad} alt=""/>*/}
      </div>
    </div>
  )
}

export default EmoFace;
