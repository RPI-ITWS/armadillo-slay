import {Button, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import styles from "./Hero.module.css";


interface HeroInfoItemProps {
    title: string,
    description: string,
    link: string,
    linkText: string

}

function HeroInfoItem(
    {
        title,
        description,
        link,
        linkText
    }: HeroInfoItemProps) {
    return <Col xl={4} lg={12} className={styles["hero-info-item"]}>
        <h3 className={styles.heroItemTitle}>{title}</h3>
        <p className={styles.landingDescription}>{description}</p>
        <Link to={link}> <Button className={styles["hero-item-btn"]}>{linkText}</Button> </Link>
    </Col>;
}

export {
    HeroInfoItem
}