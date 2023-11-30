import { Crisp } from 'crisp-sdk-web';
import React, { useEffect } from 'react';

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('1700c9d2-368f-4c3f-bbcd-7dcbe74393de');
  }, []);
  return null;
};

export default CrispChat;
