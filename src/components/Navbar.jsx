import Button from './Button';

function Navbar(){
    return(
        <nav>
            <ul>
                <li>Try/CATCH</li>
                <li>EVENT DETAILS</li>
                <li>SPONSORS</li>
                <li>FAQ</li>
                <li>SFU WICS</li>
                <li><Button text="REGISTER" type="navbar" /></li>
            </ul>
        </nav>
    );
}

export default Navbar;