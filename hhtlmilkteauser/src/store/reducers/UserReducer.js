import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
};

const userSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    userbyusername: (state, action) => {
      state.customer = action.payload.user;
    },
    // profileUpdate(state, action) {
    //   const { username, fullName, birthday, address, phone, email, postcode, linkImage } = action.payload;
    //   console.log(state.customer);
    //   const existingUser = state.user.find((c) => c.username === username);
    //   if (existingUser) {
    //     existingUser.fullName = fullName;
    //     existingUser.birthday = birthday;
    //     existingUser.address = address;
    //     existingUser.phone = phone;
    //     existingUser.email = email;
    //     existingUser.postcode = postcode;
    //     existingUser.linkImage = linkImage;
    //   }
    // }
  },
});

const {
  reducer,
  actions
} = userSlice;
export const {
  userbyusername
} = actions;
export default reducer;