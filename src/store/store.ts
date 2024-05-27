import { configureStore } from "@reduxjs/toolkit";
import { getTitleListApi } from "./NAMEInjects/GetComicsHomePage";
import { getTitleApi } from "./NAMEInjects/GetComicsInfo";
import { getChapterListApi } from "./NAMEInjects/GetChapterList";
import { getChapterApi } from "./NAMEInjects/GetChapter";

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
