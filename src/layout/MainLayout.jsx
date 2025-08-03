import { Box } from "@mui/material";
import Sidebar from "../components/SideBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, padding: '0px 10px' }}>
        <Outlet/>
      </Box>
    </Box>
  );
}
