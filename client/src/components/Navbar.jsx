import React from "react";




const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center  items-center">
      
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Epicno","about"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
       
      </ul>
     
    </nav>
  );
};

export default Navbar;
