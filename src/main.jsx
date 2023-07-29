import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import { persistor, store } from "./app/store.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
    <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App/>}/>
        </Routes>
    </BrowserRouter>
    </PersistGate>
  </Provider>
)
