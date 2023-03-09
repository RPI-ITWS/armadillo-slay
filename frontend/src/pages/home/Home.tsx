import {Container} from 'react-bootstrap'
import {APISection} from "@/pages/home/api-section";
import {HeroSection} from "@/components/hero";
import {Section} from "@/components/section";
import React from "react";

interface ISection {
    title: string,
    description: string,
    image: string,
    callToAction: string,
    callback: () => void,
    flip?: boolean

    content?: React.ReactElement

}

function Home() {

    const sections: Array<ISection> = [
        {
            title: "The Data Source",
            description: "The data used in this project is from NASA's POWER project. POWER stands for Prediction of Worldwide Energy Resource. The data is collected from satellites and weather stations around the world. The data is collected in 30 minute intervals and is available for the past 30 years. The data is available in a variety of formats including CSV, JSON, and NetCDF. The data is available for download and can be used for free.",
            image: "https://eoimages.gsfc.nasa.gov/images/imagerecords/150000/150967/globalnox_mdl_2020_lrg.png",
            callToAction: "Go to Data Source",
            callback: () => {
                console.log("Go to Data Source")
            }

        },
        {
            title: "The Data",
            description: "To view the data, go to the Data section of this website. The data is available in CSV, JSON, and NetCDF formats. The data is available for download and can be used for free.",
            image: "https://www.researchgate.net/profile/Serkan-Abbasoglu/publication/299533673/figure/tbl1/AS:1042479998582786@1625558008871/NASA-surface-meteorology-and-solar-energy-database-parameters.png",
            callToAction: "Go to Data",
            callback: () => {
                console.log("Go to Data")
            },
            flip: true
        },
        {
            title: "The Visualizations",
            description: "To view the visualizations, go to the Visualizations section of this website. The visualizations are available in a variety of formats. The visualizations are available for download and can be used for free.",
            image: "https://www.nasa.gov/sites/default/files/thumbnails/image/figure_es1a.png",
            callToAction: "Go to Visualizations",
            callback: () => {
                console.log("Go to Visualizations")
            }
        },
        {
            title: "The API",
            description:
                "To view the API, go to the API section of this website. The API is a RESTful API that allows users to query the data. The API is available in JSON and CSV formats. " +
                "The API is also available in NetCDF format. The API is available for free and can be used for free.\n" +
                "The API is presented in a table format. The table is sortable and searchable. The table is also filterable. The table is filterable by location, date, and variable. The table is searchable by location, date, and variable."
            ,
            image: "https://www.nasa.gov/sites/default/files/thumbnails/image/figure_es1a.png",
            callToAction: "Go to API",
            callback: () => {
                console.log("Go to API")

            },
            flip: true,
            content: <APISection/>
        }
    ];


    return (
        <Container fluid className='px-0 min-vw-100 min'>
            <HeroSection/>
            <Container fluid="lg">
                {sections.map(
                    (section, index) =>
                        <Section
                            key={index}
                            title={section.title}
                            description={section.description}
                            image={section.image}
                            callToAction={section.callToAction}
                            callback={section.callback}
                            flip={section.flip || false}
                            content={section.content}
                        />
                )}
            </Container>
        </Container>
    )
}

export {
    Home
}