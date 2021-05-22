// import React from "react";
// import { AnalyticsDashboard } from "react-analytics-charts";
// import { SessionsByDateChart, SessionsGeoChart, SessionsBySourceChart, PageViewsPerPathChart , SessionsByHourChart} from "react-analytics-charts";
//
// export default function GoogleAnalytics() {
//     return (
//         <AnalyticsDashboard style={{color: "white"}}
//             authOptions={{ clientId: "306633733491-q51dbb4a7m882su9dfpqsdmna2lq7pcq.apps.googleusercontent.com" }}
//             renderCharts={(gapi, viewId) => {
//                 const chartStyles = {
//                     margin: "15px",
//                     maxWidth: 400,
//                 };
//                 return (
//                     <div style={{ display: "flex", flexWrap: "wrap" }}>
//                         <SessionsByDateChart
//                             gapi={gapi}
//                             viewId={viewId}
//                             style={chartStyles}
//                             showPageViews
//                             showUsers
//                         />
//                         <SessionsGeoChart
//                             gapi={gapi}
//                             viewId={viewId}
//                             style={chartStyles}
//                             showPageViews
//                             options={{ width: 400 }}
//                         />
//                         <SessionsBySourceChart
//                             gapi={gapi}
//                             viewId={viewId}
//                             style={chartStyles}
//                         />
//                         <SessionsByHourChart gapi={gapi} viewId={viewId} style={chartStyles} />
//                         <PageViewsPerPathChart
//                             gapi={gapi}
//                             viewId={viewId}
//                             style={{ margin: "15px" }}
//                         />
//                     </div>
//                 );
//             }}
//         />
//     );
// }

import React, { useState, useEffect } from "react";
import { renderButton, checkSignedIn } from "../../utils";
import Report from "../../report";

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

    return (
        <div>
            {!isSignedIn ? (
                <div id="signin-button"></div>
            ) : (
                <div style={{backgroundColor: "white"}}>
                    <Report />
                </div>
            )}
        </div>
    );
}

export default GoogleAnalytics;