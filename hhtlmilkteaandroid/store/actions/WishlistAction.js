import WishlistService from "./../../services/WishlistService";
import { deleteProductWishlist, getWishlist, updateWishlist } from "../reducers/UserReducer";

export const GetWishlist = (query, jwt) => async (dispatch) => {
    try {
        await WishlistService.find(query, jwt)
            .then((res) => dispatch(getWishlist(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};

export const udpateWishlist = (data, jwt) => async (dispatch) => {
    try {
        await WishlistService.add(data, jwt)
            .then((response) =>
                dispatch(updateWishlist(response.data))
            )
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};

export const deleteWishlist = (data, jwt) => async (dispatch) => {
    try {
        await WishlistService.update(data, jwt)
            .then((response) =>
                dispatch(deleteProductWishlist(response.data))
            )
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};