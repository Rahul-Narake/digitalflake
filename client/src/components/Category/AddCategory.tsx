import { useRef, useState } from 'react';
import BackButton from '../BackButton';
import Footer from '../Footer';
import useAddCategory from '@/hooks/useAddCategory';

function AddCategory() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [image, setImage] = useState<string | null>('');
  const fileTypes = ['image/jpeg', 'image/png'];
  const { addCategory, loading } = useAddCategory();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && fileTypes.includes(file.type) && file.size <= 2000000) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setCategoryImage(file);
    } else {
      alert(
        'File format not supported, should be JPEG/PNG and size shoUld be less than 2 MB'
      );
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !categoryImage) {
      return;
    }

    const category = await addCategory({ name, categoryImage });
    if (category) {
      setName('');
      setCategoryImage(null);
      setImage('');
    }
  };

  return (
    <div className="flex flex-col w-full h-[85vh]">
      <div className="mb-8">
        <BackButton name="Add category" />
      </div>
      <form className="flex justify-start p-4">
        <div className="flex flex-col w-[200px] border border-gray-[2px] p-2 rounded-lg h-[50px]">
          <input
            type="text"
            id={name}
            name={name}
            value={name}
            className="outline-none border-none"
            placeholder={'Category Name'}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-start mx-2">
          <div className="flex items-center justify-center flex-col w-[150px] h-[150px]">
            <div
              className="w-[150px] h-[150px] rounded-md bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden relative border-2 border-gray-300"
              onClick={handleClick}
            >
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-sm">Upload</span>
              )}
            </div>

            <div
              className="w-[150px] h-[50px] flex items-center justify-center cursor-pointer overflow-hidden relative"
              onClick={handleClick}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept={`image/*`}
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
        <div className="w-[150px] h-[115px] border border-gray-[1px] rounded-md flex items-center justify-center text-sm">
          Upload maximum allowed size is 2 MB
        </div>
      </form>
      <Footer onclick={handleSubmit} loading={loading} />
    </div>
  );
}

export default AddCategory;
