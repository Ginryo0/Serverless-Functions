const title = document.querySelector('.title h2');
const result = document.querySelector('.result');

const fetchData = async () => {
  try {
    const { data } = await axios.get('/api/4-survey');

    const res = data
      .map((vote) => {
        const { food, votes, id } = vote;
        const key = food.toUpperCase().charAt(0) + food.toUpperCase().charAt(2);
        return `<li>
      <div class="key">${key}</div>
      <div>
      <h4>${food}</h4>
      <p data-votes="${votes}">${votes} votes</p>
      </div>
      <button data-id="${id}">
      <i class="fas fa-vote-yea"></i>
      </button>
      </li>`;
      })
      .join('');
    result.innerHTML = res;
  } catch (error) {
    console.log(error);
    result.innerHTML = '<h4>An error occurred.</h4>';
  }
};

window.addEventListener('load', () => {
  fetchData();
});

result.addEventListener('click', async (e) => {
  if (e.target.classList.contains('fa-vote-yea')) {
    const btn = e.target.parentElement;
    const id = btn.dataset.id;
    const votesEl = btn.previousElementSibling.querySelector('p');
    const votes = votesEl.dataset.votes;
    const newVotes = await updateVote(id, votes);
    title.textContent = 'Survey';
    if (newVotes) {
      votesEl.textContent = `${newVotes} votes`;
      votesEl.dataset.votes = newVotes;
    }
  }
});

const updateVote = async (id, votes) => {
  title.textContent = 'Updating Votes...';
  try {
    const { data } = await axios.put(`/api/4-survey`, { id, votes });
    const newVotes = data.fields.votes;
    return newVotes;
  } catch (err) {
    console.log(err.response);
    return false;
  }
};
