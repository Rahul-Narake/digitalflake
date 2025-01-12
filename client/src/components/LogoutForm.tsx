import axios from 'axios';
import { TriangleAlert } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';

function LogoutForm() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="flex text-center">
        <TriangleAlert className="text-red-600" />
        <h1>Log out</h1>
      </div>
      <p className="text-sm text-gray-300 mb-4">
        Are you sure you want to logout?
      </p>

      <div className="flex space-x-2">
        <button className="border border-gray-600 rounded-full py-1 px-4">
          delete
        </button>
        <button
          className="bg-[#7c0089] text-slate-100 py-1 px-4 rounded-full"
          onClick={async () => {
            await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`);
            navigate('/signin');
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default LogoutForm;
