import api from "./../common/APIClient";

class RatingService {
    add = (data) => {
        return api.post("/rating/add", data);
    };
}

export default new RatingService();