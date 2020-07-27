import React, {useState, useRef} from 'react';
import './styles/EmoFace.css';
import smile from './smile.svg';
import sad from './sad.svg';

function EmoFace() {
  const [step, setStep] = useState(0), [imgClass, setImgClass] = useState('hidden');
  const imgRef = useRef(null);

  // document.onkeyup = event => {
  //   if (document.activeElement === imgRef.current) return;
  //   if (event.isComposing || event.keyCode === 229) {
  //     return;
  //   }
  //   if (event.code === 'Enter') handleNextStep();
  // }

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
      <div className="flex justify-center mt-8">
        <img ref={imgRef} className={`${imgClass} w-1/2 md:w-1/4`} src={smile} alt=""/>
      </div>
      <div className={'flex justify-center absolute w-full'} style={{position: 'absolute',bottom: '2rem'}}>
        <button type="button" className={`text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`} onClick={() => handleNextStep()}>Check emotion</button>
      </div>
    </div>
  )
}

export default EmoFace;
