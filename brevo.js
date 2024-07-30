const axios = require('axios');

const brevoInstance = axios.create({
    baseURL: 'https//api.brevo.com/v3',
    headers: { 'api-key': process.env.BREVO_API_KEY }
});

module.exports = brevoInstance;