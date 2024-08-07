import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarDropdown = ({ item }: any) => {
  const pathname = usePathname();

  return (
    <>
      <ul className="mt-3 flex flex-col gap-2.5 pl-6">
        {item.map((item: any, index: number) => (
          <li key={index}>
            <Link
              href={item.route}
              className={`group relative flex items-center gap-2.5 rounded-md px-4 py-1.5 text-[#7184ab] duration-300 ease-in-out ${pathname === item.route ? "text-[#e3ebff]" : ""
                }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" className={`fill-current ${pathname == item.route ? 'scale-[1.7]' : ''}`} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="none" className='fill-current'></path> </g></svg>
              <span className={`text-sm ${pathname === item.route ? 'font-medium' : ''}`}>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarDropdown;
