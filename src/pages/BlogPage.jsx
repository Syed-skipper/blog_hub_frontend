import { useState, useEffect, useContext } from "react";
import axios from "../utils/axiosInstance";
import config from "../config.json";
import AuthContext from "../context/AuthContext";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Stack,
  Modal,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const { user_id } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const fetchBlogs = async (id) => {
    try {
      const response = await axios.get(`${config.local_url}blog/${id}`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    const localUserId = user_id;

    if (localUserId) {
      fetchBlogs(localUserId);
    }
  }, [user_id]);

  const handleEdit = async (data) => {
    try {
      handleOpen(true);
      setFormData(data);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${config.local_url}blog/${formData._id}`, formData);
      fetchBlogs();
      handleClose();
    } catch (error) {
      handleOpen();
      console.error("Delete failed:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${config.local_url}blog/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            setOpen(false);
          }
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box component="form" onSubmit={(e) => handleSubmit(e)} sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" gutterBottom>
            Edit Blog
          </Typography>

          <TextField
            fullWidth
            required
            label="Title"
            name="title"
            variant="outlined"
            value={formData.title}
            sx={{ mb: 2 }}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />

          <TextField
            fullWidth
            required
            label="Content"
            name="content"
            variant="outlined"
            multiline
            rows={4}
            sx={{ mb: 2 }}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Image URL"
            variant="outlined"
            disabled
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
            <Button onClick={handleClose} sx={{ ml: 1 }}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      <Box sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Blogs
        </Typography>

        {blogs && blogs.length > 0 ? (
          blogs.map((item) => (
            <Card key={item._id} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.content}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography>No blog found.</Typography>
        )}
      </Box>
    </>
  );
}

export default BlogPage;
