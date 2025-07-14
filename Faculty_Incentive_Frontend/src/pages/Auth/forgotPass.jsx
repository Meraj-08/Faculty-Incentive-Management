import { useState } from 'react';
import axios from 'axios';

const SERVER = import.meta.env.VITE_SERVER
function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${SERVER}/api/users/forgotPassword`, { email });
      
      if (response.data.success) {
        setMessage('Password reset email sent successfully.');
      } else {
        setMessage('Failed to send password reset email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setMessage('An error occurred while sending the email.');
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ForgotPassword;
