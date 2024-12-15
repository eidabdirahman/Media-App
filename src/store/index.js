import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './slices/usersSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { albumsAPI} from './apis/albumsApi';
import { PhotosApi } from './apis/PhotosApi';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsAPI.reducerPath]: albumsAPI.reducer,
    [PhotosApi.reducerPath]: PhotosApi.reducer
  },
  middleware : (getDefaultmiddleware) => {
    return getDefaultmiddleware()
    .concat(albumsAPI.middleware)
    .concat(PhotosApi.middleware)
  }
});

setupListeners(store.dispatch)

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation} from './apis/albumsApi';

  export  { 
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation} from './apis/PhotosApi';  
