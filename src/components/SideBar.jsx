import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
const drawerWidth = 300;

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pages = [
    {
      text: "Home",
      path: "/home",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
        </svg>
      ),
    },
    {
      text: "Manage Blogs",
      path: "/blog",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm1 2v14h14V5H5zm2 2h10v2H7V7zm0 4h6v2H7v-2z" />
        </svg>
      ),
    },
    {
      text: "Profile",
      path: "/user",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
      ),
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          display: "flex",
          justifyContent: "space-between",
          width: drawerWidth,
          boxSizing: "border-box",
          border: "none",
          padding: "0px 20px 20px",
        },
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <Typography
          sx={{ fontWeight: "bolder", textAlign: "left", margin: "20px 0px" }}
        >
          Blog Hub
        </Typography>
        <List sx={{ padding: 0 }}>
          {pages.map((item) => (
            <ListItem
              key={item.text}
              disablePadding
              sx={{ marginBottom: "10px" }}
            >
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  backgroundColor:
                    location.pathname == item.path ? "#e7edf4" : "#fff",
                  borderRadius: "4px",
                }}
              >
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  {item.svg}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Button
        sx={{ color: "black", backgroundColor: "#e7edf4" }}
        onClick={() => handleLogout()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
        </svg>
        <Typography sx={{ paddingLeft: "10px" }}> Logout</Typography>
      </Button>
    </Drawer>
  );
}
