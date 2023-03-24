const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const allCategories = await Category.findAll({
    include: [Product],
  });
  console.log(allCategories);
  const parsedCategories = allCategories.map((category) =>
    category.get({ plain: true })
  );
  return res.status(200).json(parsedCategories);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const id = req.params.id;
  const oneCategory = await Category.findByPk(id, {
    include: [Product],
  });
  if (!oneCategory) {
    return res.status(404).json({ message: "This doesn't exist" });
  }
  console.log(oneCategory, "oneCategory");
  const parsedOneCategory = oneCategory.get({ plain: true });
  return res.status(200).json(parsedOneCategory);
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const categoryName = req.body.category_name;
    const newCategory = await Category.create({ category_name: categoryName });
    const parsedNewCategory = newCategory.get({ plain: true });
    return res.status(200).json({ parsedNewCategory });
  } catch (err) {
    return res.status(400).json({ message: "Category was not created" });
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateCategory[0]) {
      res.status(400).json({ message: "Category not updated" });
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({ deleteCategory });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
