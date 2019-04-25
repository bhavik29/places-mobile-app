import * as actionTypes from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://us-central1-rn-course-1554131679313.cloudfunctions.net/storeImage", {
            method: "POST",
            body: JSON.stringify({
                image: image.base64
            })
        })
            .catch(err => {
                console.log(err);
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                const placeData = {
                    name: placeName,
                    location: location,
                    image: parsedRes.imageUrl
                };

                return fetch("https://rn-course-1554131679313.firebaseio.com/places.json", {
                    method: "POST",
                    body: JSON.stringify(placeData)
                })
                    .catch(err => {
                        console.log(err);
                        dispatch(uiStopLoading());
                    })
                    .then(res => res.json())
                    .then(parsedRes => {
                        console.log(parsedRes);
                        dispatch(uiStopLoading());
                    });
            });
    };
};

export const deletePlace = (key) => {
    return {
        type: actionTypes.DELETE_PLACE,
        placeKey: key
    };
};