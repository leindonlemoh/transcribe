import React from 'react';


const Info = ({ isOpen, content }) => {
  return (
    <div className={`floating-dialog ${isOpen ? 'open' : 'closed'}`}>
      {content}
    </div>
  );
};

export default Info;
