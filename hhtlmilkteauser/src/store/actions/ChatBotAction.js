import ChatBotService from "../../services/ChatBotService";

export const ChatBotListAction = (id) => async (dispatch) => {
    try {
       const res =  await ChatBotService.list(id)
       return res;
    } catch (error) {
        console.error(error);
    }
};