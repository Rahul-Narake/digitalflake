import Logo from './Logo';

function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center w-full bg-[#7c0089] p-2">
      <Logo />
      <div>{children}</div>
    </div>
  );
}

export default Navbar;
