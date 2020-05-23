import fetch from 'node-fetch';

export function handler(event, context, callback) {
  const { API_URL, API_KEY } = process.env;
  const HERO_NAME = event.queryStringParameters.heroName;

  const URL = `${API_URL}${API_KEY}/search/${HERO_NAME}`;

  // Send user response
  const send = body => {
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept'
      },
      body: JSON.stringify(body.results)
    });
  }


  // Perform API call
  const getHero = async () => {
    try {
      const sendURL = await fetch(URL);
      const toJSON  = await sendURL.json();
      return send(toJSON);
    } catch (error) {
      return send(error);
    }
  }

  // make sure method is GET
  if (event.httpMethod == 'GET') {
    getHero();
  }
}