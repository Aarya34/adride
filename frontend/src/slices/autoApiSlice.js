import {apiSlice} from './apiSlice';
import {AUTOWALA_URL} from '../constants';

export const autoApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getAutos: builder.query({
            query: () => ({
                url : AUTOWALA_URL,
            }),
            keepUnusedDataFor: 5,
        }),
    })
});

export const {useGetAutosQuery} = autoApiSlice;