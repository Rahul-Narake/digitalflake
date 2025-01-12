import { useNavigate } from 'react-router';

function AddButton({ path }: { path: string }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(path);
      }}
      className="bg-[#7c0089] px-3  py-1 rounded-lg text-gray-50"
    >
      Add New
    </button>
  );
}

export default AddButton;
