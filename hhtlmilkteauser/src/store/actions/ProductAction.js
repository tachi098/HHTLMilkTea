import { getProducts } from "./../reducers/ProductReducer";
import ProductService from "./../../services/ProductService";

export const ProductGetAll = (query) => async (dispatch) => {
    try {
        await ProductService.list(query)
            .then((res) => dispatch(getProducts(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};