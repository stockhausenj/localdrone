export async function auth(email, password) {
  const apiUrl = '/api/auth';
  const base64Credentials = btoa(`${email}:${password}`);
  const headers = {
    'Authorization': `Basic ${base64Credentials}`
  };
  const response = await fetch(apiUrl, {
    headers: headers,
  });
  const json = response.json();
  return json;
}

export async function getPilots() {
  const apiUrl = '/api/users';
  const response = await fetch(apiUrl);
  const json = await response.json();
  return json;
}

export async function getProximity(localZip, userZip) {
  const apiUrl = "/api/proximity?zip1=${localZip}&zip2=${userZip}";
  const response = await fetch(apiUrl);
  const json = await response.json();
  return json;
}