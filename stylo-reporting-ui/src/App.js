import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className="main-content"
        style={{ marginLeft: collapsed ? "80px" : "250px" }}
      >
        <Header />
        <Dashboard collapsed={collapsed} />
      </div>
    </>
  );
}

export default App;
