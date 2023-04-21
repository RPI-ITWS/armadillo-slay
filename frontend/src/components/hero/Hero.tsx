import {Container, Row} from "react-bootstrap";
import {Searchbar} from "../searchbar";
import {HeroInfoItem} from "./HeroInfoItem";
import styles from "./Hero.module.css";
import {Whitespace} from "../whitespace";

function Hero() {
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
        <Container fluid="xxl">

        <h2 className={`pb-3 ${styles["hero-headline"]}`}> Search for Data </h2>

        <Searchbar/>

        <Row className={`pb-5 pt-5 ${styles["hero-item-list"]}`}>

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
        </Container>
    </div>
    
}

export {
    Hero
}