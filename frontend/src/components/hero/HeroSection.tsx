import {Container, Row} from "react-bootstrap";
import {Searchbar} from "@/components/searchbar";
import {HeroInfoItem} from "@/components/hero/HeroInfoItem";
import styles from "./Hero.module.css";
import {Whitespace} from "@/components";

function HeroSection() {

    return <Container fluid="lg" className={styles.landingContainer}>

        <h2 className={styles.landingTitle} > Search for Data </h2>

        <Whitespace height={"2em"} width={"2em"}/>

        <Searchbar/>

        <Row className="pt-5">
            <HeroInfoItem title={"Data"}
                          description={"Download data from NASA's POWER project"} link={"/data"}
                          linkText={"Go to Data"}
            />
            <HeroInfoItem title={"Visualizations"}
                          description={"View visualization of the data from NASA's POWER project"}
                          link={"/visualizations"}
                          linkText={"Go to Visualizations"}
            />
            <HeroInfoItem title={"API"} description={"View the API documentation for NASA weather data."}
                          link={"/documents"}
                          linkText={"Go to API"}
            />
        </Row>
    </Container>
}

export {
    HeroSection
}