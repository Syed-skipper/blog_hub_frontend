import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import config from "../config.json";
import {
  Card,
  CardMedia,
  Typography,
  Avatar,
  Box,
  Stack,
  Button,
  Divider,
  TextField,
  InputAdornment,
  Modal,
} from "@mui/material";
import { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AuthContext from "../context/AuthContext";
import fallbackImage from "../assets/fallback.png";

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

function HomePage() {
  const { user_id } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [blog, setBlog] = useState([]);

  const fetchAllBlog = async () => {
    try {
      let respo = await axios.get(`${config.local_url}blog`);
      if (respo.data?.length) {
        respo.data = respo.data.map((item) => {
          const date = new Date(item.createdAt);
          const options = { month: "short", day: "2-digit" };
          const datePart = date.toLocaleDateString("en-US", options);

          let hours = date.getHours();
          const minutes = date.getMinutes().toString().padStart(2, "0");
          const ampm = hours >= 12 ? "pm" : "am";
          hours = hours % 12 || 12;

          const timePart = `${hours}.${minutes} ${ampm}`;

          item.createdAt = `${datePart} ${timePart}`;
          return item;
        });
      }
      setBlog(respo.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllBlog();
  }, []);

  const [selectedBlog, setSelectedBlog] = useState(null);
  const handleBlogClick = (item) => {
    setSelectedBlog(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post(`${config.local_url}blog/?user_id=${user_id}`, formData);
      handleClose(true);
      fetchAllBlog();
      setFormData({
        title: "",
        content: "",
      });
    } catch (error) {
      console.log(error);
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
        <Box component="form" onSubmit={(e) => handleCreateBlog(e)} sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" gutterBottom>
            Create Blog
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

      {selectedBlog ? (
        <></>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            mt: 3,
          }}
        >
          <TextField
            label="Search"
            id="outlined-start-adornment"
            size="small"
            disabled
            sx={{ m: 1, width: "25ch", flex: "0 0 60%", mr: 2 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            sx={{ flex: "0 0 auto" }}
            variant="contained"
            onClick={handleOpen}
          >
            Create Blog
          </Button>
        </Box>
      )}
      {selectedBlog ? (
        <Box sx={{ m: 3 }}>
          <Button
            variant="outlined"
            onClick={() => setSelectedBlog(null)}
            sx={{ mb: 2 }}
          >
            ← Back to Blogs
          </Button>

          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <Avatar src={selectedBlog.author.avatar} />
            <Typography variant="h6">{selectedBlog.author.name}</Typography>
          </Stack>

          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ textAlign: "left" }}
          >
            {selectedBlog.title}
          </Typography>

          <CardMedia
            component="img"
            image={fallbackImage}
            alt={selectedBlog.title}
            sx={{
              textAlign: "center",
              width: "200px",
              maxHeight: 200,
              borderRadius: 2,
              objectFit: "cover",
              mb: 2,
            }}
          />

          <Divider sx={{ mb: 2 }} />

          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-wrap", textAlign: "left" }}
          >
            {selectedBlog.content}
          </Typography>
        </Box>
      ) : blog && blog.length > 0 ? (
        blog.map((item) => (
          <Card
            key={item._id}
            sx={{
              display: "flex",
              mb: 2,
              boxShadow: 1,
              borderRadius: 2,
              cursor: "pointer",
            }}
            onClick={() => handleBlogClick(item)}
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", flex: 1, p: 2 }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar
                  alt={item.author.name}
                  src="/assets/fallback.png"
                  sx={{ bgcolor: "dodgerblue" }}
                />
                <Typography variant="subtitle2">{item.author.name}</Typography>
                <Typography
                  sx={{
                    bgcolor: "darkgrey",
                    padding: "0px 10px",
                    borderRadius: "15px",
                    fontSize: '12px'
                  }}
                >
                  {item.createdAt}
                </Typography>
              </Stack>

              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", mt: 1, textAlign: "left" }}
              >
                {item.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 1,
                  textAlign: "left",
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.content}
              </Typography>
            </Box>

            <CardMedia
              component="img"
              sx={{ width: 160, borderRadius: 2, m: 2 }}
              image={fallbackImage}
              alt={item.title}
            />
          </Card>
        ))
      ) : (
        <>No Blogs to show, Be the first to post</>
      )}
    </>
  );
}

export default HomePage;
