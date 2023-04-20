import NavBar from "../components/navbar";
import "./App.css";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import DataTable from "../components/datatable";
import { Button } from "react-bootstrap";
import DataVisualization1 from "../components/datavisualization1";
import DataVisualization2 from "../components/datavisualization2";

function App() {
  const [county, setCounty] = useState<any>(["Rensselaer", "NY"]);

  const [countyData, setData] = useState<any>();

  function countyCallBack(county: any) {
    county = county[0].split(",");
    county[1] = county[1].trim();
    setCounty(county);
  }

  useEffect(() => {
    fetch(
      `https://howelc.eastus.cloudapp.azure.com/node/${county[1]}/${county[0]}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [county]);

  return (
    <div>
      <NavBar countyCallBack={countyCallBack} />
      <Container className="d-flex justify-content-center">
        <Button
          className="m-2"
          variant="success"
          onClick={() => {
            fetch(
              `https://howelc.eastus.cloudapp.azure.com/node/${county[1]}/${county[0]}`,
              {
                method: "POST",
              }
            )
              .then((res) => res.json())
              .then((data) => {
                if (data.success) {
                  alert("Data added successfully");
                } else {
                  alert("Data already exists or there was an error");
                }
              });
          }}
        >
          Add Data
        </Button>
        <Button
          className="m-2"
          variant="warning"
          onClick={() => {
            fetch(
              `https://howelc.eastus.cloudapp.azure.com/node/${county[1]}/${county[0]}`,
              {
                method: "PUT",
              }
            )
              .then((res) => res.json())
              .then((data) => {
                if (data.success) {
                  alert("Data updated successfully");
                } else {
                  alert("Data does not exist or there was an error");
                }
              });
          }}
        >
          Update Data
        </Button>
        <Button
          className="m-2"
          variant="danger"
          onClick={() => {
            fetch(
              `https://howelc.eastus.cloudapp.azure.com/node/${county[1]}/${county[0]}`,
              {
                method: "DELETE",
              }
            )
              .then((res) => res.json())
              .then((data) => {
                if (data.success) {
                  alert("Data deleted successfully");
                } else {
                  alert("Data does not exist or there was an error");
                }
              });
          }}
        >
          Delete Data
        </Button>
      </Container>
      <DataTable tableData={countyData} />
      <DataVisualization1 tableData={countyData} />
      <DataVisualization2 tableData={countyData} />
    </div>
  );
}

export default App;
