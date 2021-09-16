import { getProducts, productAdded, productUpdate, productDelete, getSaleOff, getSaleOffProduct, getAll } from "./../reducers/ProductReducer";
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

export const updateProduct = (data) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("id", data.id)
    if (data.multipartFile) {
      formData.append("multipartFile", data.multipartFile)
    }
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

    const res = await ProductService.update(formData);

    dispatch(productUpdate(res.data));
  } catch (e) {
    return console.error(e);
  }
};

export const deleteProduct = (data) => async (dispatch) => {
  try {
    const res = await ProductService.delete(data);
    dispatch(productDelete(res.data));
  } catch (e) {
    return console.error(e);
  }
};

export const ProductSaleOff = (query) => async (dispatch) => {
  try {
    await ProductService.showSaleOff(query)
      .then((res) => dispatch(getSaleOff(res.data)))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};

export const ShowProductSaleOff = (query) => async (dispatch) => {
  try {
    await ProductService.showSaleOffProduct(query)
      .then((res) => dispatch(getSaleOffProduct(res.data)))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};

export const getAllProducts = () => async (dispatch) => {
  try {
    await ProductService.productGetAll()
      .then((res) => dispatch(getAll(res.data)))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};