import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Mail, Lock, Phone, User, Eye, EyeOff } from 'lucide-react';
function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    gender: 'M',
    password: '',
    showPassword: false,
  });

  const [errors, setErrors] = useState({});

  const toggleShowPassword = () =>
    setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      setErrors({ password: 'Password must be at least 8 characters long.' });
      return;
    }

    try {
      await registerUser({
        full_name: formData.full_name,
        email: formData.email,
        phone_number: formData.phone_number,
        gender: formData.gender,
        password: formData.password,
      });
      Swal.fire('Registered!', 'You have registered successfully.', 'success');
      navigate('/login');
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        Swal.fire('Error', 'Something went wrong.', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
 <div>
  
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <input
              name="full_name"
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
            {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name}</p>}
          </div>

        
          <div>
            <input
              name="phone_number"
              type="text"
              placeholder="Phone Number"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.phone_number}
              onChange={handleChange}
            />
            {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
          </div>

          <div>
            <select
              name="gender"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>

          <div className="relative">
            <input
              name="password"
              type={formData.showPassword ? 'text' : 'password'}
              placeholder="Password (min 8 characters)"
              className="w-full p-3 border rounded pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute top-3 right-3 text-gray-500 hover:text-indigo-600"
            >
              {formData.showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
