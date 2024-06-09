const express = require('express');
const cors = require('cors');
const path = require('path');
const products = require('./products');
const app = express();
const port = process.env.PORT || 3008;

app.use(cors());
app.use(express.json());
app.use('/api/public/images', express.static(path.join(__dirname, '../public/images')));

app.get('/api/products', (req, res) => {
  const {
    search,
    category = 'All',
    company = 'All',
    order = 'a-z',
    price = 100000,
    shipping = false,
    page = 1,
    pageSize = 9
  } = req.query;

  let filteredProducts = products.data;

  if (search) {
    filteredProducts = filteredProducts.filter(product =>
      product.attributes.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category !== 'All') {
    filteredProducts = filteredProducts.filter(product =>
      product.attributes.category === category
    );
  }

  if (company !== 'All') {
    filteredProducts = filteredProducts.filter(product =>
      product.attributes.company === company
    );
  }

  if (shipping === 'true') {
    filteredProducts = filteredProducts.filter(product =>
      product.attributes.shipping === true
    );
  }

  filteredProducts = filteredProducts.filter(product =>
    parseInt(product.attributes.price) <= parseInt(price)
  );

  switch (order) {
    case 'a-z':
      filteredProducts.sort((a, b) =>
        a.attributes.title.localeCompare(b.attributes.title)
      );
      break;
    case 'z-a':
      filteredProducts.sort((a, b) =>
        b.attributes.title.localeCompare(a.attributes.title)
      );
      break;
    default:
      break;
  }

  const total = filteredProducts.length;
  const pageCount = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const pagination = {
    page: parseInt(page),
    pageSize: parseInt(pageSize),
    pageCount,
    total
  };

  res.json({
    data: paginatedProducts,
    meta: {
      pagination,
      categories: products.meta.categories,
      companies: products.meta.companies
    }
  });
});

app.get('/api/products/featured', (req, res) => {
  const featuredProducts = products.data.filter(product => product.attributes.featured);
  res.json({
    data: featuredProducts,
    meta: products.meta
  });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.data.find(product => product.id === parseInt(req.params.id));
  if (product) {
    res.json({
      data: product,
      meta: {}
    });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
