import {Route, Routes} from "react-router-dom";
import {Home} from "@/pages/home";
import {Data} from "@/pages/data";
import {Visualization} from "@/pages/visualization";
import {Docs} from "@/pages/docs";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/data" element={<Data/>}/>
            <Route path="/visualizations" element={<Visualization/>}/>
            <Route path="/documents" element={<Docs/>}/>
        </Routes>
    )
}

export {Router}
