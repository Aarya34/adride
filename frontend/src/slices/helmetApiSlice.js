import {apiSlice} from './apiSlice';
import {HELMETWALA_URL} from '../constants';

export const helmetApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getHelmets: builder.query({
            query: () => ({
                url : HELMETWALA_URL,
            }),
            keepUnusedDataFor: 5,
        }),
    })
});

export const {useGetHelmetsQuery} = helmetApiSlice;