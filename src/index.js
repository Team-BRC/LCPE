async function fetchData() {
  // Load environment variables from .env file
  const response = await fetch(`/api`);
  const data = await response.json();
  console.log(data);
  return data;
}

export default fetchData;
