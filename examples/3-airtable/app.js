const result = document.querySelector('.result');

const fetchData = async () => {
  try {
    const { data } = await axios('/api/3-airtable-complete');
    const products = data
      .map((prod) => {
        const { id, url, name, price } = prod;

        return `<a href="product.html?id=${id}" class="product">
      <img src="${url}" alt="${name}"/>
      <div class="info">
      <h5>${name}</5>
      <h5 class="price">$${price}</h5>
      </div>
      </a>`;
      })
      .join('');
    result.innerHTML = products;
  } catch (error) {}
};

fetchData();
