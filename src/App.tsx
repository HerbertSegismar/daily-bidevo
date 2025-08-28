import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Devotionals from "./pages/Devotionals";
import Bookmarks from "./pages/Bookmarks";
import Prayers from "./pages/Prayers";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import RootLayout from "./RootLayout";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="devotionals" element={<Devotionals />} />
        <Route path="bookmarks" element={<Bookmarks />} />
        <Route path="prayers" element={<Prayers />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <RouterProvider router={router}/>
  );
}


