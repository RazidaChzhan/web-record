import React from 'react';
import ArchiveList from './archive-list-component';
import ArchiveSearchComponent from './archive-search.component';

function ArchiveMain() {
  const exampleItems = [
    {
      transcription_id: 1,
      filename: 'MeetingNotes_July.pdf',
      tags: ['meeting', 'July', 'notes'],
      status: 1,
      created: new Date(2023, 6, 1)
    },
    {
      transcription_id: 2,
      filename: 'WorkshopSummary_August.pdf',
      tags: ['workshop', 'summary'],
      status: 1,
      created: new Date(2023, 7, 15)
    },
    {
      transcription_id: 3,
      filename: 'WorkshopSummary_August.pdf',
      tags: ['workshop', 'august'],
      status: 1,
      created: new Date(2024, 7, 15)
    },
    {
      transcription_id: 4,
      filename: 'SomeOtherEntry',
      tags: ['entry', 'digest'],
      status: 1,
      created: new Date(2024, 7, 15)
    },
    {
      transcription_id: 5,
      filename: 'Testing',
      tags: ['workshop', 'summary'],
      status: 1,
      created: new Date(2024, 7, 15)
    },
    {
      transcription_id: 6,
      filename: 'Testing',
      tags: ['workshop', 'summary', 'testing', 'command'],
      status: 2,
      created: new Date(2024, 7, 15)
    }
  ];

  return (
    <div style={{ backgroundColor: 'black', minHeight:'100vh'}}>
      <ArchiveSearchComponent/>
      <ArchiveList items={exampleItems} />
    </div>
  );
}

export default ArchiveMain;