import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza/' }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => 'history',
            transformResponse: (response) => {
                console.log('Fetched Orders:', response); 
                return response;
            },
            providesTags: ['Orders'],
        }),
        createOrder: builder.mutation({
            query: (order) => ({
                url: 'order',
                method: 'POST',
                body: order,
            }),
            invalidatesTags: ['Orders'],
        }),
    }),
});

export const { useGetOrdersQuery, useCreateOrderMutation} = ordersApi;