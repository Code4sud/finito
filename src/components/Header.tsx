import { useNavigate } from 'react-router-dom';
import { Bug } from 'lucide-react';
import logo from "/guide_images/logo.svg";
import burgerIcon from "/guide_images/burger-icon.svg";
import { X } from "lucide-react";
import "./header.css";

import { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const isEventFinished = true;

  useEffect(() => {
    if (isOpen) {
      document.body.classList.toggle("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]);

  const menuItems = [
    {
        id: "01",
        label: 'Accueil',
        href: '/'
    },
    {
        id: "02",
        label: 'Alerte',
        href: '/alert'
    },
    {
        id: "03",
        label: 'guide des bonnes pratiques',
        href: '/guide'
    },
    {
        id: "04",
        label: 'Carte',
        href: '/carte'
    }

]

  const menuItemsWithoutWinners = menuItems.filter(
    (item) => item.label !== "Les vainqueurs du Hackathon"
  );
  return (
    <header>
        <nav className='container-header flex justify-between w-full'>
            <a href='/' className='cursor-pointer w-1/7 logo-header '>
            <img src={logo} alt="code4sud logo" className='w-full self-start ' />
            </a>
            <div className="flex items-center gap-2">
              <Bug className="h-8 w-8 text-amber-500" />
              <h1 className="text-3xl font-bold text-yellow-800 cursor-pointer" onClick={() => navigate('/')}>Bee Attentive</h1>
            </div>
            <div>
                <button onClick={toggleDrawer} className='cursor-pointer bg-transparent w-fit h-full flex items-center justify-end  menu-burger'>
                    <img src={burgerIcon} alt="menu burger" className='w-[32px] ' />
                </button>
                <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction='right'
                    className='!w-full h-screen !bg-[#fff375] border border-[#fff375] content-sheet'
                >
                    <button className='absolute top-4 z-50  bg-[transparent] right-5' onClick={toggleDrawer}>
                        <X className='text-white' size={40} color='black' />
                    </button>
                    <div className='text-white flex justify-center items-center h-screen'>
                        <ul className='flex flex-col gap-10'>
                            {isEventFinished ? (
                                menuItems.map((item) => (
                                    <li key={item.id}  className="flex items-start gap-2" ><span className='font-[Open_Sans] text-xl  text-red-500'>{item.id} </span><a href={item.href} className='text-4xl  font-[Anton] tracking-wide flex items-start gap-2 text-black hover:underline' onClick={toggleDrawer}>{item.label}</a></li>
                                ))
                            ) : (
                                menuItemsWithoutWinners.map((item) => (
                                    <li className="flex items-start gap-2" key={item.id}><span className='font-[Open_Sans] text-md text-red-500'>{item.id} </span><a href={item.href} className='text-4xl  font-[Anton] tracking-wider flex items-start gap-2 text-black !hover:text-black ' onClick={toggleDrawer}>{item.label}</a></li>
                                ))
                            )}
                        </ul>
                    </div>
                </Drawer>
            </div>
        </nav>
    </header>
  );
}
