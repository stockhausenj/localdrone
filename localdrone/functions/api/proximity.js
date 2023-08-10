export async function onRequest(context) {

  try {
    const url = new URL(context.request.url);
    const params = url.searchParams;

    const zipCode1 = params.get('zip1');
    const zipCode2 = params.get('zip2');

    if (!zipCode1 || !zipCode2) {
      return new Response(JSON.stringify({ error: 'Please provide both zip codes.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const [coords1, coords2] = await Promise.all([
      getCoordinates(zipCode1),
      getCoordinates(zipCode2)
    ]);

    const distance = calculateDistance(coords1, coords2);

    const result = {
      zipCode1,
      zipCode2,
      distance: distance.toFixed(2),
      unit: 'miles'
    };
    
    return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'An error occurred: ' + error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
  
  
  async function getCoordinates(zipCode) {
    const apiUrl = `https://api.zippopotam.us/us/${zipCode}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
  
    if (!data.places || data.places.length === 0) {
      throw new Error(`Invalid or unsupported zip code: ${zipCode}`);
    }
  
    const place = data.places[0];
    const latitude = parseFloat(place['latitude']);
    const longitude = parseFloat(place['longitude']);
  
    if (isNaN(latitude) || isNaN(longitude)) {
      throw new Error(`Invalid coordinates for zip code: ${zipCode}`);
    }
  
    return { latitude, longitude };
  }
  
  function calculateDistance(coords1, coords2) {
    const earthRadius = 3958.8; // Earth's radius in miles
    const lat1 = degToRad(coords1.latitude);
    const lon1 = degToRad(coords1.longitude);
    const lat2 = degToRad(coords2.latitude);
    const lon2 = degToRad(coords2.longitude);
  
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
  
    return distance;
  }
  
  function degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }
}