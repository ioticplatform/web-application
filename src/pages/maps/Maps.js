import React, {useState} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow  } from '@react-google-maps/api';

export const MapContainer = () => {

    const locations = [
        {
            name: "Location 1",
            location: {
                lat: 44.435642,
                lng: 26.047685
            },
        },
        {
            name: "Location 2",
            location: {
                lat: 44.435591,
                lng: 26.047572
            },
        },
        {
            name: "Location 3",
            location: {
                lat: 44.437409,
                lng: 26.061880
            },
        }
    ];

    const mapStyles = {
        height: "100vh",
        width: "100%"};

    const defaultCenter = {
        lat: 44.433398, lng: 26.103190
    }

    const [ selected, setSelected ] = useState({});

    const onSelect = item => {
        setSelected(item);
    }

    return (
        <LoadScript
            googleMapsApiKey='AIzaSyCWqu2GgRgmzaHiXzvHD8iGacOb5kY8rVA'>
            {
                selected.location &&
                (
                    <InfoWindow
                        position={selected.location}
                        clickable={true}
                        onCloseClick={() => setSelected({})}
                    >
                        <p>{selected.name}</p>
                    </InfoWindow>
                )
            }
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
                style={{top: "0"}}>
                {
                    locations.map(item => {
                        return (
                            <Marker key={item.name}
                                    position={item.location}
                                    onClick={() => onSelect(item)}
                            />
                        )
                    })
                }
            </GoogleMap>
        </LoadScript>
    )
}
export default MapContainer;