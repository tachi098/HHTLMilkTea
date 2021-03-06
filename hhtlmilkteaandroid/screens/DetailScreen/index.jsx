import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import { PrimaryButton } from '../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { OrderAddActionMobile } from '../../store/actions/OrderAction';
import { udpateWishlist } from '../../store/actions/WishlistAction';

const DetailsScreen = ({ navigation, route }) => {
    const item = route.params;
    var sizes = [...item.sizeOptions]
    sizes = sizes.sort((a, b) => a.id - b.id);

    const [selectedSize, setSelectedSize] = useState(sizes[0]);
    const [selectedAdd, setSelectedAdd] = useState([]);
    const [currentPrice, setCurrentPrice] = useState(item.price);
    const [count, setCount] = useState(1);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { wishlist } = useSelector((state) => state.user)

    const onHandleSelectAdd = item => {
        if (!selectedAdd.includes(item)) {
            setSelectedAdd([...selectedAdd, item]);
            setCurrentPrice(currentPrice + item.price)
        } else {
            setSelectedAdd(selectedAdd.filter(elm => !Object.is(elm, item)));
            setCurrentPrice(currentPrice - item.price)
        }
    }

    const onHandleMinus = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    const onHandlePlus = () => {
        setCount(count + 1);
    }

    const onHandleSelectSize = size => {
        setSelectedSize(size)
        var price = item.price;
        price += size.price;
        price += selectedAdd.reduce((a, b) => a + (b['price'] || 0), 0)
        setCurrentPrice(price);
    }

    const onSubmit = () => {
        const product = JSON.stringify(item);
        const userId = auth?.user?.id;
        const sizeOption = selectedSize?.name ? selectedSize.name : "";
        const quantity = count;

        var additionOption = "";

        if (selectedAdd?.length > 0) {
            const result = selectedAdd.map(a => a.name).sort();
            var temp = "";
            for (let i = 0; i < result.length; i++) {
                if (Object.is(i, 0)) {
                    temp = temp.concat(result[i]);
                } else {
                    temp = temp.concat(", " + result[i]);
                }
            }

            additionOption = temp;
        } else {
            additionOption = ""
        }

        const priceCurrent = currentPrice;
        const note = "";
        const data = { product, userId, sizeOption, quantity, additionOption, priceCurrent, note }
        dispatch(OrderAddActionMobile(data, `Bearer ${auth?.user?.token}`));
        navigation.navigate("Home ");
    };

    const onHandleWishList = () => {
        const userId = auth.user.id;
        dispatch(udpateWishlist({ userId: userId, productId: item.id }, `Bearer ${auth?.user?.token}`));

    };

    const onHandleWishListSelected = () => {
        const userId = auth.user.id;
        dispatch(udpateWishlist({ userId: userId, productId: item.id }, `Bearer ${auth?.user?.token}`));
    };


    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white }}>

            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Details</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 280,
                    }}>
                    <Image source={{ uri: item?.linkImage }} style={{ height: 180, width: 180 }} />
                </View>
                <View style={style.details}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.primary }}>
                            {item.title}
                        </Text>
                        {
                            wishlist?.products?.map((w) => w.id).includes(item?.id) ? (
                                <View style={style.iconContainerSelected} >
                                    <Icon name="favorite-border" color={COLORS.white} size={25} onPress={onHandleWishListSelected} />
                                </View>
                            ) : (
                                <View style={style.iconContainer} >
                                    <Icon name="favorite-border" color={COLORS.primary} size={25} onPress={onHandleWishList} />
                                </View>
                            )
                        }

                    </View>
                    {sizes?.length > 0 &&
                        (<View>
                            <Text>Size:</Text>
                            <View>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <View style={{ flex: 2, flexDirection: "row" }}>
                                        {
                                            sizes?.map((size, index) => (
                                                <Text key={index} style={selectedSize?.id === size?.id ? style.selected : style.notSelect} onPress={() => { onHandleSelectSize(size) }}>{size.name}</Text>
                                            ))
                                        }
                                    </View>
                                </ScrollView>
                            </View>
                        </View>)
                    }
                    {
                        item?.additionOptions?.length > 0 && (
                            <View>
                                <Text>Topping:</Text>
                                <View>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                    >
                                        <View style={{ flex: 2, flexDirection: "row" }}>
                                            {
                                                item?.additionOptions?.map((add, index) => (
                                                    <Text key={index} style={selectedAdd.length > 0 && selectedAdd.includes(add) ? style.selected : style.notSelect} onPress={() => onHandleSelectAdd(add)}>{add.name}</Text>
                                                ))
                                            }
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        )
                    }
                    <View style={{ flex: 2, flexDirection: "row", marginTop: 20 }}>
                        <Text style={{ top: 16 }}>Quantity:</Text>
                        <View style={{ flex: 2, flexDirection: "row" }}  >
                            <View style={style.quantityContainer}>
                                <Text style={{ fontSize: 20, color: 'black' }} onPress={onHandleMinus}>-</Text>
                            </View>
                            <View style={style.quantityContainer}>
                                <Text>{count}</Text>
                            </View>
                            <View style={style.quantityContainer}>
                                <Text style={{ fontSize: 20, color: 'black' }} onPress={onHandlePlus}>+</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 2, flexDirection: "row", marginTop: 20 }}>
                        <Text>Total price:</Text>
                        <Text style={{ marginLeft: 20 }}>{(currentPrice ? currentPrice * count : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VN??</Text>
                    </View>
                    <View style={{ marginTop: 20, marginBottom: 40 }}>
                        <PrimaryButton title="Add To Cart" onPress={onSubmit} />
                    </View>
                </View>
            </ScrollView>
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
    details: {
        paddingHorizontal: 20,
        paddingBottom: 60,
        backgroundColor: COLORS.white,
    },
    quantityContainer: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    iconContainer: {
        borderColor: COLORS.primary,
        borderWidth: 2,
        backgroundColor: COLORS.white,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    iconContainerSelected: {
        backgroundColor: COLORS.primary,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    detailsText: {
        marginTop: 10,
        lineHeight: 22,
        fontSize: 16,
        color: COLORS.primary,
    },
    notSelect: {
        flexDirection: 'column',
        backgroundColor: "white",
        color: COLORS.primary,
        fontSize: 16,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 10,
        width: 140,
        textAlign: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.primary,
        marginRight: 10,
        marginTop: 10,
        lineHeight: 20,
        textAlignVertical: 'center'
    },
    selected: {
        flexDirection: 'column',
        backgroundColor: COLORS.primary,
        color: "white",
        fontSize: 16,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 10,
        width: 140,
        borderColor: "white",
        textAlign: 'center',
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 10,
        marginTop: 10,
        lineHeight: 20,
        textAlignVertical: 'center'
    },
});

export default DetailsScreen;
