import {Container} from 'react-bootstrap'
import {Map} from "../../components/map/Map";


function Visualization() {
    return <Container fluid className='px-0 min-vw-100 min' style={{height: "1000px"}}>

        <h1>Visualization</h1>
        <Map/>

    </Container>

}

export {
    Visualization
}