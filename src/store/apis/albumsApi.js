import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";


// DEV ONLY!!!
const pause = (duration) => {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  };

const albumsAPI = createApi({
    reducerPath: "albums",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        fetchFn: async(...args) =>{
            await pause(1000)
            return fetch(...args);
        }
    }),
    endpoints(builder) {
        return {
            removeAlbum : builder.mutation({
                invalidatesTags : (result, error, album) => {
                    return [{type: 'Album', id: album.id}]
                },
                query: (album) =>{
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE',
                    }
                }

            }),
            addAlbum : builder.mutation({
                invalidatesTags: (result, error, user) =>{
                    return [{type: 'usersAlbums', id: user.id}]
                },
                query: (user) => {
                   return  {
                    url: '/albums',
                    method: 'POST',
                    body: {
                        userId : user.id,
                        title: faker.commerce.productName()
                    }
                   }
                }
            }),
            fetchAlbums: builder.query({
                providesTags : (result, error, user) =>{
                   const tag = result.map((album) => {
                    return {type: 'Album', id: album.id}
                   });
                   tag.push({type: "usersAlbums", id: user.id});
                   return tag;
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        params: {
                            userid: user.id
                        },
                        method: 'GET'
                    };
                }
            })
        };
    }
});

export const { 
    useFetchAlbumsQuery,
    useAddAlbumMutation,
    useRemoveAlbumMutation } = albumsAPI;
export { albumsAPI };
