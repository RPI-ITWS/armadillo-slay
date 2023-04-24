import React, { Component, useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import {Searchbar} from '../../components/searchbar/Searchbar';
import DropdownBtn from './DropdownBtn';
import DownloadFiles from './DownloadFiles';
import './Data-module.css'

function Data() {

    const [typeNeeded, setTypeNeeded] = useState(0); 
    const [staticData, setStaticData] = useState<any>(null);
    const [selectedCounty, setSelectedCounty] = useState("");
    var c = "";
    var s = "";

    const handleOptionSelected = (option: number) => {
        console.log(option);
        setTypeNeeded(option);
    };   

    const renderTableRows = (typeNeeded: number) => {
        const data = staticData[0]["NASA_power_data"];
        return Object.keys(data).map((key) => {
            if (typeNeeded == 0) {
                return (
                    <tr key={key}>
                        <td>{key}</td>
                        {Object.keys(data[key]).map((month) => (
                            <td key={`${key}-${month}`}>{data[key][month]}</td>
                        ))}
                    </tr>
                );
            }
            else if (typeNeeded == 1) {
                console.log("renderTableRows");
                if (key == "ALLSKY_KT") {
                    return (
                        <tr key={key}>
                            <td>{key}</td>
                            {Object.keys(data[key]).map((month) => (
                                <td key={`${key}-${month}`}>{data[key][month]}</td>
                            ))}
                        </tr>
                    );
            }}
        });
    };

    function countyCallBack(county: string) {
        c = "";
        s = "";

        for (var i = 0; i < county[0].length; i++) {
            if (county[0][i] === ",") {
                s = county[0].substring(i + 2, county[0].length);
                break;
            }
            c += county[0][i];
        }

        console.log(s + " " + c);
        fetch ('https://armadilloslay.eastus.cloudapp.azure.com/api/v1/etl/debug/'+s+'/'+c)
            .then((response) => response.json())
            .then((data) => {
                setStaticData(data);
            }
        );
        
        setSelectedCounty(county);
    }

    
    const handleButtonCClicked = () => { //json
    }

    const handleButtonDClicked = () => { //csv
    }

    return (
        <Container fluid className='px-0 min'>
            <div className='Header'>
                <h1 className='data-header p-5'>Data</h1>
                <Container fluid="xl">
                    <Searchbar countyCallBack={countyCallBack} />
                </Container>
            </div>

            <br />

            <div>
                <DropdownBtn onOptionSelected={handleOptionSelected} />
            </div>

            <h2 className="text-center">Now Viewing Results For: <br /> {selectedCounty} </h2>

            <Container fluid="xl">

                <br />
                
                {staticData && (
                  <div className="table-responsive">
                    <Table className="table table-striped table-bordered table-hover table-sm w-100" >
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
                            {renderTableRows(typeNeeded)}
                        </tbody>


                    </Table>
                  </div>
                )}

                <br />

                <DownloadFiles
                    onButtonCClicked={handleButtonCClicked}
                    onButtonDClicked={handleButtonDClicked}
                />

                <br />
                <br />
            </Container>
        </Container>
    );
}

export { Data };