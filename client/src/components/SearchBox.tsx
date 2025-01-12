import { Search } from 'lucide-react';
import React from 'react';

function SearchBox() {
  return (
    <div className="border border-gray[2px] w-[500px] flex items-center p-1 rounded-lg">
      <Search className="text-gray-400" />
      <input type="text" className="border-none w-full h-full" />
    </div>
  );
}

export default SearchBox;
