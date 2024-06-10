import { TopTitleList } from "../../components/types/TitleListInterface";// Подключаем правильные типы
import { baseApi } from "../../components/utils/baseUrl";

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComicsTopList: builder.query<TopTitleList, void>({
      query: () => ({
        url: 'api/top-titles/'
      })
    })
  })    
});

export const {  
    useGetComicsTopListQuery
} = api;