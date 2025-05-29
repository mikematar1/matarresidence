import React, { useEffect, useState } from 'react';

import emailjs from '@emailjs/browser';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

import GetEmails from '../../api-client/Options/GetEmails';

const EmailMarketing = () => {
  const [emails, setEmails] = useState([]);
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await GetEmails();
        setEmails(data);
      } catch (err) {
        console.error('Error fetching emails in component:', err);
        if (err.response && err.response.status === 401) {
          setError('You are unauthenticated. Please log in.');
        } else {
          setError('Failed to fetch emails. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  const sendEmails = () => {
    if (!message.trim()) {
      alert("Please write a message before sending.");
      return;
    }

    emails.forEach(email => {
      const templateParams = {
        user_email: email,
        title: subject,
        name: 'Matar Residence',
        message: message
      };

      emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      ).then(response => {
        console.log(`Email sent to ${email}:`, response.status, response.text);
        clearFields();
      }).catch(err => {
        console.error(`Failed to send email to ${email}:`, err);
      });
    });
  };

  const clearFields = () => {
    setSubject('');
    setMessage('');
  };

  if (loading) {
    return <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>Loading emails...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Marketing Email</h2>

      <Stack spacing={2}>
        <TextField
          id="subject"
          label="Subject"
          variant="outlined"
          fullWidth
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <TextField
          id="message"
          label="Message"
          multiline
          rows={8}
          variant="outlined"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<DeleteIcon />}
          onClick={clearFields}
          sx={{borderColor:'black', color: 'black',backgroundColor: 'white',
          '&:hover': { backgroundColor: 'black',color:'white',borderColor:'white' } }}>
            Clear
          </Button>
          <Button variant="contained" endIcon={<SendIcon />}
           onClick={sendEmails}
           sx={{color: 'black',backgroundColor: 'white', '&:hover': { backgroundColor: 'black',color:'white' } }}>
            Send
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default EmailMarketing;