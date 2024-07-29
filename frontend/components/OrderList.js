import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetOrdersQuery } from '../state/ordersApi';
import { toggleSizeFilter } from '../state/ordersSlice';

export default function OrderList() {
  const { data: orders, isLoading: ordersLoading, isFetching: ordersRefreshing, error } = useGetOrdersQuery();

  const filterSize = useSelector(state => state.ordersState.filterSize);
  const dispatch = useDispatch();

  const handleSizeFilterChange = (size) => {
    dispatch(toggleSizeFilter(size));
  };

  return (
    <div id="orderList">
      <h2>Pizza Orders {(ordersLoading || ordersRefreshing) && 'loading...'}</h2>
      <ol>
        {
          ordersLoading ? 'loading...' :
          orders?.filter(order => filterSize === 'All' || order.size === filterSize)
          .map(order => (
            <li key={order.id}>
              <div>
                <div>{order.customer} ordered a size {order.size} with {order.toppings?.length > 0 ? `${order.toppings.length} toppings` : 'no toppings'}</div>
              </div>
            </li>
          ))
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === 'All' ? ' active' : ''}`;
            return (
              <button
                data-testid={`filterBtn${size}`}
                className={className}
                onClick={() => handleSizeFilterChange(size)}
                key={size}>
                {size}
              </button>
            );
          })
        }
      </div>
    </div>
  );
}