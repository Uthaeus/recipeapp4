import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../store/userContext";

import image from '../../assets/images/49er-thumb.png';

function MainNavigation() {
    const { user, isLoggedIn, logout } = useContext(UserContext);

    return (
        <nav className="main-navigation">
            <div className="main-navigation-left">
                <NavLink to="/" className={({ isActive }) => isActive ? 'main-nav-link active' : 'main-nav-link'}>Home</NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive ? 'main-nav-link active' : 'main-nav-link'}>Contact</NavLink>
            </div>

            <div className="main-navigation-right">
                { isLoggedIn ? <>
                    <Link to='/profile/edit'><img src={user?.image ? user.image : image} className="nav-profile-image" width={40} alt="profile" /></Link>
                    <p className="main-nav-link">Hello, {user.username ? user.username : 'anonymous'}</p>
                    <NavLink to="/recipe/new" className={({ isActive }) => isActive ? 'main-nav-link active' : 'main-nav-link'}>Create New Recipe</NavLink>
                    <Link to='/' onClick={logout} className="main-nav-link">Logout</Link>
                </> :
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