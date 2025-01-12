function InputBox({
  name,
  placeholder,
  onchange,
  type,
}: {
  name: string;
  placeholder: string;
  onchange: () => any;
  type: string;
}) {
  return (
    <div className="flex flex-col w-[200px] border border-gray-[2px] p-2 rounded-lg h-[50px]">
      <input
        type={type}
        id={name}
        name={name}
        className="outline-none border-none"
        placeholder={placeholder}
        onChange={onchange}
      />
    </div>
  );
}

export default InputBox;
