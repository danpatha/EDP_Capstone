import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">about</Link>
                    </li>
                    <li>
                        {/* <Link to="/c">Contact</Link> */}
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;