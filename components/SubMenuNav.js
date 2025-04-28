import Link from "next/link";
import { usePathname } from "next/navigation";

const SubMenuNav = ({ styles }) => {
  const pathname = usePathname();

  return (
    <div className={styles}>
      <nav className="hidden sm:hidden medium:block large:block xl:block p-6 xl:pl-10 medium:pl-10 bg-zinc-300 max-md:p-5">
        <ul className="flex gap-10 items-center max-sm:flex-col max-sm:gap-2.5 max-sm:w-full">
          <li>
            <Link
              href="/"
              className="relative text-nowrap text-2xl cursor-pointer text-neutral-700 max-sm:text-center"
            >
              About
              <span
                className={`absolute left-0 bottom-0 h-[3px] bg-[#EF5353] transition-all duration-300 ${pathname === "/" ? "w-full" : "w-0"}`}
              />
            </Link>
          </li>
          <li>
            <Link
              href="/publish"
              className="relative text-nowrap text-2xl cursor-pointer text-neutral-700 max-sm:text-center"
            >
              Publish
              <span
                className={`absolute left-0 bottom-0 h-[3px] bg-[#EF5353] transition-all duration-300 ${pathname === "/publish" ? "w-full" : "w-0"}`}
              />
            </Link>
          </li>
          <li>
            <Link
              href="/monetize"
              className="relative text-nowrap text-2xl cursor-pointer text-neutral-700 max-sm:text-center"
            >
              Monetize
              <span
                className={`absolute left-0 bottom-0 h-[3px] bg-[#EF5353] transition-all duration-300 ${pathname === "/monetize" ? "w-full" : "w-0"}`}
              />
            </Link>
          </li>
          <li>
            <Link
              href="/help"
              className="relative text-nowrap text-2xl cursor-pointer text-neutral-700 max-sm:text-center"
            >
              Help
              <span
                className={`absolute left-0 bottom-0 h-[3px] bg-[#EF5353] transition-all duration-300 ${pathname === "/help" ? "w-full" : "w-0"}`}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SubMenuNav;
