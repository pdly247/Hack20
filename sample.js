'use strict';

function main() {

    // Import the Google Cloud client library
    const {BigQuery} = require('@google-cloud/bigquery');

    async function query() {
    // Queries a public Shakespeare dataset.

        // Create a client
        const bigqueryClient = new BigQuery();

        // The SQL query to run
        const sqlQuery = `SELECT
            subregion1_code,
            subregion1_name,
            SUM(new_confirmed) as june_confirmed,
            SUM(new_tested) as june_tested,
            SUM(new_confirmed) / SUM(new_tested) AS positive_test_rate
            FROM
            \`bigquery-public-data.covid19_open_data.covid19_open_data\`
            WHERE
            country_code = "US"
            AND aggregation_level = 1
            AND date BETWEEN '2020-07-01' AND '2020-07-30'
            GROUP BY
            subregion1_code,
            subregion1_name 
            ORDER BY
            subregion1_code ASC`;

        const options = {
        query: sqlQuery,
        };

        // Run the query
        const [rows] = await bigqueryClient.query(options);

        console.log('Rows:');
        rows.forEach(row => console.log(row));
    }

    query();
  }

main();
