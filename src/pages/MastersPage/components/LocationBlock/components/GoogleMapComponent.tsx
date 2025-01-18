import React, { useEffect, useState } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useLocation } from 'react-router';
import classes from './GoogleMapComponent.module.scss';
import { UsersCoordsProps, UsersDataInterface } from '../../../../../assets/interfaces/interfaces';
import {VITE_GOOGLE_MAPS_API_KEY} from '../../../../../constants/keys';
import { queryClient } from '../../../../../query';
import AddressPicker from '../../../../MastersSettingPage/InfoBlockEdit/components/AddressPicker/AddressPicker';

function GoogleMapComponent(): JSX.Element {
  const isSetting = useLocation().pathname === '/setting';
  const mastersData: UsersDataInterface | undefined = queryClient.getQueryData(['MastersData']);
  const address = mastersData?.address;
  const [userCoords, setUserCoords] = useState<UsersCoordsProps>({ lat: 0, lng: 0 });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  useEffect(() => {
    if (isLoaded) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results) {
          const latLng = results[0].geometry.location;
          setUserCoords({ lat: latLng.lat(), lng: latLng.lng() });
        }
      }).catch(console.log);
    }
  }, [address, isLoaded]);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${userCoords.lat},${userCoords.lng}`;

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className={`${classes.mapStyle} ${isSetting? classes.editingStyle : classes.notEditing}`}>
      {isSetting && <AddressPicker/>}
      <GoogleMap zoom={17} center={userCoords} mapContainerStyle={{ width: '500px', height: '500px' }}>
        <MarkerF position={userCoords} onClick={(): WindowProxy | null => window.open(googleMapsUrl, '_blank')} />
      </GoogleMap>
      <p>{address}</p>
    </div>
  );
}

export default GoogleMapComponent;
