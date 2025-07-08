import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes.jsx";                           
import { GlobalProvider } from "./hooks/useGlobalReducer";
import "bootstrap/dist/css/bootstrap.min.css";    

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalProvider>        
      <App />
    </GlobalProvider>
  </React.StrictMode>
);

