"use client"
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    letter: false,
    number: false,
    special: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      updatePasswordCriteria(value);
    }
  };

  // Update password criteria based on input
  const updatePasswordCriteria = (password) => {
    setPasswordCriteria({
      length: password.length >= 8 && password.length <= 265,
      letter: /[A-Za-z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password),
    });
  };

  // Check all criteria before submission
  const isPasswordValid = Object.values(passwordCriteria).every(Boolean);



   
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password criteria before submit
    if (!isPasswordValid) {
      alert("Please ensure all password criteria are met.");
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      

      if (data.success) {
        router.replace("/login");
        console.log('User registered successfully:', data.userAccount);
      } else {
         // Display Appwrite error message in an alert box if available
         const errorMessage = data.error?.response?.message || 'User registration failed';
         alert(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        
      <div className="mb-4">
          <label className="text-white">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-transparent p-2 rounded border border-gray-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="text-white">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-transparent p-2 rounded border border-gray-500"
          />
        </div>

        <div className="mb-4 relative">
          <label className="text-white">Password:</label>
          <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full bg-transparent p-2 rounded border border-gray-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
          >
            {showPassword ? '👁️' : '🙈'}
          </button>
          </div>

          {/* Password Criteria To-Do List */}
          <ul className="text-white mt-2">
            <li style={{ color: passwordCriteria.length ? 'green' : 'red' }}>
              {passwordCriteria.length ? '✔' : '✘'} At least 8-265 characters
            </li>
            <li style={{ color: passwordCriteria.letter ? 'green' : 'red' }}>
              {passwordCriteria.letter ? '✔' : '✘'} Contains a letter
            </li>
            <li style={{ color: passwordCriteria.number ? 'green' : 'red' }}>
              {passwordCriteria.number ? '✔' : '✘'} Contains a number
            </li>
            <li style={{ color: passwordCriteria.special ? 'green' : 'red' }}>
              {passwordCriteria.special ? '✔' : '✘'} Contains a special character (@$!%*?&)
            </li>
          </ul>

        </div>
        
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={!isPasswordValid}>
          Register
        </button>

      </form>
    </div>
  );
}