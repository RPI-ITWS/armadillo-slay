import React, {useEffect, useState} from "react";

export default function SearchFeatureContainer(){

  const [loc,setLoc] = useState("")




    return(
        <div>
            <input
              style={{
                width: "500px",
                height: "50px",
                fontSize: "20px",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#f2f2f2",
                color: "#333",
            }}
              type="text"
              placeholder="Search for a feature"
              onChange={(e) => {
                setLoc(e.target.value);
              }}
            />
        </div>
    )
}