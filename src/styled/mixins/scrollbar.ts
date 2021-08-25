import { css } from 'styled-components'
import { PropsWithTheme } from './types'

export function dropdownScrollbar({ theme }: PropsWithTheme) {
  return css`
    overflow-x: hidden;
    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 8px;

      :hover {
        background: ${theme.colors.layerBg};
      }
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: ${theme.colors.backgroundColor2};
      border-left: 1px lightgray solid;
    }

    /* Handle */
    :hover {
      ::-webkit-scrollbar {
        background: ${theme.colors.backgroundColor}20;
      }
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.colors.backgroundColor}40;
      border-radius: 100px;

      :hover {
        background: ${theme.colors.backgroundColor}30;
      }
    }
  `
}
