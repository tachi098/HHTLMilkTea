import api from "./../common/APIClient";

class AddtionOptionService {
    list = () => {
        return api.get("/additionoption/list");
    };
}

export default new AddtionOptionService();