import AddButton from './AddButton';
import SearchBox from './SearchBox';

function Header({
  name,
  logo,
  path,
}: {
  name: string;
  logo: React.ReactNode;
  path: string;
}) {
  return (
    <div className="flex justify-start items-start p-4 w-full">
      <div className="flex flex-row space-x-2 mr-4">
        <h1 className="text-gray-600">{logo}</h1>
        <span className="text-xl text-black font-bold">{name}</span>
      </div>
      <SearchBox />
      <span className="absolute right-2">
        <AddButton path={path} />
      </span>
    </div>
  );
}

export default Header;
