import { createRoot } from 'react-dom/client'
import React from 'react'

import App from './app.jsx'

const domNode = document.getElementById('app');
const root = createRoot(domNode);
root.render(<App/>);


