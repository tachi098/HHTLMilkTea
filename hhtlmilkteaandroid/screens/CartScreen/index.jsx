import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import { PrimaryButton } from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { OrderDelteOrderDetail, OrderUpdateQuantity } from '../../store/actions/OrderAction';

const CartScreen = ({ navigation }) => {

    const { order, totalPrice } = useSelector((state) => state.order);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const onHandleUpdateQuantity = (orderDetailId, action) => {
        dispatch(
            OrderUpdateQuantity({ orderDetailId, action }, `Bearer ${auth?.user?.token}`)
        );
    };

    const onHandleDeleteOrderDetail = (id) => {
        dispatch(OrderDelteOrderDetail(id, `Bearer ${auth?.user?.token}`));
    };

    const CartCard = ({ item }) => {
        return (
            <View style={style.cartCard}>
                <Image source={{ uri: item.product.linkImage }} style={{ height: 80, width: 80 }} />
                <View
                    style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: 20,
                        flex: 1,
                    }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.product.title}</Text>
                    <Text style={{ fontSize: 13, color: COLORS.grey }}>
                        {item.sizeOptionId}{" "}
                        {item.addOptionId !== "" &&
                            ": " + item.addOptionId}
                    </Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{(item.priceCurrent * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</Text>
                </View>
                <View style={{ marginRight: 20, alignItems: 'center' }}>
                    <Icon name="clear" size={25} color="red" style={{ marginLeft: 60 }} onPress={() => onHandleDeleteOrderDetail(item.id)} />
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.quantity}</Text>
                    <View style={style.actionBtn}>
                        <Icon name="remove" size={25} color={COLORS.white} onPress={() => { if (item.quantity > 1) { onHandleUpdateQuantity(item.id, "minus") } }} />
                        <Icon name="add" size={25} color={COLORS.white} onPress={() => onHandleUpdateQuantity(item.id, "plus")} />
                    </View>
                </View>
            </View>
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
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Cart</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={order?.orderDetails}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <CartCard item={item} />}
                ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
            />
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        marginVertical: 15,
                        justifyContent: 'space-between',
                        marginLeft: 20,
                        marginRight: 20
                    }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                        Total Price
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</Text>
                </View>
                <View style={{ marginHorizontal: 30, marginBottom: 10 }}>
                    <PrimaryButton title="CHECKOUT" onPress={onsubmit} />
                </View>
            </View>
        </SafeAreaView>
    );
};
const style = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    cartCard: {
        height: 190,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
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

export default CartScreen;
