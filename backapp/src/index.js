import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/Root/Root';

if (document.getElementById('root') !== null) {
	ReactDOM.render(<Root />, document.getElementById('root'));
}

