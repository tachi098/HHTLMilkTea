import api from "./../common/APIClient";

class RatingService {
    list = () => {
        return api.get("/rating/list");
    };
    page = (query) => {
        return api.get("/rating/page", { params: query });
    }
}

export default new RatingService();