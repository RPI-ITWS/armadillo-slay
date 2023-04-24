import React, { Component, useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Searchbar } from '../../components/searchbar/Searchbar';
import FilterAndSort from './FilterAndSort';
import DownloadFiles from './DownloadFiles';
import './Data-module.css'



function Data() {

    const [staticData, setStaticData] = useState<any>(null);

    useEffect(() => {
        fetch('https://armadilloslay.eastus.cloudapp.azure.com/api/v1/etl/debug/NY/Rensselaer')
            .then((response) => response.json())
            .then((data) => {
                setStaticData(data);
            });
    }, []);

    const renderTableRows = () => {
        if (!staticData) {
            return null;
        }

        const data = staticData[0]["NASA_power_data"];

        return Object.keys(data).map((key) => {
            return (
                <tr key={key}>
                    <td>{key}</td>
                    {Object.keys(data[key]).map((month) => (
                        <td key={`${key}-${month}`}>{data[key][month]}</td>
                    ))}
                </tr>
            );
        });
    };


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
                {staticData && (
                    <Table striped bordered hover size='sm' >
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Annual</th>
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
                                <th>Units</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTableRows()}
                        </tbody>


                    </Table>
                )}

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
