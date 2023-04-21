import React, { Component, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Searchbar } from '../../components/searchbar/Searchbar';
import FilterAndSort from './FilterAndSort';
import DownloadFiles from './DownloadFiles';
import './Data-module.css'
  

function Data() {

    const staticData = fetch("https://armadilloslay.eastus.cloudapp.azure.com/api/v1/etl/debug/NY/Rensselaer")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        });
    
    

    

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

                <p className='data-header'>Showing results for: Rensselaer, NY</p>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>JAN</th>
                            <th>FEB</th>
                            <th>MAR</th>
                            <th>APR</th>
                            <th>MAY</th>
                            <th>JUN</th>
                            <th>JUL</th>
                            <th>AUG</th>
                            <th>SEP</th>
                            <th>OCT</th>
                            <th>NOV</th>
                            <th>DEC</th>
                        </tr>
                    </thead>
                    <tbody>
                        <p>
                            
                        </p>
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
