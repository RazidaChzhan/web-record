import React from 'react';
import { Typography } from '@mui/material';
import ArchiveListItem from './archive-list-item-component';

function ArchiveList({ items }) {
  const groupItemsByDate = items => {
    const groups = {};
    items.forEach(item => {
      const dateKey = item.created.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(item);
    });
    return groups;
  };

  const groupedItems = groupItemsByDate(items);
  const sortedDates = Object.keys(groupedItems).sort((a, b) => new Date(b) - new Date(a));

  return (
    // margin bottom as a crutch for menu overshadowing the last item
    // TODO: fix styling when available
    <div style={{paddingBottom:'50px'}}>
      {sortedDates.map(date => (
        <div key={date}>
          <Typography variant="h5" color="#a4a4a4" margin={2}>
            {date === new Date().toLocaleDateString('en-US') ? 'Today' : 
             date === new Date(Date.now() - 86400000).toLocaleDateString('en-US') ? 'Yesterday' : 
             date}
          </Typography>
          {groupedItems[date].map(item => (
            <ArchiveListItem
              key={item.transcription_id}
              filename={item.filename}
              tags={item.tags}
              status={item.status}
              transcription_id={item.transcription_id}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ArchiveList;
