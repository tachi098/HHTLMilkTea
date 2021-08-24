import api from "./../common/APIClient";

class ChatBotService {
    list = (id) => {
        return api.get(`/order/chatbot/getOrder?orderId=${id}`)
    }
}

export default new ChatBotService();