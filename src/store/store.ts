import { configureStore } from "@reduxjs/toolkit";
import { getTitleListApi } from "./dreamLibInjects/GetComicsHomePage";
import { getTitleApi } from "./dreamLibInjects/GetComicsInfo";
import { getChapterListApi } from "./dreamLibInjects/GetChapterList";
import { getChapterApi } from "./dreamLibInjects/GetChapter";

export const store = configureStore({
    reducer: {
        [getTitleListApi.reducerPath]: getTitleListApi.reducer,
        [getTitleApi.reducerPath]: getTitleApi.reducer,
        [getChapterListApi.reducerPath]: getChapterListApi.reducer,
        [getChapterApi.reducerPath]: getChapterApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(getTitleListApi.middleware,getTitleApi.middleware,getChapterListApi.middleware,getChapterApi.middleware)
})
