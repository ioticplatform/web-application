import React, { useState, useEffect } from "react";
import { renderButton, checkSignedIn } from "../../utils";
import Report from "../../report";
import {addDays} from "date-fns";
import { Line } from "react-chartjs-2";
import {
    ChartWrapper,
    ReportWrapper,
    ChartTitle,
    Subtitle,
    DatepickerRow,
} from "./styles";
import CustomDatePicker from "./datepicker";
import { queryReport } from "./queryReport";
import { formatDate } from "./utils";

function GoogleAnalytics() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const updateSignin = (signedIn) => { //(3)
        setIsSignedIn(signedIn);
        if (!signedIn) {
            renderButton();
        }
    };

    const init = () => { //(2)
        checkSignedIn()
            .then((signedIn) => {
                updateSignin(signedIn);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        window.gapi.load("auth2", init); //(1)
    });

    const INITIAL_STATE = {
        labels: [],
        values: [],
    };
    const [reportData, setReportData] = useState(INITIAL_STATE);
    const [startDate, setStartDate] = useState(addDays(new Date(), -10));
    const [endDate, setEndDate] = useState(new Date());
    const [average, setAverage] = useState(0);

    const displayResults = (response) => {
        const queryResult = response.result.reports[0].data.rows;
        const total = response.result.reports[0].data.totals[0].values[0];
        setAverage(parseInt(total / response.result.reports[0].data.rowCount));
        let labels = [];
        let values = [];
        queryResult.forEach((row) => {
            labels.push(formatDate(row.dimensions[0]));
            values.push(row.metrics[0].values[0]);
        });
        setReportData({
            ...reportData,
            labels,
            values,
        });
    };

    const data = {
        labels: reportData.labels,
        datasets: [
            {
                label: `Users per day`,
                fill: false,
                lineTension: 0.3,
                borderColor: "#35213d",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#375751",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: reportData.values,
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        suggestedMin: 0,
                    },
                },
            ],
            xAxes: [
                {
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 7,
                    },
                },
            ],
        },
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        plugins: {
            datalabels: {
                font: {
                    size: 0,
                },
            },
        },
    };

    useEffect(() => {
        const request = {
            viewID: "243443456",
            startDate,
            endDate,
            metrics: "ga:sessions",
            dimensions: ["ga:date"],
        };
        queryReport(request)
            .then((resp) => displayResults(resp))
            .catch((error) => console.error(error));
    }, [startDate, endDate]);


    return (
        <div>
            {!isSignedIn ? (
                <div id="signin-button"></div>
            ) : (
                <div style={{backgroundColor: "white"}}>
                    <Report />
                    <ReportWrapper>
                        <ChartTitle>{`Users per day`}</ChartTitle>
                        <Subtitle>{`Average - ${average} Users`}</Subtitle>
                        <DatepickerRow>
                            <CustomDatePicker
                                placeholder={"Start date"}
                                date={startDate}
                                handleDateChange={(date) => setStartDate(date)}
                            />
                            <CustomDatePicker
                                placeholder={"End date"}
                                date={endDate}
                                handleDateChange={(date) => setEndDate(date)}
                            />
                        </DatepickerRow>
                        {reportData && (
                            <ChartWrapper>
                                <Line data={data} options={options} width={100} height={250} />
                            </ChartWrapper>
                        )}
                    </ReportWrapper>
                </div>
            )}
        </div>
    );
}

export default GoogleAnalytics;