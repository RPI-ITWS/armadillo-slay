import {Container} from 'react-bootstrap'
import {Map} from "../../components/map/Map";
import {Searchbar} from "../../components/searchbar/Searchbar";


function Visualization() {
    return <Container fluid className='px-0 min-vw-100 min' style={{height: "1000px"}}>
        <div className='Header'>
                <h1 className='data-header p-5'>Visualizations</h1>
                <Container fluid="xl">
                    <Searchbar />
                </Container>
            </div>
        <Map/>

    </Container>

}

export {
    Visualization
}