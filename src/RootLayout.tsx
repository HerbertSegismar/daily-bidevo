import { Outlet } from "react-router-dom"
import Layout from "./Layout"
import { ThemeProvider } from "./contexts/ThemeContext"

const RootLayout = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Outlet />
      </Layout>
    </ThemeProvider>
  );
}

export default RootLayout