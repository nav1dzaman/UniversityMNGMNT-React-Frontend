import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../../../public/backg.jpg';
// import { useAuth } from './AuthProvider';
import { useAuth } from '../../auth/AuthProvider';
// import jwt_decode from "jwt-decode"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminLogin() {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading,Setloading]=useState(false);
  const [token,SetToken]=useState("")
  const navigate=useNavigate();
  const notify = () => toast.success("Successfully Logged In");
  const notifyError = errorName => toast.error(errorName);

  const handleSubmit = async (e) => {
    e.preventDefault();
  Setloading(true);
    console.log(email);

    axios.post('http://localhost:5050/auth/login', JSON.stringify({
        email,
        password,
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {

          if(response.data.jwt===""){
            notifyError("Inavalid Credentials")
            setError('Invalid email or password');
          }
          else{

            const decodedUser = jwtDecode(response.data.jwt)

              if(decodedUser.roles==="ADMIN"){
                // console.log(response.data.jwt)
                handleLogin(response.data.jwt)
                        notify()
                        navigate("/adminpanel")
              }
             
              else{


                notifyError("Inavalid Credentials")
                setError('Invalid email or password');

              }
            
          }
          
         

            

           
            console.log(decodedUser.roles);

          setError('');
        })
        .catch(err => {
          // setError('Invalid email or password');
          // notifyError("Internal Error")
        });
  
  };

  return (
    <div>
      <div
        className="flex h-screen w-full mb-[-24px] items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="rounded-xl bg-gray-800 bg-opacity-50 mt-[-35px] px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <img
                src="gorib.png"
                width="150"
                alt="Logo"
              />
              <h1 className="mb-2 text-2xl mt-3">ADMIN</h1>
              {/* <span className="text-gray-300">Forgot Password?</span> */}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="email"
                  placeholder="mail@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="password"
                  name="password"
                  placeholder="*********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
