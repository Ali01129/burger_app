import Navbar from "./components/navbar";
import Auth from "./pages/auth"
import Home from "./pages/home"
import { Route, Routes } from 'react-router-dom';
import Result from "./pages/result";
import Orders from "./pages/orders";
import ProtectedRoute from "./components/protectedRoute";

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/orders' element={
          <ProtectedRoute>
            <Orders/>
          </ProtectedRoute>
        }/>
      </Routes>
    </>
  )
}

export default App
