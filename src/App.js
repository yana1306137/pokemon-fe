import { BrowserRouter } from 'react-router-dom';
import './App.css';
import HeaderComponent from './header/HeaderComponent';
import Routes from './route/Routes';

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

function App() {
  return (
    <BrowserRouter>
        <HeaderComponent/>
        <Routes/>
    </BrowserRouter>  
  );
}

export default App;
