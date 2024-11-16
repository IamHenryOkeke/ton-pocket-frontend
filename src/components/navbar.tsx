import { GiWallet } from "react-icons/gi";
import { IoWalletOutline } from "react-icons/io5";
import { RiHome2Fill } from "react-icons/ri";
import { MdOutlineSettings } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="-ml-4 fixed w-full bottom-0 bg-white/90 border-t border-gray-300">
      <div className="flex justify-around items-center h-16">
        <NavItems href='/app/home'>
          <RiHome2Fill size={24} />
          <span className="text-xs">Home</span>
        </NavItems>
        <NavItems href='/app/invest'>
          <GoGraph size={24} />
          <span className="text-xs">Invest</span>
        </NavItems>
        <NavItems href='/app/pockets'>
          <GiWallet size={24} />
          <span className="text-xs">Pockets</span>
        </NavItems>
        <NavItems href='/app/wallet'>
          <IoWalletOutline size={24} />
          <span className="text-xs">Wallet</span>
        </NavItems>
        <NavItems href='/app/settings'>
          <MdOutlineSettings size={24} />
          <span className="text-xs">Settings</span>
        </NavItems>
      </div>
    </nav>
  );
}

function NavItems({ children, href }: { children: React.ReactNode, href: string }) {
  const location = useLocation();
  return (
    <Link to={href} className={`${location.pathname === href ? "text-primaryDark" : "text-black"} flex flex-col items-center`}>
      {children}
    </Link>
  )
}
