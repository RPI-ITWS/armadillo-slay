import {Router} from "@/components/router";
import {Navbar} from "@/components/navbar";
import {Footer} from "@/components/footer";
import {Whitespace} from "@/components";

function App() {
    return (
        <>
            <Navbar/>
            <Whitespace height={"5em"}/>
            <Router/>
            <Footer/>
        </>
    )
}

export default App
