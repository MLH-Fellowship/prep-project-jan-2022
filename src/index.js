import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import Demo from './components/playground/Demo';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Demo />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
