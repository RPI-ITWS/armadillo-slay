import { Line } from 'react-chartjs-2';
import { Container } from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'State Statistics'
        },
    },
};



export default function DataVisualization2(props: any) {

    if (props.tableData === undefined) {
        return (
            <div>
                <h2 className='text-center'>No Data Available</h2>
            </div>
        )
    } else {
        let data = props.tableData[0].stateStats;
        let years = [];
        let productionCapacity = [];
        let carbonEmissions = [];
        for (let i = 0; i < data.length; i++) {
            years.push(data[i].year);
            productionCapacity.push(data[i].capacityIPP);
            carbonEmissions.push(data[i].carbonDioxideLbs);
        }
        const chartData = {
            labels: years,
            datasets: [
                {
                    label: 'Average Capacity (GW)',
                    data: productionCapacity,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                },
                {
                    label: 'Average Carbon Emissions (lbs)',
                    data: carbonEmissions,
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgba(54, 162, 235, 0.2)',
                },
            ],
        };
        return (
            <Container fluid="lg">
                <Line
                    data={chartData}
                    options={options}
                />
            </Container>
        )
    }

}