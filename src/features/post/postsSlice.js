import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const postAdapter = createEntityAdapter({
  sortComparer: (a, b) =>{
    const dateA = a.createdAt || '';
    const dateB = b.createdAt || '';
    return dateB.localeCompare(dateA)}
});

const initialState = postAdapter.getInitialState();
const extendedapiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      transformResponse: (responsedata) => {
        const loadedposts = responsedata.map((posts) => {
          if (!posts?.date) posts.date = new Date().toISOString();
          if (!posts?.reactions)
            posts.reactions = {
              wow: 0,
              fire: 0,
              clapps: 0,
              lovely: 0,
              heart: 0,
              coffee: 0,
            };
          return posts;
        });
        return postAdapter.setAll(postAdapter.getInitialState(), loadedposts);
      },
      providesTags: (result, error, arg) => result?.ids? [
        { type: "POSTS", id: "LIST" },
        ...result.ids.map((id) => ({ type: "POSTS", id })),
      ]: [{ type: "POSTS", id: "LIST" }],
    }),

    getPostsByUserId: builder.query({
      query: (id) => `/posts/?userId=${id}`,
      transformResponse: (responsedata) => {
        const loadedPosts = responsedata.map((post) => {
          if (!post?.date) post.date = new Date().toISOString();
          if (!post?.reactions)
            post.reactions = {
              wow: 0,
              fire: 0,
              clapps: 0,
              lovely: 0,
              heart: 0,
              coffee: 0,
            };
          return post;
        });
        return postAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) => result?.ids?[
        ...result.ids.map((id) => ({ type: "POSTS", id })),
      ]: [{ type: "POSTS", id: "LIST" }],
    }),

    addNewPost: builder.mutation({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: {
          ...newPost,
          date: new Date().toISOString(),
          reactions: {
            wow: 0,
            fire: 0,
            clapps: 0,
            lovely: 0,
            heart: 0,
            coffee: 0,
          },
        },
      }),
      invalidatesTags: [{ type: "POSTS", id: "LIST" }],
    }),

    updatePost: builder.mutation({
      query: updatedPost=>({
        url: `/posts/${updatedPost.id}`,
        method: 'PATCH',
        body:{
          ...updatedPost,
          date: new Date().toISOString()
        }
      }),
      invalidatesTags: (result,error,arg)=>[
        {type: 'POSTS', id: arg.id}
      ]
    }),
    deletePost: builder.mutation({
      query:(id)=>({
        url: `/posts/${id}`,
        method: 'DELETE',
        body: id
      }),
      invalidatesTags: (result,error,arg)=>[
        {type:'POSTS',id:arg}
      ]
    }),
    addReaction: builder.mutation({
      query:({reactions,postId})=>({
        url: `/posts/${postId}`,
        method: 'PATCH',
        body: {
          reactions
        }
      }),
      async onQueryStarted({postId,reactions},{dispatch,queryFulfilled}){
        const patchResult = dispatch(
          extendedapiSlice.util.updateQueryData('getPosts', undefined, draft=>{
            if(!draft || !draft.entities) return
            const post = draft?.entities[postId]
            console.log(post)
            if(post) post.reactions = reactions
          })
        )
        try{
          await queryFulfilled
        }catch{
          patchResult.undo()
        }
      }
    })
  }),
});

console.log(extendedapiSlice)

export const{
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddReactionMutation
} = extendedapiSlice;

export const selectPostsResult = extendedapiSlice.endpoints.getPosts.select();
const selectPostsData = createSelector(selectPostsResult,
  postsResult=>postsResult?.data ?? initialState
)

export const {
  selectAll: selectAllPosts,
  selectIds: selectids,
  selectById: selectPostbyId,
} = postAdapter.getSelectors((state) => selectPostsData(state) ?? initialState);