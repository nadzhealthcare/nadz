'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const DEFAULT_SERVICE_OPTIONS = [
  'Doctor at Home',
  'Doctor at Hotel',
  'Doctor at Office',
  'Elderly Care at Home',
  'Post-Hospitalization Support',
  'Memory & Mobility-Focused Care',
  'Babysitting',
];

const primaryColor = '#4F052B';

export function BookDoctorForm({ serviceOptions }) {
  const router = useRouter();
  const options = Array.isArray(serviceOptions) && serviceOptions.length > 0
    ? serviceOptions
    : DEFAULT_SERVICE_OPTIONS;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/book-doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          service,
          address,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
        return;
      }
      router.push('/thank-you');
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        mt: { xs: 4, md: 6 },
        py: { xs: 6, md: 8 },
        px: 2,
        maxWidth: 720,
        mx: 'auto',
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        fontWeight={700}
        sx={{ color: primaryColor, mb: 1.5, textAlign: 'center' }}
      >
        Need doctor care at home?
      </Typography>
      <Typography
        sx={{ color: 'text.secondary', mb: 4, textAlign: 'center', maxWidth: 560, mx: 'auto' }}
      >
        Drop your info & we&apos;ll be in touch within 30 minutes. We are serving Dubai, Sharjah,
        Ajman & nearby areas.
      </Typography>

      {status && (
        <Alert
          severity={status === 'success' ? 'success' : 'error'}
          onClose={() => setStatus(null)}
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant="outlined"
              required
              sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              variant="outlined"
              required
              sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Your Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              required
              sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Your Phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              variant="outlined"
              required
              sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white' } }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" required sx={{ backgroundColor: 'white' }}>
              <InputLabel id="service-label">Please Select Service</InputLabel>
              <Select
                labelId="service-label"
                value={service}
                onChange={(e) => setService(e.target.value)}
                label="Please Select Service"
                sx={{ textAlign: 'left' }}
              >
                {options.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address to Visit"
              multiline
              minRows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              variant="outlined"
              required
              sx={{
                '& .MuiOutlinedInput-root': { backgroundColor: 'white' },
                '& textarea': { resize: 'vertical' },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={submitting}
              sx={{
                backgroundColor: primaryColor,
                color: 'white',
                textTransform: 'uppercase',
                fontWeight: 600,
                py: 1.5,
                '&:hover': { backgroundColor: '#0f4559' },
              }}
            >
              {submitting ? 'Sending…' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
