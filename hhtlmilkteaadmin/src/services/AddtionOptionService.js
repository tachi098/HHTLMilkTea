import api from "./../common/APIClient";

class AddtionOptionService {
    list = () => {
        return api.get("/additionoption/list");
    };
    page = (query) => {
        return api.get("/additionoption/page", { params: query });
    }
    add = (data) => {
        return api.post("/additionoption/add", data);
    };
    update = (data) => {
        return api.put("/additionoption/edit", data);
    };
    delete = (id) => {
        return api.put(`/additionoption/delete/${id}`);
    }
}

export default new AddtionOptionService();