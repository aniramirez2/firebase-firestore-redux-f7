import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <>
      <div>Layout del home</div>
      <Outlet />
    </>
  );
}

export default Layout;
