import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import Demo from './components/playground/Demo';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Demo />} />
      <Route path="/playground" element={<App />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
