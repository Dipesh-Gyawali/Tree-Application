import { configureStore } from "@reduxjs/toolkit";
import userDetail from "../features/userDetailSlice.tsx";

export const store = configureStore({
  reducer: {
    app: userDetail,
  },
});
