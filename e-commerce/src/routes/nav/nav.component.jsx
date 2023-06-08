import { Link, Outlet } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as CrownLogo} from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { useContext } from "react";
import './nav.styles.scss'

import { signOutUser } from "../../utils/firebase/firebase.utils";

const Nav = () => {

    const {currentUser,setCurrentUser} = useContext(UserContext);
    

    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
    }
    return(
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <div>
                        <CrownLogo className="logo"/>
                    </div>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        Shop
                    </Link>
                    
                {!currentUser 
                    ? ( 
                        <Link className="nav-link" to="/auth">
                            Sign In
                        </Link>
                       ) 
                    : (<span className="nav-link" onClick={signOutHandler}>Sign Out</span>)
                }
               </div>
            </div>
            <Outlet/> 
        </Fragment>
    )
  
}

export default Nav;