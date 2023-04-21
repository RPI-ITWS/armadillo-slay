import React, { Component, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Searchbar } from '../../components/searchbar/Searchbar';
import FilterAndSort from './FilterAndSort';
import DownloadFiles from './DownloadFiles';
import './Data-module.css'

function Data() {

    const [OneData, setOneData] = useState(null);

    // async function getOneData(index) {
    //     const response = await fetch(``);
    //     const data = await response.json();
    //     if (data.length == 0){
    //         alert("No data found for this county");
    //     }
    //     else {
    //         setOneData(data);
    //     }
    // }

    const handleButtonAClicked = () => { //filter
    }

    const handleButtonBClicked = () => { //sort 
    }

    const handleButtonCClicked = () => { //json
    }

    const handleButtonDClicked = () => { //csv
    }

    const handleButtonEClicked = () => { //xlsx
    }

    return (
        <Container fluid className='px-0 min'>
            <div className='Header'>
                <h1 className='data-header p-5'>Data</h1>
                <Container fluid="xl">
                    <Searchbar />
                </Container>
            </div>

            <Container fluid="xl">

                <FilterAndSort
                    onButtonAClicked={handleButtonAClicked}
                    onButtonBClicked={handleButtonBClicked}
                />

                <Table striped bordered hover>
                    {/* {OneData && (
                    <thead>
                        <br />
                        <tr>
                            <th>{OneData.key }</th>
                            <th>{OneData.parameter1}</th>
                            <th>{OneData.parameter2}</th>
                            <th>{OneData.parameter3}</th>
                            <th>{OneData.parameter4}</th>
                            <th>{OneData.SolarScore}</th>
                            <th>{OneData.WindScore}</th>
                            <th>{OneData.HydroScore}</th>
                            <th>{OneData.BestOption}</th>
                        </tr>
                    </thead>
                )} */}
                    <thead>
                        <br />
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>

                <br />

                <DownloadFiles
                    onButtonCClicked={handleButtonCClicked}
                    onButtonDClicked={handleButtonDClicked}
                    onButtonEClicked={handleButtonEClicked}
                />

                <br />
                <br />
            </Container>
        </Container>
    );
}

export { Data };
