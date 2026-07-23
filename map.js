// ======================================
// excel.js
// Read Excel Workbook using SheetJS
// ======================================

function loadExcel(filePath) {

    fetch(filePath)
        .then(res => res.arrayBuffer())
        .then(buffer => {

            const workbook = XLSX.read(buffer, {
                type: "array"
            });

            // --------------------------
            // Select the first sheet that
            // contains vehicle data
            // --------------------------

            let sheetName = workbook.SheetNames.find(name =>
                name.toUpperCase().includes("BS-6") ||
                name.toUpperCase().includes("VEHICLE")
            );

            if (!sheetName)
                sheetName = workbook.SheetNames[0];

            console.log("Reading Sheet:", sheetName);

            const worksheet =
                workbook.Sheets[sheetName];

            const raw =
                XLSX.utils.sheet_to_json(
                    worksheet,
                    {
                        defval: ""
                    }
                );

            const cleaned =
                raw.map(parseRow);

            console.log(cleaned);

            onExcelLoaded(cleaned);

        })
        .catch(err => {

            console.error(err);

            alert("Unable to load Excel file.");

        });

}


// ======================================
// Detect column names automatically
// ======================================

function parseRow(row) {

    return {

        Vehicle:

            pick(row,
                [
                    "Vehicle Number",
                    "Vehicle No",
                    "Vehicle",
                    "Bus Number",
                    "Bus No"
                ]),

        Type:

            pick(row,
                [
                    "Type",
                    "Service Type",
                    "Vehicle Type",
                    "Category"
                ]),

        Depot:

            pick(row,
                [
                    "Depot",
                    "Depot Name",
                    "Unit"
                ]),

        Engine:

            pick(row,
                [
                    "Engine",
                    "Engine Make",
                    "Engine Manufacturer"
                ]),

        Route:

            pick(row,
                [
                    "Route",
                    "Route No",
                    "Route Number"
                ]),

        Latitude:

            Number(
                pick(row,
                    [
                        "Latitude",
                        "Lat",
                        "LAT"
                    ])
            ),

        Longitude:

            Number(
                pick(row,
                    [
                        "Longitude",
                        "Lon",
                        "Long",
                        "LON"
                    ])
            )

    };

}


// ======================================
// Utility
// Finds first matching column
// ======================================

function pick(obj, names) {

    for (const key of names) {

        if (
            obj.hasOwnProperty(key) &&
            obj[key] !== ""
        ) {

            return obj[key];

        }

    }

    return "";

}


// ======================================
// Future Support
// Read every sheet if required
// ======================================

function getWorkbookSheets(workbook) {

    return workbook.SheetNames.map(name => {

        return {

            name,

            rows:
            XLSX.utils.sheet_to_json(
                workbook.Sheets[name],
                {
                    defval: ""
                }
            )

        };

    });

}
