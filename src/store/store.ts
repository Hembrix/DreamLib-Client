import { configureStore } from "@reduxjs/toolkit";
import { getTitleListApi } from "./NAMEInjects/GetComicsHomePage";
import { getTitleApi } from "./NAMEInjects/GetComicsInfo";

export const store = configureStore({
    reducer: {
        [getTitleListApi.reducerPath]: getTitleListApi.reducer,
        [getTitleApi.reducerPath]: getTitleApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(getTitleListApi.middleware,getTitleApi.middleware)
})
