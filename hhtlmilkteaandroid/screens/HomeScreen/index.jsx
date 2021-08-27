import React from 'react';
import {
    Alert,
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    FlatList,
    ScrollView,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import categories from '../../consts/categories';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ProductGetAll } from './../../store/actions/ProductAction'

const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const HomeScreen = ({ navigation }) => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

    const { products, newProductId } = useSelector((state) => state.product);

    const [valueCategory, setValueCategory] = useState("");
    const [valueToOrderBy, setValueToOrderBy] = useState("id");
    const [valueToSortDir, setValueToSortDir] = useState("desc");
    const [keyword, setKeyword] = useState("");
    const [name, setName] = useState("")
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(
            ProductGetAll({
                cateName: valueCategory,
                sortField: valueToOrderBy,
                sortDir: valueToSortDir,
                keyword,
            })
        );
    }, [dispatch, valueToOrderBy, valueToSortDir, keyword, valueCategory]);

    const onHandleChangeCate = (category, index) => {
        setSelectedCategoryIndex(index);
        setValueCategory(category.name === "Milktea" ? "" : category.name);
    }

    const ListCategories = () => {
        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={style.categoriesListContainer}>
                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.8}
                        onPress={() => onHandleChangeCate(category, index)}>
                        <View
                            style={{
                                backgroundColor:
                                    selectedCategoryIndex == index
                                        ? COLORS.primary
                                        : COLORS.secondary,
                                ...style.categoryBtn,
                            }}>
                            <View style={style.categoryBtnImgCon}>
                                <Image
                                    source={category.image}
                                    style={{ height: 35, width: 35, resizeMode: 'cover' }}
                                />
                            </View>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    marginLeft: 10,
                                    color:
                                        selectedCategoryIndex == index
                                            ? COLORS.white
                                            : COLORS.primary,
                                }}>
                                {category.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };
    const Card = ({ item }) => {

        const onDetail = () => {
            if (auth?.user?.token) {
                navigation.navigate('DetailsScreen', item)
            } else {
                Alert.alert(
                    'Notification',
                    'Please Singin! Do you want redirect to SignIn? ',
                    [
                        {
                            text: 'Yes',
                            onPress: () => navigation.navigate("SignIn")
                        },
                        {
                            text: 'No',
                            style: 'cancel'
                        },
                    ],
                    { cancelable: false },
                );
            }
        }

        return (
            <TouchableHighlight
                underlayColor={COLORS.white}
                activeOpacity={0.9}
                onPress={onDetail}>
                <View style={style.card}>
                    <View style={{ alignItems: 'center', top: -40 }}>
                        <Image source={{ uri: item?.linkImage }} style={{ height: 120, width: 120 }} />
                    </View>
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item?.title}</Text>
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            marginHorizontal: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <Text style={{ fontSize: 14, color: COLORS.grey, marginTop: 2 }}>
                            {(item?.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
                        </Text>
                        <View style={style.addToCartBtn}>
                            <Icon name="add" size={20} color={COLORS.white} />
                        </View>
                    </View>
                </View>
            </TouchableHighlight >
        );
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View
                style={{
                    marginTop: 40,
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                }}>
                <View style={style.inputContainer}>
                    <Icon name="search" size={28} />
                    <TextInput
                        style={{ flex: 1, fontSize: 18 }}
                        placeholder="Search for drink"
                        onChangeText={text => { setName(text) }}
                    />
                </View>
                <View style={style.sortBtn}>
                    <Icon name="tune" size={28} color={COLORS.white} onPress={() => setKeyword(name)} />
                </View>
            </View>
            <View>
                <ListCategories />
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={products}
                renderItem={({ item }) => <Card item={item} />}
            />
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    inputContainer: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.light,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    sortBtn: {
        width: 50,
        height: 50,
        marginLeft: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoriesListContainer: {
        paddingVertical: 30,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    categoryBtn: {
        height: 45,
        width: 120,
        marginRight: 7,
        borderRadius: 30,
        alignItems: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',
    },
    categoryBtnImgCon: {
        height: 35,
        width: 35,
        backgroundColor: COLORS.white,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        height: 220,
        width: cardWidth,
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 50,
        borderRadius: 15,
        elevation: 13,
        backgroundColor: COLORS.white,
    },
    addToCartBtn: {
        height: 30,
        width: 30,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
