import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import NavBar from '../components/navbar'
import Footer from '../components/footer'


export default function Home() {

    return (
        <Container fluid className='px-0 min-vw-100 min'>
            <NavBar />
            <div className="search-gif">

            </div>
            <Container fluid="lg">
                <Row className="justify-content-center">
                    <Col xs={12} md={8} className="text-center">
                        <h1 className="display-4">NASA Renewable Energy Data</h1>
                        <p className="lead">This website is a data visualization tool for NASA's renewable energy data. The data is provided by the NASA POWER project and is available for download at <a href="https://power.larc.nasa.gov/">https://power.larc.nasa.gov/</a>.</p>
                        <p className="lead">The data is available for download in CSV format and is updated daily. The data is available for download for the following locations:</p>
                        <ul>
                            <li>Global</li>
                            <li>United States</li>
                            <li>Canada</li>
                            <li>Europe</li>
                            <li>Asia</li>
                            <li>Australia</li>
                            <li>South America</li>
                            <li>North America</li>
                        </ul>
                        <p className="lead">The data is available for download for the following parameters:</p>
                        <ul>
                            <li>Surface Solar Radiation Downwards (W/m^2)</li>
                            <li>Surface Solar Radiation Downwards Clear Sky (W/m^2)</li>
                            <li>Surface Solar Radiation Downwards Clear Sky Uncertainty (W/m^2)</li>
                            <li>Surface Solar Radiation Downwards Uncertainty (W/m^2)</li>
                            <li>Surface Temperature (K)</li>
                            <li>Surface Temperature Uncertainty (K)</li>
                            <li>Surface Wind Direction (degrees)</li>
                            <li>Surface Wind Direction Uncertainty (degrees)</li>
                            <li>Surface Wind Speed (m/s)</li>
                            <li>Surface Wind Speed Uncertainty (m/s)</li>
                            <li>Surface Pressure (Pa)</li>
                            <li>Surface Pressure Uncertainty (Pa)</li>
                            <li>Surface Relative Humidity (%)</li>
                            <li>Surface Relative Humidity Uncertainty (%)</li>
                            <li>Surface Precipitation (mm)</li>
                            <li>Surface Precipitation Uncertainty (mm)</li>
                            <li>Surface Pressure (Pa)</li>
                            <li>Surface Pressure Uncertainty (Pa)</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            <Footer />

        </Container>
    )
}