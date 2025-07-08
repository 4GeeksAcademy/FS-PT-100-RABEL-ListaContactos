import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
    const { pathname } = useLocation();

    return (
        <nav className="navbar navbar-light bg-light mb-3">
            <div className="container">
                <Link className="navbar-brand" to="/">Contact App</Link>

                {pathname !== "/add-contact" && (
                    <Link className="btn btn-success" to="/add-contact">
                         Agregar contacto
                    </Link>
                )}
            </div>
        </nav>
    );
};
