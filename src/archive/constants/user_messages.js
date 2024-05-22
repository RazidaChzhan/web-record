import React from 'react';
// Assuming these constants are defined elsewhere and imported
const STATUS_MESSAGES = {
    1: "Ready",
    0: "Error",
    2: "Processing"
  };
  
  function decodeStatus(status) {
    return STATUS_MESSAGES[status] || "Unknown Status"; 
  }

  // function getStatusIcon(status){
  //   switch(status){
  //     case 1:
  //       return <CheckCircleIcon style={{ color: 'green' }} />;
  //     case 0:
  //       return <ErrorIcon style={{ color: 'red' }} />;
  //     case 2:
  //       return <PendingIcon  />;
  //     default:
  //       return <HelpIcon />;
  //   }
  // }

export default decodeStatus;