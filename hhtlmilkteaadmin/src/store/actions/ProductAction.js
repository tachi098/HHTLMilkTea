import { getProducts, productAdded } from "./../reducers/ProductReducer";
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

export const addProduct = (data) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append(`multipartFile`, data.multipartFile)
    formData.append("name", data.name)
    formData.append("title", data.title)
    formData.append("price", data.price)
    formData.append("categoryId", JSON.stringify(data.categoryId))

    for (let i = 0; i < data.additionOptions.length; i++) {
      formData.append(`additionOptions[${i}]`, JSON.stringify(data.additionOptions[i]))
    }

    for (let i = 0; i < data.sizeOptions.length; i++) {
      formData.append(`sizeOptions[${i}]`, JSON.stringify(data.sizeOptions[i]))
    }

    const res = await ProductService.add(formData);

    dispatch(productAdded(res.data));
  } catch (e) {
    return console.error(e);
  }
};
