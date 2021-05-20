import React from 'react';
import MobileStoreButton from 'react-mobile-store-button';

export default function Market(props) {
    const { store, url } = props;

    return (
        <div>
            <MobileStoreButton
                store={store}
                url={url}
                height={"90px"}
                width={"200px"}
            />
        </div>
    );
}