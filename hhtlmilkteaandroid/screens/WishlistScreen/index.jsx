import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import { useDispatch, useSelector } from 'react-redux';
import { OrderDelteOrderDetail, OrderUpdateQuantity } from '../../store/actions/OrderAction';
import { deleteWishlist } from '../../store/actions/WishlistAction';

const WishlistScreen = ({ navigation }) => {

    const { order, totalPrice } = useSelector((state) => state.order);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { wishlist } = useSelector((state) => state.user);


    const onHandleDelete = (id) => {
        dispatch(deleteWishlist({ userId: auth.user.id, productId: id }, `Bearer ${auth?.user?.token}`));
    };

    const onHandleDeleteOrderDetail = (id) => {
        dispatch(OrderDelteOrderDetail(id, `Bearer ${auth?.user?.token}`));
    };

    const CartCard = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('DetailsScreen', item) }}>
                <View style={style.cartCard}>
                    <Image source={{ uri: item.linkImage }} style={{ height: 80, width: 80 }} />
                    <View
                        style={{
                            height: 100,
                            marginLeft: 10,
                            paddingVertical: 20,
                            flex: 1,
                        }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.title}</Text>
                        <Text style={{ fontSize: 16 }}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</Text>
                    </View>
                    <View style={{ marginRight: 20, alignItems: 'center' }}>
                        <Icon name="clear" size={25} color="red" style={{ marginLeft: 60 }} onPress={() => onHandleDelete(item.id)} />
                        <View style={style.actionBtn}>
                            <Text style={{ marginTop: 2, fontWeight: 'bold', color: 'white' }}>Buy</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const onsubmit = () => {
        if (totalPrice > 0) {
            navigation.navigate("PaymentScreen")
        } else {
            Alert.alert(
                'Notification',
                'Must have at least a product in your cart, Keep Buying ',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate("Home ")
                    },
                ],
                { cancelable: false },
            );
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            {auth?.user?.token ? (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 80 }}
                    data={wishlist?.products}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <CartCard item={item} />}
                    ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
                />
            ) : (
                <View style={style.container}>
                    <Text >Please Signin</Text>
                </View>
            )}
        </SafeAreaView>
    );
};
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    cartCard: {
        paddingTop: 20,
        height: 140,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    actionBtn: {
        marginTop: 20,
        width: 80,
        height: 30,
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
});

export default WishlistScreen;
