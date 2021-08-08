import api from "./../common/APIClient";

class SizeOptionService {
    list = () => {
        return api.get("/sizeoption/list");
    };
}

export default new SizeOptionService();