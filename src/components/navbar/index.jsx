const Navbar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between mx-auto max-w-[1024px] py-5">
        <div className="font-mono font-bold">FlyEasy</div>
        <div className="flex items-center gap-2">
          <button className="py-2 px-3 rounded">Flight Reservation</button>
          <button className="py-2 px-3 rounded">About</button>
          <button className="py-2 px-3 rounded">FAQ</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
