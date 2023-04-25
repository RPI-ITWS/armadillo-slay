import React, { Component, useState, useEffect } from 'react';
import exportFromJSON, { ExportType } from 'export-from-json'
import { Container, Table } from 'react-bootstrap';
import {Searchbar} from '../../components/searchbar/Searchbar';
import DropdownBtn from './DropdownBtn';
import DownloadFiles from './DownloadFiles';
import './Data-module.css'

function Data() {

    const [typeNeeded, setTypeNeeded] = useState(0); 
    const [staticData, setStaticData] = useState<any>(null);
    const [selectedCounty, setSelectedCounty] = useState("");
    const [CountyState, setCountyState] = useState<string[]>([]);
    var c = "";
    var s = "";

    const handleOptionSelected = (option: number) => {
        console.log(option);
        setTypeNeeded(option);
    };   

    const renderTableRows = (typeNeeded: number) => {
        const data = staticData[0]["NASA_power_data"];
        return Object.keys(data).map((key) => {
            if (typeNeeded == 0) {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}
            else if (typeNeeded == 1) {if (key == "ALLSKY_KT") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 2) {if (key == "CLOUD_AMT") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 3) {if (key == "TOA_SW_DWN") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 4) {if (key == "ALLSKY_SRF_ALB") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 5) {if (key == "ALLSKY_SFC_SW_DNI") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 6) {if (key == "ALLSKY_SFC_SW_DWN") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 7) {if (key == "CLRSKY_SFC_SW_DWN") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 8) {if (key == "ALLSKY_SFC_PAR_TOT") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 9) {if (key == "ALLSKY_SFC_SW_DIFF") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 10) {if (key == "SI_EF_TILTED_SURFACE_HORIZONTAL") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 11) {if (key == "SI_EF_TILTED_SURFACE_LAT_MINUS15") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 12) {if (key == "SI_EF_TILTED_SURFACE_LATITUDE") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 13) {if (key == "SI_EF_TILTED_SURFACE_LAT_PLUS15") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 14) {if (key == "SI_EF_TILTED_SURFACE_VERTICAL") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 15) {if (key == "SI_EF_TILTED_SURFACE_OPTIMAL") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 16) {if (key == "SI_EF_TILTED_SURFACE_OPTIMAL_ANG") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 17) {if (key == "SI_EF_TILTED_SURFACE_OPTIMAL_ANG_ORT") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 18) {if (key == "ALLSKY_SFC_SW_DWN_00") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 19) {if (key == "ALLSKY_SFC_SW_DWN_01") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 20) {if (key == "ALLSKY_SFC_SW_DWN_02") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 21) {if (key == "ALLSKY_SFC_SW_DWN_03") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 22) {if (key == "ALLSKY_SFC_SW_DWN_04") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 23) {if (key == "ALLSKY_SFC_SW_DWN_05") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 24) {if (key == "ALLSKY_SFC_SW_DWN_06") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 25) {if (key == "ALLSKY_SFC_SW_DWN_07") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 26) {if (key == "ALLSKY_SFC_SW_DWN_08") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 27) {if (key == "ALLSKY_SFC_SW_DWN_09") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 28) {if (key == "ALLSKY_SFC_SW_DWN_10") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 29) {if (key == "ALLSKY_SFC_SW_DWN_11") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 30) {if (key == "ALLSKY_SFC_SW_DWN_12") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 31) {if (key == "ALLSKY_SFC_SW_DWN_13") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 32) {if (key == "ALLSKY_SFC_SW_DWN_14") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 33) {if (key == "ALLSKY_SFC_SW_DWN_15") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 34) {if (key == "ALLSKY_SFC_SW_DWN_16") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 35) {if (key == "ALLSKY_SFC_SW_DWN_17") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 36) {if (key == "ALLSKY_SFC_SW_DWN_18") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 37) {if (key == "ALLSKY_SFC_SW_DWN_19") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 38) {if (key == "ALLSKY_SFC_SW_DWN_20") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 39) {if (key == "ALLSKY_SFC_SW_DWN_21") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 40) {if (key == "ALLSKY_SFC_SW_DWN_22") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 41) {if (key == "ALLSKY_SFC_SW_DWN_23") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 42) {if (key == "TS") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 43) {if (key == "T2M") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 44) {if (key == "QV2M") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 45) {if (key == "RH2M") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 46) {if (key == "SG_DEC") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 47) {if (key == "T2MDEW") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 48) {if (key == "T2MWET") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 49) {if (key == "SG_NOON") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 50) {if (key == "FROST_DAYS") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 51) {if (key == "PRECTOTCORR") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 52) {if (key == "SG_DAY_HOURS") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 53) {if (key == "SG_HR_SET_ANG") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 54) {if (key == "PRECTOTCORR_SUM") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 55) {if (key == "SG_DAY_COZ_ZEN_AVG") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 56) {if (key == "SG_MID_COZ_ZEN_ANG") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 57) {if (key == "SG_HRZ_00") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 58) {if (key == "SG_HRZ_01") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 59) {if (key == "SG_HRZ_02") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 60) {if (key == "SG_HRZ_03") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 61) {if (key == "SG_HRZ_04") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 62) {if (key == "SG_HRZ_05") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 63) {if (key == "SG_HRZ_06") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 64) {if (key == "SG_HRZ_07") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 65) {if (key == "SG_HRZ_08") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 66) {if (key == "SG_HRZ_09") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 67) {if (key == "SG_HRZ_10") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 68) {if (key == "SG_HRZ_11") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 69) {if (key == "SG_HRZ_12") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 70) {if (key == "SG_HRZ_13") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 71) {if (key == "SG_HRZ_14") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 72) {if (key == "SG_HRZ_15") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 73) {if (key == "SG_HRZ_16") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 74) {if (key == "SG_HRZ_17") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 75) {if (key == "SG_HRZ_18") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 76) {if (key == "SG_HRZ_19") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 77) {if (key == "SG_HRZ_20") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 78) {if (key == "SG_HRZ_21") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 79) {if (key == "SG_HRZ_22") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 80) {if (key == "SG_HRZ_23") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 81) {if (key == "PS") {return (<tr key={key}> <td>{key}</td> {Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 82) {if (key == "WD10M") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 83) {if (key == "WD50M") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 84) {if (key == "WS10M") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 85) {if (key == "WS50M") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 86) {if (key == "MIDDAY_INSOL") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}  
            else if (typeNeeded == 87) {if (key == "INSOL_CONSEC_MONTH") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 88) {if (key == "EQUIV_NO_SUN_CONSEC_MONTH") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
            else if (typeNeeded == 89) {if (key == "SOLAR_DEFICITS_CONSEC_MONTH") {return (<tr key={key}><td>{key}</td>{Object.keys(data[key]).map((month) => (<td key={`${key}-${month}`}>{data[key][month]}</td>))}</tr>);}}
        });
    };

    function OnLoadRPI() {
        fetch('https://armadilloslay.eastus.cloudapp.azure.com/api/v1/etl/debug/NY/Rensselaer')
        .then((response) => response.json())
        .then((data) => {
            setStaticData(data);
            setSelectedCounty('Rensselaer, NY');
            setCountyState([]);
            setCountyState([c, s]);
        });
    }

    useEffect(() => {
        OnLoadRPI();
    }, []);

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
        setCountyState([]);
        setCountyState([c, s]);
    }

    function downloadJsonFile(jsonData: object, filename: string) { //json
        const blob = new Blob([JSON.stringify(staticData)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'YourData.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    const handleButtonJSONClicked = () => { //json
        console.log(CountyState[0] + " " + CountyState[1]);
        fetch ('https://armadilloslay.eastus.cloudapp.azure.com/api/v1/etl/debug/'+CountyState[0]+'/'+CountyState[1])
                .then((response) => response.json())
                .then((data) => {
                    downloadJsonFile(data, 'YourData.json');
                }
        );
    }            

    const handleButtonCSVClicked = () => { //csv
        fetch('https://armadilloslay.eastus.cloudapp.azure.com/api/v1/etl/debug/'+CountyState[0]+'/'+CountyState[1])
          .then((response) => response.json())
          .then((data: any[]) => {
            console.log(data);
            const fileName = 'YourData.csv';
            const exportType = exportFromJSON.types.csv;
            exportFromJSON({ data, fileName, exportType })
        });
    };
      

    return (
        <Container fluid className='px-0 min'>
            <div className='Header'>
                <h1 className='data-header p-5'>Data</h1>
                <Container fluid="xl">
                    <Searchbar countyCallBack={countyCallBack} />
                </Container>
            </div>

            <br />

            <h2 className="text-center">Now Viewing Results For: <br /> {selectedCounty} </h2>
            <div>
                <DropdownBtn onOptionSelected={handleOptionSelected} />
            </div>

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
                    onButtonJSONClicked={handleButtonJSONClicked}
                    onButtonCSVClicked={handleButtonCSVClicked}
                />

                <br />
                <br />
            </Container>
        </Container>
    );
}

export { Data };