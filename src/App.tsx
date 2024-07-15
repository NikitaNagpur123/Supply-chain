import "./App.css";
import "rsuite/dist/rsuite.min.css";

import Header from "./Header/Header";
import Deshbord from "./Deshbord/Deshbord";
import { HashRouter, Route, Routes } from "react-router-dom";
import Rounting from "./SetauprRouting/Rounting";

function App() {
  return (
    <>

      <HashRouter>
        <Header></Header>
       
        <Routes>
          <Route path="/" element={<Deshbord></Deshbord>}></Route>
          <Route path="/Home" element={<Deshbord></Deshbord>}></Route>
          <Route path="/NewOrderCycle" element={<Rounting></Rounting>}></Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
