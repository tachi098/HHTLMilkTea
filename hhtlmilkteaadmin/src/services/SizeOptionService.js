import api from "./../common/APIClient";

class SizeOptionService {
    list = () => {
        return api.get("/sizeoption/list");
    };
    page = (query) => {
        return api.get("/sizeoption/page", { params: query });
    }
    add = (data) => {
        return api.post("/sizeoption/add", data);
    };
    update = (data) => {
        return api.put("/sizeoption/edit", data);
    };
    delete = (id) => {
        return api.put(`/sizeoption/delete/${id}`);
    }
}

export default new SizeOptionService();