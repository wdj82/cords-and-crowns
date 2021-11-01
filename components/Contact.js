import { DialogOverlay, DialogContent } from '@reach/dialog';
import styled, { keyframes } from 'styled-components';

import Icon from './Icon';
import UnstyledButton from './UnstyledButton';
import VisuallyHidden from './VisuallyHidden';

function Contact({ isOpen, onDismiss }) {
    return (
        <Overlay isOpen={isOpen} onDismiss={onDismiss}>
            <Backdrop />
            <Content aria-label='Contact Info'>
                <Header>
                    <Title>Contact Us</Title>
                    <CloseButton type='button' onClick={onDismiss}>
                        <VisuallyHidden>Close Contact Info</VisuallyHidden>
                        <Icon id='close' size='36' />
                    </CloseButton>
                </Header>
                <TextInfo>
                    <p>Custom orders available</p>
                    <p>For any questions or comments please feel free to email us at: cordsandcrowns@gmail.com</p>
                </TextInfo>
            </Content>
        </Overlay>
    );
}

const slideIn = keyframes`
  from {
    transform: translateY(400%);
  }
  to {
    transform: translateX(0%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Overlay = styled(DialogOverlay)`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: var(--color-backdrop);
    animation: ${fadeIn} 500ms;
`;

const Content = styled(DialogContent)`
    position: relative;
    background: white;
    width: 400px;
    height: 200px;
    padding: 16px;
    border-radius: 8px;

    @media (prefers-reduced-motion: no-preference) {
        animation: ${slideIn} 500ms both cubic-bezier(0, 0.6, 0.32, 1.06);
        animation-delay: 200ms;
    }
`;

const Header = styled.header`
    padding: 8px;
`;

const Title = styled.h2`
    font-size: 1.5rem;
`;

const CloseButton = styled(UnstyledButton)`
    position: absolute;
    top: -40px;
    left: 0;
    color: white;
    width: 48px;
    height: 48px;
`;

const TextInfo = styled.div`
    padding: 8px;
`;

export default Contact;
