import React, { Component, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Searchbar } from '../../components/searchbar/Searchbar';
import './Data-module.css'

function Data() {

    const [OneData, setOneData] = useState(null);

    async function getOneData(index) {
        const response = await fetch(``);
        const data = await response.json();
        if (data.length == 0){
            alert("No data found for this county");
        }
        else {
            setOneData(data);
        }
    }


    return (
        <Container fluid className='px-0 min' style={{ }}>
            <div className='Header'>
                <br />
                <h1>Data</h1>
                <br />
                <Searchbar />   
                <br />
                <br />
            </div>

            {/* <ButtonGroup
                onButtonAClicked={handleButtonAClicked}
                onButtonBClicked={handleButtonBClicked}
             /> */}

            <Table striped bordered hover>
                {/* {OneData && (
                    <thead>
                        <br />
                        <tr>
                            <th>{OneData.key }</th>
                            <th>{OneData.parameter1}</th>
                            <th>{OneData.parameter2}</th>
                            <th>{OneData.SolarScore}</th>
                            <th>{OneData.WindScore}</th>
                            <th>{OneData.HydroScore}</th>
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
        </Container>
    );
}

export { Data };
