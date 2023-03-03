import { Button, Nav, Col, Container, Row, Tab } from 'react-bootstrap'
import NavBar from '../components/navbar'
import Footer from '../components/footer'
import SearchFeatureContainer from "../components/SearchFeatureContainer";
import { Link } from 'react-router-dom';


export default function Home() {

    return (
        <Container fluid className='px-0 min-vw-100 min'>
            <NavBar />

            <div className="search-gif">
                <Container fluid="lg" className='landing-container'>
                    <h2 className="display-4 landing-txt"> Search for Data </h2>
                    <SearchFeatureContainer />
                    <Row className='pt-5'>
                        <Col xl={4} lg={12} className="landing-info">
                            <h3 className="display-4 landing-txt">Data</h3>
                            <p className="lead landing-txt">Download data from <br></br>NASA's POWER project.</p>
                            <Link to="/data"> <Button className='landing-btn'>Go to Data</Button> </Link>
                        </Col>
                        <Col xl={4} lg={12} className="landing-info">
                            <h3 className="display-4 landing-txt">Visualizations</h3>
                            <p className="lead landing-txt"> View visualization of the data <br></br> from NASA's POWER project.</p>
                            <Link to="/visualizations"> <Button className='landing-btn'>Go to Visualizations</Button> </Link>
                        </Col>
                        <Col xl={4} lg={12} className="landing-info">
                            <h3 className="display-4 landing-txt landing-txt">API</h3>
                            <p className="lead landing-txt">View the API documentation <br></br> for NASA weather data.</p>
                            <Link to="/documents"> <Button className='landing-btn' >Go to API</Button> </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container fluid="lg">
                <Row className="justify-content-center py-5 mt-5 mb-4 align-items-center">
                    <Col xl={6} lg={12} className="py-2">
                        <h3 className="display-4">The Data Source</h3>
                        <p className='lead body-txt-left'>The data used in this project is from NASA's POWER project. POWER stands for Prediction of Worldwide Energy Resource. The data is collected from satellites and weather stations around the world. The data is collected in 30 minute intervals and is available for the past 30 years. The data is available in a variety of formats including CSV, JSON, and NetCDF. The data is available for download and can be used for free. </p>
                        <p className='lead body-txt-left'>The data is available for download in the Data section of this website. The data is also available through the API. The API is available in the API section of this website. The API is a RESTful API that allows users to query the data. The API is available in JSON and CSV formats. The API is also available in NetCDF format. The API is available for free and can be used for free. </p>
                    </Col>
                    <Col xl={6} lg={12} className="body-img-right">
                        <img src="https://eoimages.gsfc.nasa.gov/images/imagerecords/150000/150967/globalnox_mdl_2020_lrg.png" alt="NASA POWER" className="img-fluid" />
                    </Col>
                </Row>
                <Row className="justify-content-center py-5 mt-3 mb-4 align-items-center">
                    <Col xl={6} lg={12} className="body-img-left">
                        <img src="https://www.researchgate.net/profile/Serkan-Abbasoglu/publication/299533673/figure/tbl1/AS:1042479998582786@1625558008871/NASA-surface-meteorology-and-solar-energy-database-parameters.png" alt="NASA POWER" className="img-fluid" />
                    </Col>
                    <Col xl={6} lg={12} className="py-2">
                        <h3 className="display-4"> The Data</h3>
                        <p className='lead body-txt-right'> To view the data, go to the Data section of this website. The data is available in CSV, JSON, and NetCDF formats. The data is available for download and can be used for free. </p>
                        <p className="lead body-txt-right"> The Raw Data is presented in a table format. The table is sortable and searchable. The table is also filterable. The table is filterable by location, date, and variable. The table is searchable by location, date, and variable.</p>
                        <Button className='landing-btn'>Go to Data</Button>
                    </Col>
                </Row>
                <Row className="justify-content-center py-5 mt-3 mb-4 align-items-center">
                    <Col xl={6} lg={12} className="py-2">
                        <h3 className="display-4"> The Visualizations</h3>
                        <p className='lead body-txt-left'> To view the visualizations, go to the Visualizations section of this website. The visualizations are available in a variety of formats. The visualizations are available for download and can be used for free. </p>
                        <p className="lead body-txt-left"> The Visualizations are presented in a table format. The table is sortable and searchable. The table is also filterable. The table is filterable by location, date, and variable. The table is searchable by location, date, and variable.</p>
                        <Button className='landing-btn'>Go to Visualizations</Button>
                    </Col>
                    <Col xl={6} lg={12} className="body-img-right">
                        <img src="https://www.nasa.gov/sites/default/files/thumbnails/image/figure_es1a.png" alt="NASA POWER" className="img-fluid" />
                    </Col>
                </Row>
                <Row className="justify-content-center py-5 mt-3 mb-4 align-items-center">
                    <Col xl={6} lg={12} className="body-code-left d-flex flex-column">
                        <pre className="landing-code">
                            <code>
                                { /* Syntax highlighting styles */}
                                <span className="keyword">fetch</span>
                                <span className="string">('https://armadilloslay.eastus.cloudapp.azure.com/api/weather?location=:location')</span>
                                <br></br>
                                <span className="operator">.</span>
                                <span className="keyword">then</span>
                                <span className="operator">(</span>
                                <span className="keyword">response</span>
                                <span className="operator">=&gt;</span>
                                <span className="keyword">response</span>
                                <span className="operator">.</span>
                                <span className="keyword">json</span>
                                <span className="operator">()</span>
                                <br></br>
                                <span className="operator">.</span>
                                <span className="keyword">then</span>
                                <span className="operator">(</span>
                                <span className="keyword">data</span>
                                <span className="operator">=&gt;</span>
                                <span className="keyword">console</span>
                                <span className="operator">.</span>
                                <span className="keyword">log</span>
                                <span className="operator">(</span>
                                <span className="keyword">data</span>
                                <span className="operator">)</span>
                                <span className="operator">)</span>
                                <br></br>
                                <span className="operator">.</span>
                                <span className="keyword">catch</span>
                                <span className="operator">(</span>
                                <span className="keyword">error</span>
                                <span className="operator">=&gt;</span>
                                <span className="keyword">console</span>
                                <span className="operator">.</span>
                                <span className="keyword">error</span>
                                <span className="operator">(</span>
                                <span className="keyword">error</span>
                                <span className="operator">)</span>
                                <span className="operator">)</span>
                            </code>
                        </pre>
                        <pre className="landing-code">
                            <code>
                                { /* Syntax highlighting styles */}
                                <span className="keyword">$.ajax</span>
                                <span className="operator">(</span>
                                <span className="string">{'{'}</span>
                                <br></br>
                                <span className="string">"url":</span>
                                <span className="string">"https://armadilloslay.eastus.cloudapp.azure.com/api/weather?location=:location"</span>
                                <br></br>
                                <span className="string">"method":</span>
                                <span className="string">"GET"</span>
                                <br></br>
                                <span className="string">{'}'}</span>
                                <span className="operator">)</span>
                                <br></br>
                                <span className="operator">.</span>
                                <span className="keyword">done</span>
                                <span className="operator">{'('}</span>
                                <span className="keyword">function</span>
                                <span className="operator">(</span>
                                <span className="keyword">response</span>
                                <span className="operator">)</span>
                                <br></br>
                                <span className="operator">{'{'}
                                </span>
                                <br></br>
                                <span className="keyword">console</span>
                                <span className="operator">.</span>
                                <span className="keyword">log</span>
                                <span className="operator">(</span>
                                <span className="keyword">response</span>
                                <span className="operator">)</span>
                                <br></br>
                                <span className="operator">{'}'}</span>
                                <span className="operator">)</span>
                                <br></br>
                                <span className="operator">.</span>
                                <span className="keyword">fail</span>
                                <span className="operator">{'('}</span>
                                <span className="keyword">function</span>
                                <span className="operator">(</span>
                                <span className="keyword">error</span>
                                <span className="operator">)</span>
                                <br></br>
                                <span className="operator">{'{'}</span>
                                <br></br>
                                <span className="keyword">console</span>
                                <span className="operator">.</span>
                                <span className="keyword">log</span>
                                <span className="operator">(</span>
                                <span className="keyword">error</span>
                                <span className="operator">)</span>
                                <br></br>
                                <span className="operator">{'}'}</span>
                                <span className="operator">{')'}</span>
                            </code>
                        </pre>
                    </Col>
                    <Col xl={6} lg={12} className="py-2">
                        <h3 className="display-4"> The API</h3>
                        <p className='lead body-txt-right'> To view the API, go to the API section of this website. The API is a RESTful API that allows users to query the data. The API is available in JSON and CSV formats. The API is also available in NetCDF format. The API is available for free and can be used for free. </p>
                        <p className="lead body-txt-right"> The API is presented in a table format. The table is sortable and searchable. The table is also filterable. The table is filterable by location, date, and variable. The table is searchable by location, date, and variable.</p>
                        <Button className='landing-btn'>Go to API</Button>
                    </Col>
                </Row>

            </Container>
            <Footer />

        </Container>
    )
}