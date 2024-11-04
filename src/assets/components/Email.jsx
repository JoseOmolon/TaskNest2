import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
  IconButton,
  Button,
  Modal,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ReplyIcon from "@mui/icons-material/Reply";
import ForwardIcon from "@mui/icons-material/Forward";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import SendIcon from "@mui/icons-material/Send";
import { MailLockOutlined } from "@mui/icons-material";

const EmailComponent = () => {
  const theme = useTheme();

  // State for modal
  const [open, setOpen] = useState(false);
  const [emailData, setEmailData] = useState({
    sender: "",
    subject: "",
    body: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sample email data
  const emails = [
    {
      id: 1,
      sender: "john.doe@example.com",
      subject: "Meeting Reminder",
      date: "2024-10-23",
      snippet: "Don’t forget about our meeting tomorrow at 10 AM.",
    },
    {
      id: 2,
      sender: "jane.smith@example.com",
      subject: "Project Update",
      date: "2024-10-22",
      snippet: "The project is on track for completion next week.",
    },
    {
      id: 3,
      sender: "admin@example.com",
      subject: "Password Reset",
      date: "2024-10-21",
      snippet: "Click here to reset your password.",
    },
  ];

  // Open modal handler
  const handleOpen = () => setOpen(true);

  // Close modal handler
  const handleClose = () => {
    setOpen(false);
    setSubmitted(false); // Reset submitted state when modal closes
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({
      ...emailData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);

    // Simulate sending an email
    setTimeout(() => {
      console.log("Email sent:", emailData);
      setLoading(false);
      setSubmitted(true);
      setEmailData({ sender: "", subject: "", body: "" });
    }, 2000); // Simulate a delay of 2 seconds
  };

  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: 900,
        margin: "auto",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "8px",
        boxShadow: theme.shadows[2],
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: 2,
          fontWeight: "bold",
          color: theme.palette.primary.main,
        }}
      >
        Inbox
      </Typography>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sender</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emails.map((email) => (
              <TableRow
                key={email.id}
                sx={{
                  "&:hover": {
                    transform: "scale(1.02)",
                    transition: "transform 0.2s",
                  },
                }}
              >
                <TableCell sx={{ fontSize: "1.1rem" }}>{email.sender}</TableCell>
                <TableCell sx={{ fontSize: "1.1rem" }}>{email.subject}</TableCell>
                <TableCell sx={{ fontSize: "1.1rem" }}>{email.date}</TableCell>
                <TableCell>
                  <Tooltip title="Reply" arrow>
                    <IconButton color="primary">
                      <ReplyIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Forward" arrow>
                    <IconButton color="primary">
                      <ForwardIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" arrow>
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <br />
        <Button variant="contained" color="primary" onClick={handleOpen} sx={{ marginBottom: 2 }}>
        <MailLockOutlined />
        
            Create Email
      </Button>
      
      </TableContainer>

      {/* Modal for sending email */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 400, padding: 4, borderRadius: '8px', backgroundColor: theme.palette.background.paper }}>
          <Typography variant="h6" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
            Send Email
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Sender"
              name="sender"
              value={emailData.sender}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Subject"
              name="subject"
              value={emailData.subject}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Body"
              name="body"
              value={emailData.body}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              required
              margin="normal"
            />

            {/* Loading and Confirmation Section */}
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                <CircularProgress />
              </Box>
            ) : submitted ? (
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                <CheckIcon sx={{ color: "green", marginRight: 1 }} />
                <Typography>Email sent successfully!</Typography>
              </Box>
            ) : (
              <Box sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ 
                    padding: '10px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <SendIcon />
                  Send Email
                </Button>
              </Box>
            )}
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

// Styles for the modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default EmailComponent;
