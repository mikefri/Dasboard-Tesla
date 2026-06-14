import fetch from 'node-fetch';

export default async function handler(req, res) {
  const tokenRes = await fetch('https://auth.tesla.com/oauth2/v3/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.TESLA_CLIENT_ID,
      client_secret: process.env.TESLA_CLIENT_SECRET,
      scope: 'openid vehicle_device_data vehicle_cmds vehicle_location',
      audience: 'https://fleet-api.prd.eu.vn.cloud.tesla.com'
    })
  });
  const { access_token } = await tokenRes.json();

  const regRes = await fetch('https://fleet-api.prd.eu.vn.cloud.tesla.com/api/1/partner_accounts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ domain: 'mikefri.github.io' })
  });
  const data = await regRes.json();
  res.json(data);
}
