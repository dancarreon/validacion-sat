import CFDIForm from "./components/CFDIForm.tsx";
import './assets/styles/main.css';
import './assets/styles/satMain.css';
import {BrowserRouter, Route, Routes} from "react-router";

//import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CFDIForm/>}/>
                <Route path="/:cfdi" element={<CFDIForm/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
