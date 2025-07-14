import React, { useEffect, useRef, useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import { useTransactionContext } from '../../../context/TransactionContext';



const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4500'






function LoggerScreen() {
    const videoRef = useRef(null);                 // Holds reference to the <video> element
    const mediaRecorderRef = useRef(null);         // Reference to the MediaRecorder instance
    const streamRef = useRef(null);                // Stores MediaStream object (camera+audio)
    const userCtx = useUserContext()
    const [recording, setRecording] = useState(false);
    const [paused, setPaused] = useState(false);
    const [chunks, setChunks] = useState([]);
    const [fileName, setFileName] = useState(`LOG-${new Date().toISOString()}`);
    const [videoVisible, setVideoVisible] = useState(true);
    const { trans, setTrans } = useTransactionContext()

    // Stream Setup: Runs only once when component mounts
    useEffect(() => {
        if (videoVisible) {
            const getVideo = async () => {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: { facingMode: 'user' },
                        audio: true,
                    });
                    streamRef.current = stream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                } catch (err) {
                    console.error('Camera access error:', err);
                }
            };
            getVideo();
        }

        return () => {
            streamRef.current?.getTracks().forEach(track => track.stop());
        };
    }, [videoVisible]);  // Re-run when toggling videoVisible

    const startRecording = () => {
        const recorder = new MediaRecorder(streamRef.current);
        setChunks([]);

        recorder.ondataavailable = e => {
            if (e.data.size > 0) setChunks(prev => [...prev, e.data]);
        };

        recorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName || 'recording'}.webm`;
            a.click();
            URL.revokeObjectURL(url);
            handleSave()
            setTrans((prev)=>prev+1)
        };

        recorder.start();
        mediaRecorderRef.current = recorder;
        setRecording(true);
        setPaused(false);
    };

    const pauseRecording = () => {
        mediaRecorderRef.current?.pause();
        setPaused(true);
    };

    const resumeRecording = () => {
        mediaRecorderRef.current?.resume();
        setPaused(false);
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setRecording(false);
        setPaused(false);
    };


    const handleSave = async () => {
  const blob = new Blob(chunks, { type: 'video/webm' });
  const formData = new FormData();
  formData.append('video', blob, `${fileName || 'recording'}.webm`);
  formData.append('fileName', fileName);
  formData.append('userId', userCtx.user.id )

  try {
    const response = await fetch(`${apiUrl}/${apiKey}/logger/newvideo/upload`, {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    console.log('Upload Success:', result);
  } catch (err) {
    console.error('Upload failed:', err);
  }
};


    return (
        <>
            <button
                onClick={() => setVideoVisible(prev => !prev)}
                style={{
                    margin: '1rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    backgroundColor: videoVisible ? '#e63946' : '#2a9d8f',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                {videoVisible ? 'Hide Logger' : 'Show Logger'}
            </button>

            {videoVisible && (
                <div style={{ padding: '1rem' }}>
                    <div
                        style={{
                            width: '100%',
                            height: '70vh',
                            marginBottom: '1rem',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                            backgroundColor: '#000',
                        }}
                    >
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <input
                            type="text"
                            placeholder="File name"
                            value={fileName}
                            onChange={e => setFileName(e.target.value)}
                            style={{ padding: '0.5rem', borderRadius: '6px', flexGrow: 1 }}
                        />

                        {!recording && <button onClick={startRecording}>Start</button>}
                        {recording && !paused && <button onClick={pauseRecording}>Pause</button>}
                        {recording && paused && <button onClick={resumeRecording}>Resume</button>}
                        {recording && <button onClick={stopRecording}>Stop</button>}
                    </div>

                    {recording && (
                        <div style={{ marginTop: '1rem', color: paused ? 'orange' : 'red' }}>
                            ● {paused ? 'Paused' : 'Recording...'}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default LoggerScreen;
