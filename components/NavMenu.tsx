import { MenuItemsContext } from 'lib/providers/MenuItemsProvider';
import Link from 'next/link';
import { useContext } from 'react';

export interface MenuItem {
  name: string,
  url: string
}

const NavMenu = () => {
  const menuItems = useContext(MenuItemsContext);

  return (
    <ul className="list-reset lg:flex justify-end flex-1 items-center space-x-2 lg:mr-4">
      <li>
        <Link legacyBehavior prefetch={false} href="/">
          <a className="inline-block py-2 px-4 text-black font-bold no-underline">Home</a>
        </Link>
      </li>
      {menuItems.map(menuItem => {
        return (<li key={menuItem.name}>
         <Link legacyBehavior prefetch={false} href={menuItem.url}>
           <a className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4">
             {menuItem.name} 
           </a>
         </Link>
       </li>)
      })}      
    </ul>
  );
}

export default NavMenu;
