import { StepForward } from 'lucide-react';
import { TSidebarComponent } from './Sidebar';
import { useLocation, useNavigate } from 'react-router';

function SidebarComponent({ data }: { data: TSidebarComponent }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      className={`flex items-center justify-between w-full cursor-pointer p-2 ${
        location.pathname == data.path ? 'bg-yellow-200 rounded-md' : ''
      }`}
      onClick={() => {
        navigate(data.path);
      }}
    >
      <div className="flex justify-start space-x-2">
        <>{data.icon}</>
        <span>{data.name}</span>
      </div>
      <span>
        <StepForward
          className={`${
            location.pathname == data.path ? 'text-black' : 'text-gray-500'
          }`}
        />
      </span>
    </div>
  );
}

export default SidebarComponent;
