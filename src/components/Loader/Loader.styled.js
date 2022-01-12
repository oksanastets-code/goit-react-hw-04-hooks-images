import styled from 'styled-components';

export const DotContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
`;
export const Dot = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 15px;
  background-color: #ae0a8a;
  border-radius: 50%;
  animation-name: dots;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;

  &:nth-child(2) {
    animation-delay: 0.3s;
  }
  &:nth-child(3) {
    animation-delay: 0.6s;
  }

  @keyframes dots {
    50% {
      opacity: 0;
      transform: scale(0.7) translateY(10px);
    }
  }
`;
