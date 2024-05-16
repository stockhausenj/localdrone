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