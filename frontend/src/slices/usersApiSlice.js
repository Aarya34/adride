import {apiSlice} from './apiSlice';
import {USERS_URL} from '../constants';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getUsers: builder.query({
            query: () => ({
                url : USERS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        makeActive: builder.mutation({
            query: ({Id} ) => ({
                url: `${USERS_URL}/${Id}/active`,
                method: 'PUT',
            }),
        }),
        makeInactive: builder.mutation({
            query: ({Id} ) => ({
                url: `${USERS_URL}/${Id}/inactive`,
                method: 'PUT',
            }),
        }),
    })
});

export const {useGetUsersQuery, useMakeActiveMutation,useMakeInactiveMutation} = usersApiSlice;