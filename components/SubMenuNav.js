const SubMenuNav = () => {
  return (
    <nav className="hidden sm:hidden medium:block large:block xl:block p-6 bg-zinc-300 max-md:p-5">
      <ul className="flex gap-10 items-center max-sm:flex-col max-sm:gap-2.5 max-sm:w-full">
        <li>
          <button className="text-nowrap text-2xl cursor-pointer text-neutral-700 max-sm:text-center">
            About Itan
          </button>
        </li>
        <li>
          <button className="text-2xl cursor-pointer text-neutral-700 max-sm:text-center">
            Publish
          </button>
        </li>
        <li>
          <button className="text-2xl cursor-pointer text-neutral-700 max-sm:text-center">
            Monetize
          </button>
        </li>
        <li>
          <button className="text-2xl cursor-pointer text-neutral-700 max-sm:text-center">
            Help
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SubMenuNav;
