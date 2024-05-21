import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import { IconButton, TextField, Button } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {ReplaySharp} from "@mui/icons-material";

const local_environment_api = "http://127.0.0.1:5000";

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
    const [audioBlob, setAudioBlob] = useState(null);

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
            display: 'block',
            marginTop: '20px'
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
            width: '95%'
        },
        buttonsContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px'
        },
        button: {
            margin: '0 10px',
            width: '170px',
            height: '50px',
            textTransform: 'none'
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

    const theme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& label.Mui-focused': {
                            color: 'white',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: 'white',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                    },
                },
            },
        },
    });

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
            const audioBlob = new Blob(audioChunks.current, { type: 'audio/mp4' });
            const url = URL.createObjectURL(audioBlob);
            setAudioURL(url);
            setAudioBlob(audioBlob);
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

    const handleSave = async () => {
        if (audioBlob && recordingName) {
            const formData = new FormData();
            formData.append('audio', audioBlob, `${recordingName}.m4a`);
            formData.append('filename', recordingName);

            try {
                const response = await fetch(`${local_environment_api}/upload_audio`, {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                console.log('Server response:', result);
            } catch (error) {
                console.error('Error uploading audio:', error);
            }
        } else {
            console.error('No audio file or recording name provided.');
        }
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
        <ThemeProvider theme={theme}>
            <div style={styles.main}>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept=".m4a, .mp3"
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
                            Record
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
                        <audio ref={audioRef} src={audioURL} style={styles.audio} controls />
                        <div style={styles.inputContainer}>
                            <TextField
                                label="Name the recording"
                                variant="outlined"
                                value={recordingName}
                                onChange={(e) => setRecordingName(e.target.value)}
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        width: '100%'
                                    },
                                }}
                                InputProps={{
                                    style: {
                                        color: 'white'
                                    }
                                }}
                                InputLabelProps={{
                                    style: {
                                        color: 'white'
                                    }
                                }}
                            />
                        </div>
                        <div style={styles.buttonsContainer}>

                            <Button
                                variant="contained"
                                style={{ ...styles.button, backgroundColor: 'white', color: 'black' }}
                                onClick={handleSave}
                            >
                                <FileDownloadOutlinedIcon />
                                Save
                            </Button>
                            <Button
                                variant="outlined"
                                style={{ ...styles.button, backgroundColor: '#EC3763', color: 'white' }}
                                onClick={handleStartAgain}
                            >
                                <ReplaySharp />
                                Start again
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </ThemeProvider>
    );
}
