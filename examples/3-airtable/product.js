const result = document.querySelector('.result');

const fetchProd = async () => {
  result.innerHTML = '<h2>Loading...</h2>';
  try {
    const idQuery = window.location.search;
    const {
      data: { fields },
    } = await axios(`/api/3-airtable-complete${idQuery}`);
    const { name, desc, price, img } = fields;
    result.innerHTML = `<h1 class="title">${name}</h1>
    <article class="product">
      <img class="product-img"
      src="${img[0].url}"
      alt="${name}"
      />
      <div class="product-info">
        <h5 class="title">${name}</h5>
        <h5 class="price">$${price}</h5>
        <p class="desc">${desc}</p>
      </div>
    </article>`;
  } catch (error) {
    result.innerHTML = `<h2>${error.response.data}</h2>`;
  }
};

fetchProd();
