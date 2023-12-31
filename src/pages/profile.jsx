import { Helmet } from 'react-helmet-async';

import { AccountProfile } from '../sections/profile';
// ----------------------------------------------------------------------

export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title> Profile | LMS UI </title>
      </Helmet>

      <AccountProfile />
    </>
  );
}
