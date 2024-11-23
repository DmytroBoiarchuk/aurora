import React, { useEffect, useState } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import classes from './GoogleMapComponent.module.scss';
import usersData from '../../../../../database/usersData';
import { UsersCoordsProps } from '../../../../../assets/interfaces/interfaces';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function GoogleMapComponent(): JSX.Element {
  const [userCoords, setUserCoords] = useState<UsersCoordsProps>({ lat: 0, lng: 0 });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  useEffect(() => {
    if (isLoaded) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: usersData.address }, (results, status) => {
        if (status === 'OK' && results) {
          const latLng = results[0].geometry.location;
          setUserCoords({ lat: latLng.lat(), lng: latLng.lng() });
        }
      }).catch(console.log);
    }
  }, [usersData.address, isLoaded]);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${userCoords.lat},${userCoords.lng}`;

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className={classes.mapStyle}>
      <GoogleMap zoom={17} center={userCoords} mapContainerStyle={{ width: '500px', height: '500px' }}>
        <MarkerF position={userCoords} onClick={(): WindowProxy | null => window.open(googleMapsUrl, '_blank')} />
      </GoogleMap>
      <p>{usersData.address}</p>
    </div>
  );
}

export default GoogleMapComponent;
