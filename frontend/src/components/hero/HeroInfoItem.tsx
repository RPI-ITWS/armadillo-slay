import {Button, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

function HeroInfoItem({
                          title,
                          description,
                          link,
                          linkText
                      }: { title: string, description: string, link: string, linkText: string }) {
    return <Col xl={4} lg={12} className="landing-info">
        <h3 className="display-4 landing-txt">{title}</h3>
        <p className="lead landing-txt">{description}</p>
        <Link to={link}> <Button className="landing-btn">{linkText}</Button> </Link>
    </Col>;
}

export {
    HeroInfoItem
}