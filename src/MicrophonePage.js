import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import { IconButton, TextField, Button } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export function MicrophonePage() {
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState('');
    const [recordingTime, setRecordingTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [recordingFinished, setRecordingFinished] = useState(false);
    const [recordingName, setRecordingName] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);
    const fileInputRef = useRef(null);
    const timerRef = useRef(null);
    const audioRef = useRef(null);

    const styles = {
        main: {
            backgroundColor: '#282c34',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            position: 'relative',
            height: '100%'
        },
        download: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: 'white'
        },
        circleButtonStyle: {
            backgroundColor: 'white',
            borderRadius: '50%',
            padding: '10px',
            color: 'black',
            margin: '0 12px',
            border: '2px solid transparent',
        },
        audio: {
            display: 'none'
        },
        recordingText: {
            color: 'white',
            marginTop: '20px',
            fontSize: '24px',
        },
        timer: {
            color: 'white',
            fontSize: '20px',
            marginTop: '10px'
        },
        playbackContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '20px'
        },
        inputContainer: {
            marginTop: '20px',
            width: '80%'
        },
        buttonsContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px'
        },
        button: {
            margin: '0 10px'
        },
        timeLabels: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            color: 'white'
        },
        playStopButton: {
            color: 'white',
            marginTop: '10px'
        },
        progressBar: {
            width: '100%',
            marginTop: '10px'
        }
    };

    const handleClickDownload = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioURL(url);
        }
    };

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = (event) => {
            audioChunks.current.push(event.data);
        };
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
            const url = URL.createObjectURL(audioBlob);
            setAudioURL(url);
            audioChunks.current = [];
            clearInterval(timerRef.current);
            setRecordingFinished(true);
        };
        mediaRecorder.current.start();
        setIsRecording(true);
        setRecordingTime(0);
        timerRef.current = setInterval(() => {
            setRecordingTime(prevTime => prevTime + 1);
        }, 1000);
    };

    const stopRecording = () => {
        mediaRecorder.current.stop();
        setIsRecording(false);
        clearInterval(timerRef.current);
    };

    const handleMicrophoneClick = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSave = () => {
        // Логика сохранения записи
        console.log(`Saving recording: ${recordingName}`);
    };

    const handleStartAgain = () => {
        setAudioURL('');
        setRecordingName('');
        setRecordingFinished(false);
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleAudioTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleProgressBarChange = (event) => {
        const newTime = event.target.value;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener('ended', () => {
                setIsPlaying(false);
                setCurrentTime(0);
            });
            audioRef.current.addEventListener('timeupdate', handleAudioTimeUpdate);
        }
    }, []);

    return (
        <div style={styles.main}>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="audio/*"
                onChange={handleFileChange}
            />
            <IconButton style={styles.download} variant="contained" onClick={handleClickDownload}>
                <FileDownloadOutlinedIcon />
            </IconButton>
            {!recordingFinished && (
                <IconButton
                    style={styles.circleButtonStyle}
                    variant="contained"
                    onClick={handleMicrophoneClick}
                >
                    {isRecording ? (
                        <StopIcon sx={{ fontSize: 90 }} />
                    ) : (
                        <MicIcon sx={{ fontSize: 90 }} />
                    )}
                </IconButton>
            )}
            {isRecording && (
                <>
                    <div style={styles.recordingText}>
                        Recording
                    </div>
                    <div style={styles.timer}>
                        {formatTime(recordingTime)}
                    </div>
                </>
            )}
            {recordingFinished && (
                <div style={styles.playbackContainer}>
                    <div style={styles.recordingText}>
                        Recording length: {formatTime(recordingTime)}
                        <IconButton style={styles.playStopButton} onClick={handlePlayPause}>
                            {isPlaying ? (
                                <StopIcon />
                            ) : (
                                <PlayArrowIcon />
                            )}
                        </IconButton>
                    </div>
                    <audio ref={audioRef} src={audioURL} style={styles.audio} />
                    <input
                        type="range"
                        min="0"
                        max={recordingTime}
                        value={currentTime}
                        onChange={handleProgressBarChange}
                        style={styles.progressBar}
                    />
                    <div style={styles.timeLabels}>
                        <span>00:00</span>
                        <span>{formatTime(recordingTime)}</span>
                    </div>
                    <div style={styles.inputContainer}>
                        <TextField
                            label="Name the recording"
                            variant="outlined"
                            value={recordingName}
                            onChange={(e) => setRecordingName(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <div style={styles.buttonsContainer}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            style={styles.button}
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleStartAgain}
                            style={styles.button}
                        >
                            Start again
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
