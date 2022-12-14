import React, { useEffect, useCallback } from "react";
import { GlobalContextProvider } from "./common/context/store.js";
import { createGlobalStyle } from "styled-components";
import { HashRouter as BrowserRouter } from "react-router-dom";
import Router from "./router.js";

const GlobalStyle = createGlobalStyle`
  //height: calc(constant(safe-area-inset-top) - constant(safe-area-inset-bottom));
  //height: calc(env(safe-area-inset-top) - env(safe-area-inset-bottom));

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  

  /* HTML5 display-role reset for older browsers */

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
    font-family: Pretendard, Helvetica;
    width: 100%;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  a{
    text-decoration: none;
    color: inherit;
  }
`;

export default function App() {
	return (
		<>
			<GlobalContextProvider>
				<BrowserRouter>
					<GlobalStyle />
					<Router />
				</BrowserRouter>
			</GlobalContextProvider>
		</>
	);
}
