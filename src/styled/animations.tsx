import { keyframes } from 'styled-components'

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`

export const kofiWiggle = keyframes`
  0% {
    transform: rotate(0) scale(1);
  }
  60% {
    transform: rotate(0) scale(1);
  }
  75% {
    transform: rotate(0) scale(1.12);
  }
  80% {
    transform: rotate(0) scale(1.1);
  }
  84% {
    transform: rotate(-10deg) scale(1.1);
  }
  88% {
    transform: rotate(10deg) scale(1.1);
  }
  92% {
    transform: rotate(-10deg) scale(1.1);
  }
  96% {
    transform: rotate(10deg) scale(1.1);
  }
  100% {
    transform: rotate(0) scale(1);
  }
`
