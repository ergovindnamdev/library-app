import { Helmet } from 'react-helmet-async';

import { BooksView } from '../sections/books/view';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Books | Minimal UI </title>
      </Helmet>

      <BooksView />
    </>
  );
}
