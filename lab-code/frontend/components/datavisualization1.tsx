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
            text: 'County Wind Statistics'
        },
    },
};

export default function DataVisualization1(props: any) {

    if (props.tableData === undefined) {
        return (
            <div>
                <h2 className='text-center'>No Data Available</h2>
            </div>
        )
    } else {
        let data1 = props.tableData[0].monthlyData[3].monthlyData;
        let data2 = props.tableData[0].monthlyData[4].monthlyData;
        let months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December' ];
        let windSpeed10m = [];
        let windSpeed50m = [];

        for (let i = 0; i < 12; i++) {
            windSpeed10m.push(data1[i].value);
            windSpeed50m.push(data2[i].value);
        }

        const chartData = {
            labels: months,
            datasets: [
                {
                    label: 'Average Capacity (GW)',
                    data: windSpeed10m,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                },
                {
                    label: 'Average Carbon Emissions (lbs)',
                    data: windSpeed50m,
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