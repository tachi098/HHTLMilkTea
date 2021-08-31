import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, Platform, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { PrimaryButton } from '../../components/Button';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux';
import { checkoutOrder } from '../../store/actions/OrderAction';
import { setLocationAction } from '../../store/actions/LocationAction';

const PaymentScreen = ({ navigation }) => {

    const origin = { latitude: 10.7868348, longitude: 106.6640856 }
    const [location, setLocation] = useState(origin);
    const [errorMsg, setErrorMsg] = useState(null);
    const GOOGLE_MAPS_APIKEY = "AIzaSyAcQjrfAudzl6Ton7GA7D-gVqOINMFE7ns"
    const [duration, setDuration] = useState();
    const [distance, setDistance] = useState();
    const [address, setAddress] = useState();
    const [shipping, setShipping] = useState();
    const auth = useSelector((state) => state.auth);
    const { order, totalPrice } = useSelector((state) => state.order);
    const dispatch = useDispatch();
    const { locationPoint } = useSelector(state => state.location);

    useEffect(() => {

        (async () => {
            if (Platform.OS === 'android' && !Constants.isDevice) {
                setErrorMsg(
                    'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
                );
                return;
            }
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let destination = {};
            await Location.getCurrentPositionAsync({}).then(res => {
                Location.reverseGeocodeAsync({
                    latitude: res.coords.latitude, longitude: res.coords.longitude
                }).then(geo => {
                    setAddress(geo[0].street + ", " + geo[0].subregion + ", " + geo[0].region)
                });

                destination = { latitude: res.coords.latitude, longitude: res.coords.longitude }
                setLocationAction(destination)(dispatch);
                setLocation(destination);
            }).catch(err => {
                console.log("test")
                Location.reverseGeocodeAsync({
                    latitude: locationPoint.latitude, longitude: locationPoint.longitude
                }).then(geo => {
                    setAddress(geo[0].street + ", " + geo[0].subregion + ", " + geo[0].region)
                });

                destination = { latitude: locationPoint.latitude, longitude: locationPoint.longitude }
                setLocation(destination);
            });

            return destination;
        })().then(res => fetchDistanceBetweenPoints(origin.latitude, origin.longitude, res.latitude, res.longitude));
    }, [])



    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }


    const fetchDistanceBetweenPoints = (lat1, lng1, lat2, lng2) => {

        var urlToFetchDistance = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + lat1 + ',' + lng1 + '&destinations=' + lat2 + '%2C' + lng2 + '&key=' + GOOGLE_MAPS_APIKEY;

        fetch(urlToFetchDistance)
            .then(res => {
                return res.json()
            })
            .then(res => {
                var distanceString = res.rows[0].elements[0].distance.text;
                var durationString = res.rows[0].elements[0].duration.text;
                setDistance(distanceString)
                setDuration(durationString)
                const km = +distanceString.split(" ")[0];
                setShipping(km <= 5 ? 5000 : km > 5 && km <= 10 ? 10000 : 15000);
                // Do your stuff here
            })
            .catch(error => {
                console.log("Problem occurred");
            });
    }


    const onSubmit = () => {
        const data = {
            address: address,
            phone: auth?.user?.phone ?? "",
            shipping: shipping,
            payment: "cod",
            orderId: order.id,
            note: "Mobile Payment",
            totalPrice: shipping + totalPrice + totalPrice * 0.05,
            memberVip: 0,
            total: totalPrice
        };
        dispatch(checkoutOrder(data, `Bearer ${auth?.user?.token}`));
        Alert.alert(
            'Notification',
            'Payment Success, Keep Buying ',
            [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate("Home ")
                },
            ],
            { cancelable: false },
        );
    }

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Payment</Text>
            </View>
            <MapView
                style={styles.maps}
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.0622,
                    longitudeDelta: 0.0121,
                }}
            >
                <MapViewDirections
                    lineDashPattern={[0]}
                    origin={origin}
                    destination={location ?? origin}
                    apikey={GOOGLE_MAPS_APIKEY} // insert your API Key here
                    strokeWidth={4}
                    strokeColor="#111111"
                />
                <MapView.Marker coordinate={origin} />
                <MapView.Marker coordinate={location} />
            </MapView>

            {duration && Object.keys(duration).length > 0 &&
                (<View style={{ marginLeft: 20, marginRight: 20, }}>
                    <View style={{ marginTop: 10, marginBottom: 10, borderBottomWidth: 1, paddingBottom: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', paddingBottom: 10 }}>Infomation Payment</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Buyer Name:</Text> {auth?.user?.fullName}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Phone:</Text> {auth?.user?.phone}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Email:</Text> {auth?.user?.email}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Address:</Text> {address}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Destination:</Text> {distance}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Duration:</Text> {duration}</Text>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Text><Text style={{ fontWeight: 'bold' }}>Sub Total:</Text> {totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Tax (5%):</Text> {(totalPrice * 0.05).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Shipping:</Text>{shipping?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Total Amount:</Text> {(shipping + totalPrice + totalPrice * 0.05).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</Text>
                    </View>
                    <PrimaryButton title="Payment" onPress={onSubmit} />
                </View>
                )}

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    maps: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height / 3,
    },
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default PaymentScreen