import CategoryService from "../../services/CategoryService";
import {
    findAll,
    categoryPage,
    categoryAdded,
    categoryDelete,
    categoryUpdate,
} from "./../reducers/CategoryReducer";

export const CategoryListAction = () => async (dispatch) => {
    try {
        await CategoryService.list()
            .then((response) => dispatch(findAll(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};

export const CategoryPageAction = (query) => async (dispatch) => {
    try {
        await CategoryService.page(query)
            .then((response) => dispatch(categoryPage(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};

export const CategoryAddAction = (data) => async (dispatch) => {
    try {
        await CategoryService.add(data)
            .then((response) => dispatch(categoryAdded(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};

export const CategoryDeleteAction = (data) => async (dispatch) => {
    try {
      const res = await CategoryService.delete(data);
      dispatch(categoryDelete(res.data));
    } catch (e) {
      return console.error(e);
    }
  };

  export const CategoryUpdateAction = (data) => async (dispatch) => {
    try {
      await CategoryService.update(data)
        .then((response) => dispatch(categoryUpdate(response.data)))
        .catch((error) => console.error(error));
  
    } catch (e) {
      return console.error(e);
    }
  };