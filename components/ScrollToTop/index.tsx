// components/ScrollToTopButton.tsx
import { Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ScrollToTopButtonProps {}

interface ScrollToTopContainerProps {
  show: boolean;
}

const ScrollToTopContainer = styled.div<ScrollToTopContainerProps>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  opacity: ${(props) => (props.show ? 1 : 0)};
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (typeof window !== 'undefined' && window.pageYOffset > 500) {
      // Kiểm tra document/window trước khi sử dụng
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Kiểm tra document/window trước khi sử dụng
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <Zoom in={showButton}>
      <ScrollToTopContainer show={showButton}>
        <Fab size="small" aria-label="scroll back to top" onClick={handleClick}>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollToTopContainer>
    </Zoom>
  );
};

export default ScrollToTopButton;
