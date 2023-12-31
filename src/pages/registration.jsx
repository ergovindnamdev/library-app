import { Helmet } from 'react-helmet-async';

import { RegistrationView } from '../sections/registration';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Registration | LMS UI </title>
      </Helmet>

      <RegistrationView />
    </>
  );
}
