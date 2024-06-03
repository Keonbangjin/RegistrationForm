import React, { useReducer } from 'react';
import { useForm } from 'react-hook-form';
import './RegistrationForm.css';

const initialState = {
  username: '',
  email: '',
  password: '',
  age: '',
  address: { country: '', city: '' },
  phones: ['+998999999', '+99899000000']
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'UPDATE_NESTED_FIELD':
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          [action.nestedField]: action.value
        }
      };
    case 'UPDATE_PHONE':
      const newPhones = [...state.phones];
      newPhones[action.index] = action.value;
      return {
        ...state,
        phones: newPhones
      };
    default:
      return state;
  }
};

const RegistrationForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log('Form Data:', data);
  };

  const handleChange = (field, value) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  };

  const handleNestedChange = (field, nestedField, value) => {
    dispatch({ type: 'UPDATE_NESTED_FIELD', field, nestedField, value });
  };

  const handlePhoneChange = (index, value) => {
    dispatch({ type: 'UPDATE_PHONE', index, value });
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              {...register('username', { required: 'Username kiriting' })}
              value={state.username}
              onChange={(e) => handleChange('username', e.target.value)}
            />
            {errors.username && <span>{errors.username.message}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email kiriting', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
              value={state.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              {...register('password', { required: 'Parolni kiriting', minLength: { value: 6, message: "Kamida 6 ta belgi bo'lsin" } })}
              value={state.password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              {...register('age', { required: 'Yoshni kiritmadingiz', min: { value: 0, message: "Yosh musbat son bo'lsin"}, max: { value: 120, message: 'Age must be less than or equal to 120' } })}
              value={state.age}
              onChange={(e) => handleChange('age', e.target.value)}
            />
            {errors.age && <span>{errors.age.message}</span>}
          </div>

          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              {...register('address.country', { required: 'Davlatni kiriting' })}
              value={state.address.country}
              onChange={(e) => handleNestedChange('address', 'country', e.target.value)}
            />
            {errors.address?.country && <span>{errors.address.country.message}</span>}
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              {...register('address.city', { required: 'Shaharni kiriting' })}
              value={state.address.city}
              onChange={(e) => handleNestedChange('address', 'city', e.target.value)}
            />
            {errors.address?.city && <span>{errors.address.city.message}</span>}
          </div>

          <div className="form-group">
            <label>Phone 1</label>
            <input
              type="text"
              {...register('phones.0', { required: 'Telefon raqamni kiriting', minLength: { value: 10, message: 'Phone number must be at least 10 characters' } })}
              value={state.phones[0]}
              onChange={(e) => handlePhoneChange(0, e.target.value)}
            />
            {errors.phones?.[0] && <span>{errors.phones[0].message}</span>}
          </div>

          <div className="form-group">
            <label>Phone 2</label>
            <input
              type="text"
              {...register('phones.1', { required: 'Raqam kiriting', minLength: { value: 10, message: 'Phone number must be at least 10 characters' } })}
              value={state.phones[1]}
              onChange={(e) => handlePhoneChange(1, e.target.value)}
            />
            {errors.phones?.[1] && <span>{errors.phones[1].message}</span>}
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
