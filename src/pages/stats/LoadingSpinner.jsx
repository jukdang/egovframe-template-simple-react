import styled from 'styled-components';

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;


const StyledWrapper = styled.div`
  

  svg {
   width: 3.25em;
   transform-origin: center;
   animation: rotate4 2s linear infinite;
  }

  circle {
   fill: none;
   stroke: hsl(214, 97%, 59%);
   stroke-width: 2;
   stroke-dasharray: 1, 200;
   stroke-dashoffset: 0;
   stroke-linecap: round;
   animation: dash4 1.5s ease-in-out infinite;
  }

  @keyframes rotate4 {
   100% {
    transform: rotate(360deg);
   }
  }

  @keyframes dash4 {
   0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
   }

   50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
   }

   100% {
    stroke-dashoffset: -125px;
   }
  }`;


const LoadingSpinner = () => {
  return (
    <Overlay>
      <StyledWrapper>
        <svg viewBox="25 25 50 50">
          <circle r={20} cy={50} cx={50} />
        </svg>
      </StyledWrapper>
    </Overlay>
  );
};

export default LoadingSpinner;




