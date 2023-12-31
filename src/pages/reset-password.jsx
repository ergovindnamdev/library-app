import { Helmet } from 'react-helmet-async';

import { ResetPasswordView } from '../sections/reset-password';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Reset Password | LMS UI </title>
      </Helmet>

      <ResetPasswordView />
    </>
  );
}
