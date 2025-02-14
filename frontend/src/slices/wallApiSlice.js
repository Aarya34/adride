import {apiSlice} from './apiSlice';
import {WALLS_URL} from '../constants';

export const wallApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getWalls: builder.query({
            query: () => ({
                url : WALLS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getWallsById: builder.query({
            query: (id) => ({
                url : `${WALLS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),
    })
});

export const {useGetWallsQuery,useGetWallsByIdQuery} = wallApiSlice;