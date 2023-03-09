import {Container, Row} from "react-bootstrap";
import {Searchbar} from "@/components/searchbar";
import {HeroInfoItem} from "@/components/hero/HeroInfoItem";
import styles from "./Hero.module.css";
import {Whitespace} from "@/components";

function HeroSection() {
    console.log(styles)

    const heroItems = [
        {
            title: "Data",
            description: "Download data from NASA's POWER project",
            link: "/data",
            linkText: "Go to Data"
        },
        {
            title: "Visualizations",
            description: "View visualization of the data from NASA's POWER project",
            link: "/visualizations",
            linkText: "Go to Visualizations"
        },
        {
            title: "API",
            description: "View the API documentation for NASA weather data.",
            link: "/documents",
            linkText: "Go to API"
        }
    ]


    return <div className={styles["landing-container"]}>

        <h2 className={styles["hero-headline"]}> Search for Data </h2>

        <Whitespace height={"2em"} width={"2em"}/>

        <Searchbar/>

        <Row className={styles["hero-item-list"]}>

            {heroItems.map((item, index) => {
                return <HeroInfoItem
                    key={index}
                    title={item.title}
                    description={item.description}
                    link={item.link}
                    linkText={item.linkText}
                />
            })}

        </Row>
    </div>
}

export {
    HeroSection
}