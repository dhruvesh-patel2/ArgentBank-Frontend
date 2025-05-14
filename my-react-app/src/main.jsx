import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.js";  // Import du store Redux

import "./main.scss";  // Import des styles
import App from "./App.jsx";  // Import du composant principal de l'app

// Rendu de l'application avec le store Redux
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>  {/* Fournit le store Redux à toute l'app */}
      <App />
    </Provider>
  </StrictMode>
);
