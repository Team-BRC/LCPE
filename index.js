async function fetchData() {
  // Load environment variables from .env file
  const response = await fetch(`https://brc-lactation-consultant-practice-exam.onrender.com/api`);
  const data = await response.json();
  console.log(data);
  return data;
}

export default fetchData;
