import Link from "next/link"
import Image from "next/image"

const Header = () => {
    const logo = '/logo.png'
    return (
        <header>
            <Link href="/">
                <Image alt="logo" src={logo} width={100} height={100}/>
            </Link>
        </header>
    )
}
export default Header;
