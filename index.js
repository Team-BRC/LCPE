require('dotenv').config();

async function fetchData() {
  let url =
    `http://localhost:3000/api` ||
    `http://${process.env.HOST}:${process.env.PORT}/api`;

  const response = await fetch(url); // Adjust the URL to match your backend's endpoint
  const data = await response.json();
  console.log(data);
  return data;
}

export default fetchData;
