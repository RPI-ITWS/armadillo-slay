import React, {useState} from "react";
import {Whitespace} from "../whitespace/Whitespace";
import styles from "./Searchbar.module.css";

function Searchbar() {

    const [loc, setLoc] = useState("");

    return (
        <div style={{display: "flex", justifyContent: "space-around"} }>
            <input
                id="search-location-input"
                placeholder="Search Location"
                style={
                    {
                        flexGrow: "4",
                        border: "none",
                        borderBottom: "1px solid black",
                        outline: "none",
                        fontSize: "1.5em",
                        borderRadius:"5px",
                        paddingLeft: "1em"
                    }
                }

            />
            <Whitespace height={"1em"} width={"1em"}/>
            <button style={{flexGrow: "2", color: "whitesmoke"}}>Search</button>
        </div>
    )
}

export {
    Searchbar
}