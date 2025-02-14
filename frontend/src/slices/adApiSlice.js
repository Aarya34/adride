'/api/ads'

import {apiSlice} from './apiSlice';
import {ADS_URL} from '../constants';

export const adApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getAds: builder.query({
            query: () => ({
                url : ADS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        adAccept: builder.mutation({
            query: ({Id} ) => ({
                url: `${ADS_URL}/${Id}/active`,
                method: 'PUT',
            }),
        }),
        adReject: builder.mutation({
            query: ({Id} ) => ({
                url: `${ADS_URL}/${Id}/inactive`,
                method: 'PUT',
            }),
        }),
    })
});

export const {useGetAdsQuery, useAdAcceptMutation,useAdRejectMutation} = adApiSlice;