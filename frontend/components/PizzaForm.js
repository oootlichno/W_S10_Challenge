import React, { useReducer, useState } from 'react';
import { useCreateOrderMutation } from '../state/ordersApi';

const CHANGE_INPUT = 'CHANGE_INPUT';
const TOGGLE_TOPPING = 'TOGGLE_TOPPING';
const RESET_FORM = 'RESET_FORM';

const initialFormState = {
  fullName: '',
  size: '',
  toppings: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    }
    case TOGGLE_TOPPING: {
      const { topping } = action.payload;
      const newToppings = state.toppings.includes(topping)
        ? state.toppings.filter(t => t !== topping)
        : [...state.toppings, topping];
      return { ...state, toppings: newToppings };
    }
    case RESET_FORM:
      return initialFormState;
    default:
      return state;
  }
};

export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialFormState);
  const [error, setError] = useState('');
  const [createOrder, { isLoading: creatingOrder }] = useCreateOrderMutation();

  const onChange = ({ target: { name, value } }) => {
    dispatch({ type: CHANGE_INPUT, payload: { name, value } });
    setError('');  
  };

  const onToppingChange = ({ target: { name } }) => {
    dispatch({ type: TOGGLE_TOPPING, payload: { topping: name } });
  };

  const resetForm = () => {
    dispatch({ type: RESET_FORM });
    setError('');  
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { fullName, size, toppings } = state;

    if (!fullName) {
      setError('fullName is required');
      return;
    }
    if (!['S', 'M', 'L'].includes(size)) {
      setError('Size must be one of the following values: S, M, L');
      return;
    }

    createOrder({ fullName, size, toppings })
      .unwrap()
      .then(() => {
        resetForm();
      })
      .catch((err) => {
        setError('Order failed: ' + err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {creatingOrder && <div className='pending'>Order in progress...</div>}
      {error && <div className='error'>{error}</div>}
      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={state.fullName}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select 
            data-testid="sizeSelect" 
            id="size" 
            name="size" 
            value={state.size}
            onChange={onChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>
      <div className="input-group">
        <label>
          <input 
            data-testid="checkPepperoni" 
            name="1" 
            type="checkbox" 
            checked={state.toppings.includes('1')}
            onChange={onToppingChange}
          />
          Pepperoni<br />
        </label>
        <label>
          <input 
            data-testid="checkGreenpeppers" 
            name="2" 
            type="checkbox" 
            checked={state.toppings.includes('2')}
            onChange={onToppingChange}
          />
          Green Peppers<br />
        </label>
        <label>
          <input 
            data-testid="checkPineapple" 
            name="3" 
            type="checkbox" 
            checked={state.toppings.includes('3')}
            onChange={onToppingChange}
          />
          Pineapple<br />
        </label>
        <label>
          <input 
            data-testid="checkMushrooms" 
            name="4" 
            type="checkbox" 
            checked={state.toppings.includes('4')}
            onChange={onToppingChange}
          />
          Mushrooms<br />
        </label>
        <label>
          <input 
            data-testid="checkHam" 
            name="5" 
            type="checkbox" 
            checked={state.toppings.includes('5')}
            onChange={onToppingChange}
          />
          Ham<br />
        </label>
      </div>
      <button 
        data-testid="submit"
        type="submit">
        Submit
      </button>
    </form>
  );
}
