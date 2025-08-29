import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Devotionals from "./pages/Devotionals";
import Bookmarks from "./pages/Bookmarks";
import Prayers from "./pages/Prayers";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import RootLayout from "./RootLayout";
//import Login from "./pages/Login";
// import Register from "./pages/Register";
// import { useAuth } from "./betterAuth/AuthContext";
// import ProtectedRoute from "./betterAuth/ProtectedRoute";
// import Dashboard from "./pages/Dashboard";

export default function App() {
 // const {user} = useAuth();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="devotionals" element={<Devotionals />} />
        <Route path="bookmarks" element={<Bookmarks />} />
        <Route path="prayers" element={<Prayers />} />
        <Route path="settings" element={<Settings />} />

        {/* <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <RouterProvider router={router}/>
  );
}


