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
    })
});

export const {useGetWallsQuery} = wallApiSlice;