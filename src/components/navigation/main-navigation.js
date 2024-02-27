import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../store/userContext";

function MainNavigation() {
    const { user, logout } = useContext(UserContext);

    return (
        <nav className="main-navigation">
            <div className="main-navigation-left">
                <NavLink to="/" className={({ isActive }) => isActive ? 'main-nav-link active' : 'main-nav-link'}>Home</NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive ? 'main-nav-link active' : 'main-nav-link'}>Contact</NavLink>
            </div>

            <div className="main-navigation-right">
                { user ? <Link to='/' onClick={logout} className="main-nav-link">Logout</Link> :
                <>
                    <NavLink to="/login" className={({ isActive }) => isActive ? 'main-nav-link active' : 'main-nav-link'}>Login</NavLink>
                    <NavLink to="/signup" className={({ isActive }) => isActive ? 'main-nav-link active' : 'main-nav-link'}>Signup</NavLink>
                </>
                }
            </div>
        </nav>
    );
}

export default MainNavigation;