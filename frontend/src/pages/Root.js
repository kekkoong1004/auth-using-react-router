import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import { getAuth, getTokenValidityDuration } from '../utils/helpers';

import MainNavigation from '../components/MainNavigation';

function RootLayout() {
  const auth = useLoaderData();
  const submit = useSubmit();

  // Auto logout feature
  useEffect(() => {
    if (!auth) {
      return;
    }

    const tokenRemainingTime = getTokenValidityDuration();

    if (tokenRemainingTime === 'expired') {
      submit(null, { method: 'post', action: '/logout' });
    }

    setTimeout(() => {
      submit(null, { method: 'post', action: '/logout' });
    }, tokenRemainingTime);
  }, [auth]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
