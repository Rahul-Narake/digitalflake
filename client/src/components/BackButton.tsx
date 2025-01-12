import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';

function BackButton({ name }: { name: string }) {
  const navigate = useNavigate();
  return (
    <div className="flex space-x-4 my-4 px-4">
      <span
        onClick={() => {
          navigate('/');
        }}
      >
        <ArrowLeft />
      </span>
      <h1 className="text-black font-bold text-xl">{name}</h1>
    </div>
  );
}

export default React.memo(BackButton);
