import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TripleToggleSwitch from '../utils/triple';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
function Digest() {
    const { transcription_id } = useParams();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('summary');

    // Sample data to simulate fetched data based on transcription_id
    const staticDigest = {
        transcription_id,
        summary: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum",
        recommendations: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum",
        arguments: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum",
        created: new Date().toLocaleString()
    };

    // Scroll event handler to determine which section is currently active
    const handleScroll = () => {
        const summaryPosition = document.getElementById('summary').getBoundingClientRect();
        const recommendationsPosition = document.getElementById('recommendations').getBoundingClientRect();
        const argumentsPosition = document.getElementById('arguments').getBoundingClientRect();

        if (argumentsPosition.bottom + (argumentsPosition.height / 2) <= window.innerHeight) {
            setActiveSection('arguments');
        } else if (recommendationsPosition.top + (recommendationsPosition.height / 2) <= window.innerHeight) {
            setActiveSection('recommendations');
        } else if (summaryPosition.bottom + (summaryPosition.height / 2) <= window.innerHeight) {
            setActiveSection('summary');
        }
    };

    // Register and clean up the scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update active section in UI
    const onChange = (value) => {
        console.log("Active section changed to:", value);
        setActiveSection(value);
    };

    const labels = {
        left: { title: "1", value: "summary" },
        center: { title: "2", value: "recommendations" },
        right: { title: "3", value: "arguments" }
    };

    return (
        <div>
            <div style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: 'black', opacity:0.8, color:'white', zIndex: 1000 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
                    <div>
                        <TripleToggleSwitch labels={labels} onChange={(val) => setActiveSection(labels[val].value)} />
                        <span style={{ marginLeft: '10px' }}>Section: {activeSection}</span>
                    </div>
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <ArrowBackIcon onClick={() => navigate(-1)}/>
                    </IconButton>
                </div>
            </div>
            <div style={{padding:5, backgroundColor:"black", color:"white"}}>
                <div style={{ paddingTop: 10 }}>
                    <h1>Digest for Transcription ID: {transcription_id}</h1>
                    <div id="summary">
                        <p><strong>Summary:</strong> {staticDigest.summary}</p>
                    </div>
                    <div id="recommendations">
                        <p><strong>Recommendations:</strong> {staticDigest.recommendations}</p>
                    </div>
                    <div id="arguments">
                        <p><strong>Arguments:</strong> {staticDigest.arguments}</p>
                    </div>
                    <p><strong>Created:</strong> {staticDigest.created}</p>
                </div>
            </div>
        </div>
    );
}

export default Digest;
