import {Button, Col, Container, Form, Row} from 'react-bootstrap'
import {Map} from "../../components/map/Map";
import {County, Searchbar} from "../../components/searchbar/Searchbar";
import React, {useEffect, useState} from "react";
import styles from "./Visualization.module.css";
import {Marker, Popup} from "react-map-gl";
import LocationIcon from "../../../assets/location.svg";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Visualization() {
    const [data, setData] = useState<any>({
      lat: 42.71103722,
      long: -73.50952678,
      household_income: "68991",
      solar_rank: 8,
      wind_rank: 5,
      hydro_rank: 5
    })
    const [popupVisible, setPopupVisible] = useState(true);
    const [solarRank, setSolarRank] = useState(9);
    const [windRank, setWindRank] = useState(7);
    const [hydroRank, setHydroRank] = useState(8);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
      const country = new County("NY", "Rensselaer");
      onSearch(country);
      getCountries();
    }, [])

    const getCountries = () => {
      fetch(`/api/v1/etl/debug?solarRank=${solarRank}&windRank=${windRank}&hydroRank=${hydroRank}`)
        .then(res => res.json())
        .then(res => {
          setCountries(res);
        });
    }

    const onSearch = (country: County) => {
      if (country) {
        fetch(`/api/v1/etl/debug/${country.state}/${country.county}`)
          .then(res => res.json())
          .then(res => {
            if (res && res.length >0) {
              setData(res[0]);
            }
          });
      }
    }

    const handleMarkerClick = () => {
      setPopupVisible(true);
    };

    const handlePopupClose = () => {
      setPopupVisible(false);
    };


    const allsky_kt = data && data.NASA_power_data && data.NASA_power_data.ALLSKY_KT;
    if (allsky_kt) {
      delete allsky_kt.longname;
      delete allsky_kt.units;
    }

    const cloud_amt = data && data.NASA_power_data && data.NASA_power_data.CLOUD_AMT;
    if (cloud_amt) {
      delete cloud_amt.longname;
      delete cloud_amt.units;
    }

    const allsky_kt_data = {
      labels: allsky_kt && Object.keys(allsky_kt),
      datasets: [
        {
          label: 'ALLSKY_KT',
          data: allsky_kt && Object.values(allsky_kt),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ],
    };

    const cloud_amt_data = {
      labels: cloud_amt && Object.keys(cloud_amt),
      datasets: [
        {
          label: 'CLOUD_AMT',
          data: cloud_amt && Object.values(cloud_amt),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
      ],
    };


    return <Container fluid className='px-0 min-vw-100 min' style={{height: "1000px"}}>
        <div className='Header'>
                <h1 className='data-header p-5'>Visualizations</h1>
                <Container fluid="xl">
                    <Searchbar onSearch={onSearch} />
                </Container>
            </div>
        <Map data={data} zoom={9} center={{ lat: data.lat, lng: data.long }}>
          <Marker latitude={data.lat} longitude={data.long}>
            <div>
              <img
                src="https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png"
                alt="marker"
                style={{
                  height: '20px',
                  width: '20px',
                }}
              />
            </div>
          </Marker>
          {popupVisible && (
            <Popup
              latitude={data.lat}
              longitude={data.long}
              closeButton={true}
              closeOnClick={false}
              onClose={handlePopupClose}
              anchor="top"
            >
              <div>Household Income: ${data.household_income}
                <br />
                Renewable Energy Ranking:
                <br />
                1. Solar: {data.solar_rank}
                <br />
                2. Wind: {data.wind_rank}
                <br />
                3. Hydroelectric: {data.hydro_rank}
                <br />
              </div>
            </Popup>
          )}
        </Map>
        <Container fluid className='px-0 min-vw-100 min mt-2' style={{height: "350px"}}>
          <div className={styles.inner} style={{height: "100%"}}>
            <div style={{flex: 1}}>
              <Line options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'NASA power data for ALLSKY KT',
                  },
                },
              }} data={allsky_kt_data} />
            </div>
            <div style={{flex: 1}}>
              <Line options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'NASA power data for CLOUD AMT',
                  },
                },
              }} data={cloud_amt_data} />
            </div>
          </div>
        </Container>
        <Container fluid className='px-0 min-vw-100 min mt-2' style={{height: "1000px"}}>
            <div className={styles.inner} style={{height: "100%"}}>
              <div className={styles.left}>
                <Map data={data} zoom={3} center={{ lat: 42.71103722, lng: -100.50952678 }}>
                  {
                    countries.map((country: any) => (
                      <Marker key={country._id} latitude={country.lat} longitude={country.long}>
                        <div>
                          <img
                            src={LocationIcon}
                            alt="marker"
                            style={{
                              height: '20px',
                              width: '20px',
                            }}
                          />
                        </div>
                      </Marker>
                    ))
                  }
                </Map>
              </div>
              <div className={styles.right}>
                <Form.Label>Solar Rank</Form.Label>
                <Form.Range max={13} min={6} step={1} value={solarRank} onChange={(e: any) => setSolarRank(e.target.value)} />
                <Form.Label>Wind Rank</Form.Label>
                <Form.Range max={10} min={5} step={1} value={windRank} onChange={(e: any) => setWindRank(e.target.value)} />
                <Form.Label>Hydro Rank</Form.Label>
                <Form.Range max={10} min={3} step={1} value={hydroRank} onChange={(e: any) => setHydroRank(e.target.value)} />
                <Button variant="primary" onClick={getCountries}>Confirm</Button>
              </div>
            </div>
        </Container>
    </Container>

}

export {
    Visualization
}
