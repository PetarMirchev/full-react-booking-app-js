import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";


import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext.js";


import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";



// npx create-react-app .    --- (for install react in same folder)
//npm install sass
//npm install react-router-dom
// npm install @mui/material @emotion/react @emotion/styled
//npm install @mui/icons-material
//npm install react-circular-progressbar     --- (library circular-progressbar visualization)
//npm install recharts    -- charts  (https://recharts.org/en-US/)
//npm install @mui/x-data-grid   --- material-ui Data table for Users

//integration in to the big APP
// npm install axios


function App() {

  const { darkMode } = useContext(DarkModeContext);

  //make protected routes for admins
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };


  return (
    //if is 'darkMode'  use 'app dark' if is not just use 'app'

    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
            <Route path="users">
              <Route index element={<ProtectedRoute> <List columns={userColumns} /> </ProtectedRoute>} />
              <Route path=":userId" element={<ProtectedRoute> <Single /> </ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute> <New inputs={userInputs} title="Add New User" /> </ProtectedRoute>} />
            </Route>
            <Route path="hotels">
              <Route index element={<ProtectedRoute> <List columns={hotelColumns} /> </ProtectedRoute>} />
              <Route path=":productId" element={<ProtectedRoute> <Single /> </ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute>  <NewHotel title="Add New Hotel" /> </ProtectedRoute>} />
            </Route>
            <Route path="rooms">
              <Route index element={<ProtectedRoute> <List columns={roomColumns} /></ProtectedRoute>} />
              <Route path=":productId"
                element={<ProtectedRoute> <Single /> </ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute> <NewRoom /></ProtectedRoute>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;