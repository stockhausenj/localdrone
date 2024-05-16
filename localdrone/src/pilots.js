export async function getPilots() {
  const apiUrl = '/api/pilots';
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