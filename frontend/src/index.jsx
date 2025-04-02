import { createRoot } from 'react-dom/client';

import ContextProvider from './app/ContextProvider';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';

const root = createRoot(document.getElementById("root"));

root.render(
  <ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>
);