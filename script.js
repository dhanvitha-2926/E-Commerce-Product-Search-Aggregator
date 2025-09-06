const productList = document.getElementById('productList');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim().toLowerCase();
  fetchProducts(query);
});

function fetchProducts(query = '') {
  productList.innerHTML = '<li>Loading...</li>';
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      productList.innerHTML = '';
      // If query not empty, filter products by title, description, or category
      const filtered = query
        ? data.filter(
            product =>
              product.title.toLowerCase().includes(query) ||
              product.description.toLowerCase().includes(query) ||
              product.category.toLowerCase().includes(query)
          )
        : data;
      if (filtered.length === 0) {
        productList.innerHTML = '<li>No products found.</li>';
      } else {
        filtered.forEach(product => {
          productList.innerHTML += `
            <li>
              <strong>${product.title}</strong><br>
              Price: $${product.price}<br>
              Category: ${product.category}<br>
              <img src="${product.image}" alt="${product.title}" width="80"><br>
              <a href="#" onclick="window.open('https://fakestoreapi.com/products/${product.id}','_blank')">View API</a>
            </li>
          `;
        });
      }
    })
    .catch(err => {
      productList.innerHTML = `<li>Error loading products.</li>`;
      console.error(err);
    });
}

// Initial load
fetchProducts();
