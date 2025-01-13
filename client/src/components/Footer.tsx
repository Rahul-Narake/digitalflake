function Footer({
  onclick,
  loading,
}: {
  onclick: (e: any) => any;
  loading: boolean;
}) {
  return (
    <div className="flex absolute bottom-2 w-[80vw]">
      <div className="right-2 absolute flex space-x-2">
        <button className=" bg-gray-300 rounded-full py-2 px-8">Cancel</button>
        <button
          disabled={loading}
          className="bg-[#7c0089] rounded-full py-2 px-8 text-gray-50"
          onClick={onclick}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Footer;
