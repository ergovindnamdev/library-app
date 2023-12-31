import { Helmet } from 'react-helmet-async';

import { UsersView } from '../sections/users/view';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Users | Minimal UI </title>
      </Helmet>

      <UsersView />
    </>
  );
}
