import React, { Component } from 'react';
import { View, Image, Text, Button, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

import Icon from 'react-native-vector-icons/Ionicons';
import { deletePlace } from '../../store/actions/index/';

class PlaceDetail extends Component {
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
        focusedLocation: {
            latitude: 37.7900352,
            longitude: -122.4013726,
            latitudeDelta: 0.0122,
            longitudeDelta:
                Dimensions.get("window").width /
                Dimensions.get("window").height *
                0.0122
        }
    }

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        })
    }

    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    }

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        });

        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            }
        });
    }

    render() {
        return (
            <View style={[
                styles.container,
                this.state.viewMode === "portrait"
                    ? styles.portraitContainer
                    : styles.landscapeContainer]}>
                <View style={styles.placeDetailContainer}>
                    <View style={styles.subContainer}>
                        <Image
                            source={this.props.selectedPlace.image}
                            style={styles.placeImage} />
                    </View>
                    <View style={styles.subContainer}>
                        <MapView
                            initialRegion={{
                                ...this.props.selectedPlace.location,
                                latitudeDelta: 0.0122,
                                longitudeDelta:
                                    Dimensions.get("window").width /
                                    Dimensions.get("window").height *
                                    0.0122
                            }}
                            style={styles.map}
                            onPress={this.pickLocationHandler} >
                            <MapView.Marker coordinate={this.props.selectedPlace.location} />
                        </MapView>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.placeDeletedHandler}>
                            <View style={styles.deleteButton}>
                                <Icon
                                    size={30}
                                    name={Platform.OS === 'android' ? 'md-trash' : "ios-trash"}
                                    color="red" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        );
    }

};

const styles = StyleSheet.create({
    container: {
        margin: 100,
        flex: 1
    },
    portraitContainer: {
        flexDirection: "column"
    },
    placeDetailContainer: {
        flex: 2
    },
    landscapeContainer: {
        flexDirection: "row"
    },
    placeImage: {
        width: "100%",
        height: "100%"
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    deleteButton: {
        alignItems: "center"
    },
    subContainer: {
        flex: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    }
}

export default connect(null, mapDispatchToProps)(PlaceDetail);