'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BookDoctorForm } from './BookDoctorForm';

const theme = createTheme({
  palette: {
    primary: { main: '#4F052B' },
  },
});

export function BookDoctorPageClient({ serviceOptions = [] }) {
  return (
    <ThemeProvider theme={theme}>
      <BookDoctorForm serviceOptions={serviceOptions} />
    </ThemeProvider>
  );
}
