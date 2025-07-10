import { useState } from "react";
import RoutesDisplay from "./RoutesDisplay/RoutesDisplay";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`fixed top-0 h-screen py-4 transition-all duration-500 ${collapsed ? "-right-72" : "right-0"}`}
    >
      <RoutesDisplay collapsed={collapsed} setCollapsed={setCollapsed} />
    </div>
  );
}
