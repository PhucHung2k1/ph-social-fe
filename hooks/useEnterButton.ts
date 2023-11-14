import { useEffect, useState } from 'react';

const useEnterButton = (handleConfirm: any) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        handleConfirm();
        event.preventDefault();
      }
    };
    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [handleConfirm]);
};
export default useEnterButton;
