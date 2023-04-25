import {Router} from "../components/router";
import {Navbar} from "../components/navbar";
import {Footer} from "../components/footer";
import {Whitespace} from "../components/whitespace";
import { Container } from "react-bootstrap";
import "./App.module.css"

function App() {
    return (
        <>
            <Navbar/>
            <Router/>
            <Footer/>
        </>
    )
}

export default App
