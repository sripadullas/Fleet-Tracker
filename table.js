// ======================================
// charts.js
// Chart.js Dashboard Charts
// ======================================

let serviceChart;
let depotChart;

// ======================================
// Create Charts
// ======================================

function createCharts(data){

    createServiceChart(data);

    createDepotChart(data);

}

// ======================================
// Update Charts
// ======================================

function updateCharts(data){

    updateServiceChart(data);

    updateDepotChart(data);

}

// ======================================
// Service Type Chart
// ======================================

function createServiceChart(data){

    const ctx =
        document
        .getElementById("serviceChart");

    const stats =
        getServiceStats(data);

    serviceChart =
        new Chart(ctx,{

            type:"bar",

            data:{

                labels:[
                    "City Ordinary",
                    "Metro Express",
                    "Metro Deluxe",
                    "EV",
                    "Others"
                ],

                datasets:[{

                    label:"Number of Buses",

                    data:[
                        stats.ordinary,
                        stats.express,
                        stats.deluxe,
                        stats.ev,
                        stats.others
                    ],

                    borderWidth:1

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                plugins:{

                    legend:{
                        display:false
                    },

                    title:{
                        display:true,
                        text:"Service Type Distribution"
                    }

                }

            }

        });

}

// ======================================

function updateServiceChart(data){

    const stats =
        getServiceStats(data);

    serviceChart.data.datasets[0].data=[

        stats.ordinary,
        stats.express,
        stats.deluxe,
        stats.ev,
        stats.others

    ];

    serviceChart.update();

}

// ======================================
// Depot Chart
// ======================================

function createDepotChart(data){

    const ctx =
        document
        .getElementById("depotChart");

    const depotData =
        getDepotStats(data);

    depotChart =
        new Chart(ctx,{

            type:"bar",

            data:{

                labels:depotData.labels,

                datasets:[{

                    label:"Buses",

                    data:depotData.values,

                    borderWidth:1

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                indexAxis:"y",

                plugins:{

                    title:{

                        display:true,

                        text:"Top Depots"

                    }

                }

            }

        });

}

// ======================================

function updateDepotChart(data){

    const depotData =
        getDepotStats(data);

    depotChart.data.labels =
        depotData.labels;

    depotChart.data.datasets[0].data =
        depotData.values;

    depotChart.update();

}

// ======================================
// Service Statistics
// ======================================

function getServiceStats(data){

    const stats={

        ordinary:0,
        express:0,
        deluxe:0,
        ev:0,
        others:0

    };

    data.forEach(bus=>{

        const t =
            (bus.Type||"")
            .toLowerCase();

        if(t.includes("ordinary"))
            stats.ordinary++;

        else if(t.includes("metro express"))
            stats.express++;

        else if(t.includes("metro deluxe"))
            stats.deluxe++;

        else if(t.includes("ev"))
            stats.ev++;

        else
            stats.others++;

    });

    return stats;

}

// ======================================
// Depot Statistics
// ======================================

function getDepotStats(data){

    const counts={};

    data.forEach(bus=>{

        const depot =
            bus.Depot || "Unknown";

        counts[depot] =
            (counts[depot]||0)+1;

    });

    const sorted =
        Object.entries(counts)
        .sort((a,b)=>b[1]-a[1])
        .slice(0,10);

    return{

        labels:
            sorted.map(x=>x[0]),

        values:
            sorted.map(x=>x[1])

    };

}
