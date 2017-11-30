import Quandl from 'react';

var Quandl = require('quandl');

var quandl = new Quandl();

const options = {
  auth_token: 'zyrYsZstgPbhDmNUupNy',
};

quandl.configure(options);

var quandl = new Quandl({
  auth_token: 'zyrYsZstgPbhDmNUupNy',
  api_version: 3,
});

quandl.dataset(
  {
    source: 'WIKI',
    table: 'FB',
  },
  {
    order: 'asc',
    exclude_column_names: true,
    // Notice the YYYY-MM-DD format
    start_date: '2015-01-30',
    end_date: '2016-01-29',
    column_index: 4,
  },
  (err, response) => {
    if (err) throw err;

    console.log(response);
  },
);
