import { Helmet } from 'react-helmet-async';

import { LibraryTransView } from '../sections/library_trans/view';

// ----------------------------------------------------------------------

export default function LibraryTrans() {
  return (
    <>
      <Helmet>
        <title> Library Transations | Minimal UI </title>
      </Helmet>

      <LibraryTransView />
    </>
  );
}
