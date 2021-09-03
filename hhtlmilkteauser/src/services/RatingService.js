import api from "./../common/APIClient";

class RatingService {
    add = (data) => {
        return api.post("/rating/add", data);
    };
    get = () => {
        return api.get(`/rating/list`)
    }
}

export default new RatingService();