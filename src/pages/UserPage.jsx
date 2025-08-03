import { useContext, useEffect, useState } from "react";
import config from "../config.json";
import axios from "../utils/axiosInstance";
import { Avatar, Box, Typography, Paper, Stack } from "@mui/material";
import AuthContext from "../context/AuthContext";

export default function UsersPage() {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const { user_id } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (id) => {
    try {
      const res = await axios.get(`${config.local_url}user/${user_id}`);
      setProfile(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user_id]);

  if (loading) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        sx={{
          p: 4,
          width: { xs: "90%", sm: "50%", md: "35%" },
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          My Profile
        </Typography>

        <Avatar sx={{ width: 72, height: 72, margin: "auto", bgcolor: "#999" }}>
          {profile.name.charAt(0).toUpperCase()}
        </Avatar>

        <Stack spacing={2} mt={2}>
          <Typography variant="h6" color="text.secondary">
            User Name: {profile.name}
          </Typography>

          <Typography variant="h6" color="text.secondary">
            Email: {profile.email}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
