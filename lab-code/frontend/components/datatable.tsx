import { Table } from 'react-bootstrap';
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

export default function DataTable(props: any) {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", 'December'];

    if (!Array.isArray(props.tableData) || !props.tableData.length) {
        return (
            <Container fluid="lg">
                <div className="text-center">
                <h2 className='fs-3'>No Results Found. Please Try Again or add the county to the database.</h2>
                </div>
            </Container>
        )
    } else {

        return (
            <Container fluid="lg">
                <p className="text-center fs-4">Showing Data for {props.tableData[0].county}, {props.tableData[0].state}</p>
                <p className="text-center fs-4">Average Household Income: ${props.tableData[0].householdIncome}</p>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Surface Pressure {"("}kPa{")"}</th>
                            <th>Wind Direction at 10m {"("}degrees{")"}</th>
                            <th>Wind Direction at 50m {"("}degrees{")"}</th>
                            <th>Wind Speed at 10m {"("}m/s{")"}</th>
                            <th>Wind Speed at 50m {"("}m/s{")"}</th>

                        </tr>
                    </thead>
                    <tbody>
                        {months.map((month, monthIndex) => (
                            <tr key={month}>
                                <td>{month}</td>
                                {props.tableData[0].monthlyData.slice(0, -6).map((_: any, columnIndex: any) => (
                                    <td key={`${month}-${columnIndex}`}>
                                        {props.tableData[0].monthlyData[columnIndex].monthlyData[monthIndex].value}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Average Retail Price</th>
                            <th>Average Production Capacity</th>
                            <th>Average Carbon Emissions</th>
                            <th>Direct Use</th>
                            <th>Generation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.tableData[0].stateStats.map((stat: any, index: any) => (
                            <tr key={index}>
                                <td>{stat.year}</td>
                                <td>{stat.averageRetailPrice}</td>
                                <td>{stat.capacityIPP}</td>
                                <td>{stat.carbonDioxideLbs}</td>
                                <td>{stat.directUse}</td>
                                <td>{stat.generationElectUtils}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        )
    }

}











