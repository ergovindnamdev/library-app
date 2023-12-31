import './global.css';

import { useScrollToTop } from './hooks/use-scroll-to-top';

import Router from './routes/sections';
import ThemeProvider from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <ToastContainer />
      <Router />
    </ThemeProvider>
  );
}
