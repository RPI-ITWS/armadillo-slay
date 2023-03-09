import {Button, Col, Row} from "react-bootstrap";
import {ReactElement} from "react";

function Section({
                     title,
                     description,
                     image,
                     callToAction,
                     callback,
                     content,
                     flip = false
                 }: { flip: boolean, content?: ReactElement, title: string, description: string, image: string | undefined, callToAction?: string, callback?: () => void, }) {
    let left =
        <Col xl={6} lg={12} className="py-2">
            <h3 className="display-4">{title}</h3>
            <p className="lead body-txt-left">{description}</p>
            {callToAction && callback && <Button className="landing-btn" onClick={callback}>{callToAction}</Button>}
        </Col>

    let right =
        <Col xl={6} lg={12} className="py-2">
            {
                content ? content : <img src={image} className="landing-img img-fluid" alt="landing-img"/>
            }
        </Col>

    flip ? [left, right] = [right, left] : null


    return (
        <Row className="py-2">
            {
                image ? left : right
            }
            {
                image ? right : left
            }
        </Row>
    );
}

export {
    Section
}