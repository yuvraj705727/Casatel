import{
  BrowserRouter,
  Routes,
  Route,
}from "react-router-dom"
import { Home } from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import { List } from "./pages/lists/List";
import RegistrationPage from "./pages/registration/Registration";
import Login from "./pages/login/Login";

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/hotels" element={<List/>}/>
    <Route path="/hotels/:id" element={<Hotel/>}/>
    <Route path="/registration" element={<RegistrationPage/>}/>
    <Route path="/login" element={<Login/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
