const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://app.nocodb.com/api/v2/tables/mr7yef8ohuozlhh/records',
  params: { offset: '0', limit: '25', where: '', viewId: 'vwpdf1kmlefi92on' },
  headers: {
    'xc-token': 'QWjPWNlVsWSw4KUgkVsyTzwmsvGRDrYgovy4pyvh'
  }
};

axios.request(options)
  .then(response => {
    console.log("✅ Datos obtenidos de NocoDB:");
    console.log(response.data);
  })
  .catch(error => {
    console.error("❌ Error al obtener los datos:");
    console.error(error.response ? error.response.data : error.message);
  });
