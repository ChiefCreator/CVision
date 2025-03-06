import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './app/App';

const root = createRoot(document.getElementById("root"));
root.render(<App />);