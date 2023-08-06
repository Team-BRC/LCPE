async function fetchData() {
  const response = await fetch("http://localhost:8080"); // Adjust the URL to match your backend's endpoint
  const data = await response.json();
  return data;
}

export default fetchData;