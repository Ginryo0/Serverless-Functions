const result = document.querySelector('.result');

const fetchData = async () => {
  try {
    const { data } = await axios('/api/1-hello');
    console.log(data);
    result.textContent = data;
  } catch (error) {
    console.log(error.response.data);
  }
};

fetchData();
