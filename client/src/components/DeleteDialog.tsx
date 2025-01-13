import { TriangleAlert } from 'lucide-react';

function DeleteDialog({ onConfirm }: { onConfirm: () => any }) {
  return (
    <div className="flex flex-col">
      <div className="flex text-center">
        <TriangleAlert className="text-red-600" />
        <h1>Delete</h1>
      </div>
      <p className="text-sm text-gray-400 mb-4">
        Are you sure you want to delete?
      </p>

      <div className="flex space-x-2">
        <button className="border border-gray-600 rounded-full py-1 px-4">
          delete
        </button>
        <button
          className="bg-[#7c0089] text-slate-100 py-1 px-4 rounded-full"
          onClick={onConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default DeleteDialog;
