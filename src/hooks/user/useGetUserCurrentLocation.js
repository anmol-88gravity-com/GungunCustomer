import {useCallback, useEffect, useState} from 'react';

import {useError} from '../../context/ErrorProvider';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {Platform} from 'react-native';
import GetLocation from 'react-native-get-location';

export const useGetUserCurrentLocation = () => {
  const setError = useError();

  const [loader, setLoader] = useState(true);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const getLocation = useCallback(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(async location => {
        setLat(location.latitude);
        setLong(location.longitude);
      })
      .catch(error => {
        const {code, message} = error;
        setError('Error : ' + code + ' ' + message);
      });
    setLoader(false);
  }, [setError]);

  useEffect(() => {
    (async () => {
      check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      )
        .then(result => {
          switch (result) {
            case RESULTS.GRANTED:
              getLocation();
              break;
            case RESULTS.UNAVAILABLE:
              setError('This feature is not available on this device!');
              break;
            case RESULTS.DENIED:
              request(
                Platform.OS === 'ios'
                  ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                  : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
              ).then(requestResult => {
                if (requestResult === RESULTS.GRANTED) {
                  getLocation();
                }
              });
              break;
            case RESULTS.LIMITED:
              getLocation();
              break;
            case RESULTS.BLOCKED:
              setError(
                'The permission is denied! Please enable storage permission.',
              );
              openSettings().catch(settingsErr =>
                setError('Unable to open settings!'),
              );
              break;
          }
        })
        .catch(e => {
          setError(e.message);
        });
    })();

    return () => {};
  }, [getLocation, setError]);

  return {
    lat,
    long,
    loader,
  };
};
