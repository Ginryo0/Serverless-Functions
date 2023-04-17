const result = document.querySelector('.result');

const fetchData = async () => {
  try {
    const { data } = await axios('/api/2-basic-api');
    const products = data.map(prod => {
      const {image:}
    })
    result.innerHTML = '<h2>yo</h2>';
  } catch (error) {
    result.innerHTML = `<h4>Something went wrong! please try again later.</h4>`;
  }
};

fetchData();
