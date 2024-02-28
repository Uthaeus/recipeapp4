import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

import UserContextProvider from './store/userContext';
import RecipesContextProvider from './store/recipesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <RecipesContextProvider>
        <App />
      </RecipesContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

