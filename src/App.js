import React,{useState,useRef,useEffect} from 'react';
import SunEditor from 'suneditor-react';
import './styles/index.css'
import 'suneditor/dist/css/suneditor.min.css'
import playIcon from './Image/play.svg'
import pauseIcon from './Image/pause.svg'
function App() {
const editorRef = useRef(null);

  const [fileName, setFileName] = useState('')
  const [one,setOne]=useState('Speaker1');
  const [two,setTwo]=useState('Speaker2');
  const [three,setThree]=useState('Speaker3');
  const [four,setFour]=useState('Speaker4');
 const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time ,setTime] = useState(0)
  const [test ,setTest] = useState('')


const handleButtonClick = (speaker) => {
  if (editorRef.current) {
    editorRef.current.insertHTML('<br/>' + speaker + ":");
  }
};

  const onUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileName(url);
    }
  };

    const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === '1') {
        handleButtonClick(one);
      } else if (event.altKey && event.key === '2') {
        handleButtonClick(two);
      } else if (event.altKey && event.key === '3') {
        handleButtonClick(three);
      } else if (event.altKey && event.key === '4') {
        handleButtonClick(four);
      }else if(event.altKey && event.key === '['){
        playAudio()
      }
      else if(event.altKey && event.key === ']'){
        pauseAudio()
      }
    };


    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [one, two, three, four,time,test]);


  const playAudio = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    document.querySelector('.seek-bar').value = progress;
  };

  const handleSeek = (e) => {
    const time = (e.target.value / 100) * audioRef.current.duration

    audioRef.current.currentTime = time;
  };


  const handleVolumeChange = (e) => {
    audioRef.current.volume = e.target.value;
  };
    const handleAudioEnd = () => {
    console.log('Audio playback has ended.');
    setIsPlaying(false); // Update state to indicate audio has stopped
  };
  useEffect(() => {
    console.log("isPlaying",isPlaying)
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleAudioEnd);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleAudioEnd);
      }
    };
  }, [isPlaying]);
  return (
    <div className="main-container">

<div className='upload-audio'>
        <input type="file" id="myFile" name="filename" accept="audio/*" onChange={onUpload}></input>
      </div>

 {fileName && (
        <div className='audio-player'>
          {!isPlaying ? (
            <button className="play-button" onClick={playAudio}>
              <img src={playIcon} width={30} alt="My Icon" />
              </button>
          ) : (
            <button className="pause-button" onClick={pauseAudio}>
              <img src={pauseIcon} width={30} alt="My Icon" />
              </button>
          )}
          <input type="range" className="seek-bar" onInput={handleSeek} />
          <input type="range" className="volume-bar" max="1" step="0.01" defaultValue="1" onInput={handleVolumeChange} />
          <audio ref={audioRef} src={fileName} onTimeUpdate={handleTimeUpdate} />
        </div>
      )}
      
<div className='buttons'>
  <button onClick={(e)=>{handleButtonClick(one)}}>{one}</button> 
  <input type='text' value={one} onChange={handleInputChange(setOne)}/>
  <button onClick={(e)=>{handleButtonClick(two)}}>{two}</button> 
  <input type='text' value={two} onChange={handleInputChange(setTwo)}/>
  <button onClick={(e)=>{handleButtonClick(three)}}>{three}</button> 
  <input type='text' value={three} onChange={handleInputChange(setThree)}/>
  <button onClick={(e)=>{handleButtonClick(four)}}>{four}</button> 
  <input type='text' value={four} onChange={handleInputChange(setFour)}/>
</div>
      <div className='main-content'>

<SunEditor getSunEditorInstance={editor => { editorRef.current = editor; }} />

      </div>

    </div>
  );
}

export default App;
