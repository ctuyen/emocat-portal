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

  let shouldStop = false;
  let stopped = false;
  let audioRes = null;
  let count = 0;
  let mediaRecorder;
  const recordedChunks = [];
  // const downloadLink = document.getElementById('download');
  // const stopButton = document.getElementById('stop');
  //
  // stopButton.addEventListener('click', function() {
  //   shouldStop = true;
  // });

  const handleRecord = function(stream) {
    const options = {mimeType: 'audio/webm'};
    const mediaRecorder = new MediaRecorder(stream, options);
    // setTimeout(() => {mediaRecorder.stop(); stopped = true; console.log("stopped", count)}, 2000);

    mediaRecorder.ondataavailable = (e) => {
      count++;
      console.log("stop", count)
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }
      //
      // if(shouldStop === true && stopped === false) {
      //   mediaRecorder.stop();
      //   stopped = true;
      // }
    };

    mediaRecorder.onstop = () => {
      console.log("recorded chunks", recordedChunks);
      audioRes = recordedChunks;
    };

    mediaRecorder.start();
    console.log("state", mediaRecorder.state)
  };

  const handleNextStep = async (emotion) => {
    switch (emotion) {
      case 'sad': {
        shouldStop = true;
        mediaRecorder.stop()
        console.log("audio", audioRes);

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
        shouldStop = true;
        mediaRecorder.stop()
        console.log("audio", audioRes)

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
        console.log("start recording here");
        shouldStop = false;
        stopped = false;
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        mediaRecorder = new MediaRecorder(stream)
        mediaRecorder.ondataavailable = (e) => {
          count++;
          console.log("dataavailable", count)
          if (e.data.size > 0) {
            recordedChunks.push(e.data);
          }
          //
          // if(shouldStop === true && stopped === false) {
          //   mediaRecorder.stop();
          //   stopped = true;
          // }
        };

        mediaRecorder.onstop = () => {
          console.log("stop recorded chunks", recordedChunks);
          audioRes = recordedChunks;
        };
        mediaRecorder.start()
        console.log("stream", stream, mediaRecorder)

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
