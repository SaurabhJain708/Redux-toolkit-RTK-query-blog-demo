import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const apiURI = process.env.API_URI
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: apiURI }),
    tagTypes: ['POSTS','USERS'],
    endpoints: builder=>({})
})