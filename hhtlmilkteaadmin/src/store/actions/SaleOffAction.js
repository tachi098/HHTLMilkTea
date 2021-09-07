import SaleOffService from "../../services/SaleOffService";
import { deleteSaleOffProduct } from "../reducers/ProductReducer";

export const SaleOffAddAction = (data) => async (dispatch) => {
    try {
        await SaleOffService.add(data)
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};

export const SaleOffDeleteAction = (id) => async (dispatch) => {
    try {
        await SaleOffService.delete(id)
            .then((response) => dispatch(deleteSaleOffProduct(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};