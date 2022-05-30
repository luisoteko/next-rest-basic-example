import Footer from "./footer"
import Header from "./header"

const Layout = ({children}) => {
    return (
        <div className="layout">
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}
export default Layout