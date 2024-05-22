import React, { useMemo } from 'react';
import decodeStatus from '../constants/user_messages';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Chip } from '@mui/material';
import './archive-list-item-component.css'

function ArchiveListItem({ filename, tags, status, transcription_id }) {
    const navigate = useNavigate();

    const stringToColor = (string) => {
        let hash = 0;
        for (let i = 0; i < string.length; i++) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        return `hsl(${hash % 360}, 100%, 75%)`;  // Convert hash into HSL
    };

    const tagColors = useMemo(() => tags.map(tag => ({ tag, color: stringToColor(tag) })), [tags]);

    const handleClick = () => {
        navigate(`/digest/${transcription_id}`);
    };

    return (
        <Box 
          className="archive-item-container" 
          onClick={handleClick} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            p: 2, 
            border: 1, 
            borderColor: 'grey.300',
            borderRadius: 2,
            boxShadow: 2,
            '&:hover': {
              boxShadow: 6,
            }
          }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="comment">{filename}</Typography>
                <Typography variant="comment">{decodeStatus(status)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {tagColors.map((item, index) => (
                    <Chip key={index} label={item.tag} style={{ backgroundColor: item.color }} />
                ))}
            </Box>
        </Box>
    );
}

export default ArchiveListItem;
