const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: Product
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
}
  // be sure to include its associated Products
);

router.get('/:id', async (req, res) => {
  //   find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, { 
      include: Product 
      });
    if (!categoryData) {
      res.status(404).json({ message: 'Couldnt locate category' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  // create a new category
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category_data = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (category_data[0] !== 0) {
      const updated_category = await Category.findByPk(req.params.id, {
        include: [{ model: Product }]
      });
      const message = 'Category succesfully updated';
      res.status(200).json({ message: message, updated_category: updated_category });
    } else {
      res.status(400).json({ message: "No category was found" })
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
);

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
