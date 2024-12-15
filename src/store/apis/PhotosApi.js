import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const PhotosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags : (result, error, album) =>{
            const tag = result.map((album) => {
             return {type: 'Photo', id: album.id}
            });
            tag.push({type: "albumPhoto", id: album.id});
            return tag;
         },
        query: (album) => {
            return {
          url: "/photos",
          params: { 
            albumId: album.id 
        },
          method: "GET",
        }
    },
      }),
      AddPhoto: builder.mutation({
        invalidatesTags: (result, error, album) =>{
            return [{type: 'albumPhoto', id: album.id}]
        },
        query: (album) => {
            return {
          url: "/photos",
          method: "POST",
          body: {
            albumId: album.id,
            url: faker.image.nature(150, 150, true),  
          },
        }
    },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) =>{
            return [{type: 'Photo', id: photo.id}]
        },
        query: (photo) => {
            return {
          url: `/photos/${photo.id}`,
          method: 'DELETE',
        }
    },
      }),
    };
  },
});

export const { 
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation} = PhotosApi;
export { PhotosApi };
