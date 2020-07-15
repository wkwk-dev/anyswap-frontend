import React, { useEffect } from 'react'
import { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle, css } from 'styled-components'
import { getQueryParam, checkSupportedTheme } from '../utils'
import { SUPPORTED_THEMES } from '../constants'
import { useDarkModeManager } from '../contexts/LocalStorage'

export * from './components'

const MEDIA_WIDTHS = {
  upToSmall: 600,
  upToMedium: 960,
  upToLarge: 1280
}

const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  accumulator[size] = (...args) => css`
    @media (max-width: ${MEDIA_WIDTHS[size]}px) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})

const white = '#FFFFFF'
const black = '#000000'

export default function ThemeProvider({ children }) {
  const [darkMode, toggleDarkMode] = useDarkModeManager()
  // console.log(darkMode)
  const themeURL = checkSupportedTheme(getQueryParam(window.location, 'theme'))
  const themeToRender = themeURL
    ? themeURL.toUpperCase() === SUPPORTED_THEMES.DARK
      ? true
      : themeURL.toUpperCase() === SUPPORTED_THEMES.LIGHT
      ? false
      : darkMode
    : darkMode
  useEffect(() => {
    // toggleDarkMode(themeToRender)
    toggleDarkMode(false)
  }, [toggleDarkMode, themeToRender])
  // console.log(themeToRender)
  return <StyledComponentsThemeProvider theme={theme(themeToRender)}>{children}</StyledComponentsThemeProvider>
}

const theme = darkMode => ({
  white,
  black,
  textColor: darkMode ? white : '#010101',
  textColorBold: darkMode ? white : '#062536',
  selectTextColor: darkMode ? white : '#031a6e',
  greyText: darkMode ? white : '#6C7284',

  // for setting css on <html>
  backgroundColor: darkMode ? '#333639' : white,
  backgroundColorCont: darkMode ? '#333639' : '#f9fafb',


  modalBackground: darkMode ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.5)',
  inputBackground: darkMode ? '#202124' : white,
  placeholderGray: darkMode ? '#5F5F5F' : '#E1E1E1',
  shadowColor: darkMode ? '#000' : '#2F80ED',

  selectedBg: darkMode ? 'rgba(0,0,0,0.6)' : '#ecf6ff',
  selectedBgNo: darkMode ? 'rgba(0,0,0,0.6)' : '#f8f8f9',
  selectedBorder: darkMode ? 'rgba(0,0,0,0.6)' : '#c0d6ea',
  selectedBorderNo: darkMode ? 'rgba(0,0,0,0.6)' : '#d9d9e2',
  bgColor: darkMode ? 'rgba(0,0,0,0.1)' : white,
  bgColorLinear: 'linear-gradient(to right, #734ce2 , #606bfb)',

  // grays
  concreteGray: darkMode ? '#292C2F' : '#FAFAFA',
  mercuryGray: darkMode ? '#333333' : '#E1E1E1',
  silverGray: darkMode ? '#737373' : '#C4C4C4',
  chaliceGray: darkMode ? '#7B7B7B' : '#AEAEAE',
  doveGray: darkMode ? '#C4C4C4' : '#737373',
  mineshaftGray: darkMode ? '#E1E1E1' : '#2B2B2B',
  activeGray: darkMode ? '#292C2F' : '#F7F8FA',
  buttonOutlineGrey: darkMode ? '#FAFAFA' : '#F2F2F2',
  tokenRowHover: darkMode ? '#404040' : '#F2F2F2',

  //blacks
  charcoalBlack: darkMode ? '#F2F2F2' : '#404040',
  // blues
  zumthorBlue: darkMode ? '#212529' : '#EBF4FF',
  malibuBlue: darkMode ? '#E67AEF' : '#5CA2FF',
  royalBlue: darkMode ? '#734be2' : '#734be2',
  loadingBlue: darkMode ? '#e4f0ff' : '#e4f0ff',

  // purples
  wisteriaPurple: '#DC6BE5',
  // reds
  salmonRed: '#FF6871',
  // orange
  pizazzOrange: '#FF8F05',
  // yellows
  warningYellow: '#FFE270',
  // pink
  uniswapPink: '#DC6BE5',
  //green
  connectedGreen: '#27AE60',

  //branded
  metaMaskOrange: '#E8831D',

  //specific
  textHover: darkMode ? theme.uniswapPink : theme.doveGray,

  // connect button when loggedout
  buttonFaded: darkMode ? '#DC6BE5' : '#737373',

  // media queries
  mediaWidth: mediaWidthTemplates,
  // css snippets
  flexColumnNoWrap: css`
    display: flex;
    flex-flow: column nowrap;
  `,
  flexRowNoWrap: css`
    display: flex;
    flex-flow: row nowrap;
  `,
  FlexC: css`
    display: flex;
    justify-content:  center;
    align-items:center;
  `,
  FlexSC: css`
    display: flex;
    justify-content:  flex-start;
    align-items:center;
  `,
  FlexEC: css`
    display: flex;
    justify-content:  flex-end;
    align-items:center;
  `,
  FlexBC: css`
    display: flex;
    justify-content:  space-between;
    align-items:center;
  `
})

// @import url('https://rsms.me/inter/inter.css');
export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Manrope';
    src: 
      url('../assets/font/manrope/Manrope-Medium.otf'),
      url('../assets/font/manrope/Manrope-Medium.woff') format('woff'),
      url('../assets/font/manrope/Manrope-Medium.woff2') format('woff2'),
      url('../assets/font/manrope/Manrope-Medium.ttf') format('truetype'),
    font-weight: normal;
    font-style: normal;
  }
  html { font-family: 'Manrope', 'Inter', sans-serif !important; }
  @supports (font-variation-settings: normal) {
    html { font-family: 'Manrope', sans-serif; }
  }
  *{box-sizing: border-box;}
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;    
  }

  body > div {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}

  html {
    font-size: 16px;
    font-variant: none;
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.backgroundColor};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  /* 滚动条凹槽的颜色，还可以设置边框属性 */
  ::-webkit-scrollbar-track-piece {
    background-color:#f8f8f8;
    }
    /* 滚动条的宽度 */
    ::-webkit-scrollbar {
    width:0px;
    height:0px;
    }
    /* 滚动条的设置 */
    ::-webkit-scrollbar-thumb {
    background-color:#dddddd;
    background-clip:padding-box;
    min-height:28px;
    }
    ::-webkit-scrollbar-thumb:hover {
    background-color:#bbb;
    }

`
