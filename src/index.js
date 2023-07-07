// write your code here
const BASE_URL = 'http://localhost:3000';
const RAMENS_URL = `${BASE_URL}/ramens`;

const ramenMenu = document.querySelector('#ramen-menu');
const ramenDetail = document.querySelector('#ramen-detail');
const newRamenForm = document.querySelector('#new-ramen-form');

// Function to fetch all ramen objects
function fetchRamens() {
  fetch(RAMENS_URL)
    .then((response) => response.json())
    .then((ramens) => {
      ramens.forEach((ramen) => {
        renderRamenCard(ramen);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

// Function to render a ramen card in the ramen menu
function renderRamenCard(ramen) {
  const card = document.createElement('div');
  card.innerHTML = `<img src="${ramen.image}">`;
  card.addEventListener('click', () => {
    renderRamenDetail(ramen);
  });
  ramenMenu.appendChild(card);
}

// Function to render the ramen details in the ramen detail section
function renderRamenDetail(ramen) {
  ramenDetail.innerHTML = `
    <img src="${ramen.image}">
    <h2>${ramen.name}</h2>
    <h3>${ramen.restaurant}</h3>
    <form id="edit-ramen-form">
      <label for="new-rating">Rating:</label>
      <input type="number" id="new-rating" value="${ramen.rating}">
      <label for="new-comment">Comment:</label>
      <textarea id="new-comment">${ramen.comment}</textarea>
      <input type="submit" value="Update">
    </form>
  `;

  const editRamenForm = document.querySelector('#edit-ramen-form');
  editRamenForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newRating = document.querySelector('#new-rating').value;
    const newComment = document.querySelector('#new-comment').value;

    updateRamen(ramen.id, newRating, newComment);
  });
}

// Function to add a new ramen
function addNewRamen(event) {
  event.preventDefault();
  const image = document.querySelector('#new-ramen-image').value;
  const name = document.querySelector('#new-ramen-name').value;
  const restaurant = document.querySelector('#new-ramen-restaurant').value;

  const newRamen = {
    image: image,
    name: name,
    restaurant: restaurant,
  };

  renderRamenCard(newRamen);

  newRamenForm.reset();
}

// Function to update a ramen
function updateRamen(id, rating, comment) {
  const updatedRamen = {
    rating: rating,
    comment: comment,
  };

  fetch(`${RAMENS_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(updatedRamen),
  })
    .then((response) => response.json())
    .then((ramen) => {
      const currentRamenCard = ramenMenu.querySelector(`img[src="${ramen.image}"]`);
      currentRamenCard.parentElement.classList.remove('selected');
      renderRamenDetail(ramen);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Event listeners
newRamenForm.addEventListener('submit', addNewRamen);

// Fetch ramens on page load
fetchRamens();
