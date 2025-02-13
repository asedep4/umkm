import { Navbar } from "flowbite-react";

const Header = () => {
  return (
    <>
      <Navbar fluid className="sticky top-0 z-50 bg-[#7c458c]">
        <Navbar.Brand href="/">
          <img src="/umkm_putih.png" className="h-14" alt="Logo Web UMKM" />
          {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite React
          </span> */}
        </Navbar.Brand>
        <Navbar.Toggle className="bg-[#d2a5df] text-white" />
        <Navbar.Collapse>
          <Navbar.Link className="text-white" href="/">
            Home
          </Navbar.Link>
          <Navbar.Link className="text-white" href="/about">
            About
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
