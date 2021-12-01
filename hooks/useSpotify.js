import React, { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import spotifyApi from '../lib/spotify';

const useSpotify = () => {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      // if refresh access tokens fails  , direct to login
      if (session.error === 'RefreshAccessTokenError') {
        signIn();
      }

      // if all good
      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return spotifyApi;
};

export default useSpotify;
