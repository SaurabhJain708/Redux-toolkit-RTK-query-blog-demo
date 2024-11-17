import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";


const userAdapter = createEntityAdapter()

const initialState = userAdapter.getInitialState()

const extendedapislice = apiSlice.injectEndpoints({
  endpoints: (builder)=>({
    getUsers: builder.query({
      query: ()=>"/users",
      transformResponse: (response) => {
        return userAdapter.setAll(initialState, response);
      },
      providesTags: (result,arg,err)=> result?.ids?[
        {type:"USERS", id:"LIST"}, ...result.ids.map((id)=>({type:"USERS",id}))
      ]:[{type:"USERS",id:"LIST"}]

    })
  })
})

export const {useGetUsersQuery} = extendedapislice
export const selectUserResult= extendedapislice.endpoints.getUsers.select();
export const selectUserData = createSelector(
  selectUserResult,userResult=>userResult?.data ?? initialState
)
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
} = userAdapter.getSelectors((state)=>selectUserData(state)?? initialState)