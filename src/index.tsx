import React from 'react';
import './index.css';
import App from './App';
import './i18n';
import { render } from "react-dom";

render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById("root")
);
