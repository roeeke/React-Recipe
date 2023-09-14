import './Nav.css'
import { Outlet } from 'react-router-dom'
export default function Navbar() {
    return(
        <div id='navbar'>
    <nav className="nav">
        <h1 className='navh1'><a href="/Home">home</a></h1>
        <ul className='navul'>
            <li className='navli'><a href="/Favorits ">favorits</a></li>
            <li className='navli'><a href="/About">about</a></li>
        </ul>
    </nav>
    <Outlet />
    </div>
    )
} 