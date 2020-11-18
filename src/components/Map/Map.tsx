import React, { useCallback, useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker, StreetViewPanorama } from "@react-google-maps/api";
import { MdArrowBack } from "react-icons/md";

import mapStyles from "./mapStyles";
import markerIcon from "../../assets/mapMarker/marker.svg";

import "./Map.scss";

declare global {
  interface Window {
    google: any;
  }
}

const Map: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY!
  });

  const [isPanorama, setIsPanorama] = useState(false);

  const mapOptions = useMemo(() => {
    return {
      // mapTypeId: "terrain",
      zoom: 15,
      center: {
        lat: 50.4428267,
        lng: 30.4944428
      },
      styles: mapStyles,
      fullscreenControl: false,
      mapTypeControl: false,
      disableDefaultUI: true
    };
  }, []);

  const mapContainerStyle = useMemo(() => {
    return {
      height: "50vh",
      width: "50vw"
    };
  }, []);

  const panoramaOptions = useMemo(() => {
    return {
      visible: true,
      position: {
        lat: 50.4430161,
        lng: 30.4951908
      },
      pov: {
        heading: 140,
        pitch: 10
      },
      zoom: 1,
      addressControl: false,
      addressControlOptions: {
        position: "TOP_CENTER"
      },
      fullscreenControl: false,
      disableDefaultUI: true
    };
  }, []);

  // const markerOptions = useMemo(() => {
  //   return {
  //     position: {
  //       lat: 49.7365683,
  //       lng: 31.5168711
  //     },
  //     icon: {
  //       url: markerIcon,
  //       scaledSize: {
  //         width: 35,
  //         height: 35
  //       }
  //     }
  //   };
  // }, []);

  const markerPosition = useMemo(() => {
    return {
      lat: 50.4428904,
      lng: 30.4953869
    };
  }, []);

  const markerIconOptions = useMemo(() => {
    return {
      url: markerIcon,
      scaledSize: {
        width: 35,
        height: 35
      }
    };
  }, []);

  const onClickMarker = useCallback(() => {
    setIsPanorama(true);
  }, []);

  const closePanorama = useCallback(() => {
    setIsPanorama(false);
  }, []);

  const renderMap = useCallback(() => {
    return (
      <GoogleMap mapContainerStyle={mapContainerStyle} options={mapOptions}>
        {isPanorama ? (
          <>
            <StreetViewPanorama options={panoramaOptions} />
            <div className="map__close-panorama" onClick={closePanorama} title="Вернуться к карте">
              <MdArrowBack />
            </div>
          </>
        ) : null}
        <Marker
          // options={markerOptions}
          position={markerPosition}
          icon={markerIconOptions}
          onClick={onClickMarker}
          animation={!isPanorama ? window.google.maps.Animation.BOUNCE : null}
          visible={!isPanorama}
        />
      </GoogleMap>
    );
  }, [
    closePanorama,
    isPanorama,
    mapContainerStyle,
    mapOptions,
    markerIconOptions,
    markerPosition,
    onClickMarker,
    panoramaOptions
  ]);

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <div>wait pls</div>;
};

export default Map;
