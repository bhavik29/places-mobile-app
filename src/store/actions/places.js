import * as actionTypes from './actionTypes';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
<<<<<<< HEAD
        fetch("https://us-central1-rn-course-1554131679313.cloudfunctions.net/storeImage", {
=======
        const placeData = {
            name: placeName,
            location: location
        }
        fetch("https://rn-course-1554131679313.firebaseio.com/places.json", {
>>>>>>> parent of b76648a... Stored images on firebase
            method: "POST",
            body: JSON.stringify(placeData)
        })
            .catch(err => console.log(err))
            .then(res => res.json())
            .then(parsedRes => {
<<<<<<< HEAD
                const placeData = {
                    name: placeName,
                    location: location,
                    image: parsedRes.imageUrl
                };

                return fetch("https://rn-course-1554131679313.firebaseio.com/places.json", {
                    method: "POST",
                    body: JSON.stringify(placeData)
                })
                    .catch(err => console.log(err))
                    .then(res => res.json())
                    .then(parsedRes => {
                        console.log(parsedRes);
                    });
=======
                console.log(parsedRes);
>>>>>>> parent of b76648a... Stored images on firebase
            });
    };
};

export const deletePlace = (key) => {
    return {
        type: actionTypes.DELETE_PLACE,
        placeKey: key
    };
};