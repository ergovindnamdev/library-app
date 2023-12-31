import { Helmet } from 'react-helmet-async';

import { ForgetPasswordView } from '../sections/forget-password';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Forget Password | LMS UI </title>
      </Helmet>

      <ForgetPasswordView />
    </>
  );
}
