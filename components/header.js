import Link from "next/link"
import Image from "next/image"
import { logout } from "../service/authService"
import { useRouter } from "next/router"

const Header = () => {
    const logo = '/logo.png'
    const router = useRouter()
    const onLogout = () => {
        logout();
        router.push('/login')
    }
    const isLogged = typeof window !== "undefined" && localStorage.getItem('token')
    const user = typeof window !== "undefined" && JSON.parse(localStorage.getItem('user'))
    return (
        <header>
            <div className="container">
                <nav className="navbar">
                    <Link href="/">
                        <a className="brand-logo">
                            <Image src={logo} width={100} height={100} alt="logo"/>
                        </a>
                    </Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </li> 
                        {
                            isLogged ?
                            <>
                                <li>
                                    <a onClick={onLogout} className="color-blue-500 hover:cursor-pointer">Logout</a>
                                </li> 
                                <li>
                                    <span>{user && user.username}</span>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <Link href="/login">
                                        <a>Login</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/register">
                                        <a>Sign Up</a>
                                    </Link>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    )
}
export default Header;
