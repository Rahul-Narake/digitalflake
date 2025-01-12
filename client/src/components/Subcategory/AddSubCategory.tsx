import { useRef, useState } from 'react';
import BackButton from '../BackButton';
import Footer from '../Footer';
import InputBox from '../InputBox';
import { useNavigate } from 'react-router';

function AddSubcategory() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profile, setProfile] = useState<File | null>(null);
  const fileTypes = ['image/jpeg', 'image/png'];
  const [profilePic, setProfilePic] = useState<string | null>('');
  const navigate = useNavigate();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && fileTypes.includes(file.type) && file.size <= 1000000) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
      setProfile(file);
    } else {
      alert(
        'File format not supported, should be JPEG/PNG and size shoUld be less than 1 MB'
      );
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className="flex flex-col w-full h-[85vh]">
      <div className="mb-8">
        <BackButton name="Add Subcategory" />
      </div>
      <form className="flex justify-start p-4">
        <InputBox
          type="text"
          name="subcategory"
          onchange={() => {}}
          placeholder="Subcategory Name"
        />
        <div className="flex flex-col w-[200px] border border-gray-[2px] p-2 rounded-lg h-[50px] ml-2">
          <select name="category" id="category" className="w-full">
            <option value="">name</option>
            <option value="">name</option>
            <option value="">name</option>
          </select>
        </div>
        <div className="flex items-center justify-start mx-2">
          <div className="flex items-center justify-center flex-col w-[150px] h-[150px]">
            <div
              className="w-[150px] h-[150px] rounded-md bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden relative border-2 border-gray-300"
              onClick={handleClick}
            >
              {profilePic ? (
                <img
                  src={profilePic}
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
      <Footer />
    </div>
  );
}

export default AddSubcategory;
