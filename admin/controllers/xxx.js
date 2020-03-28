const product = new Product({
  title: { en: enTitle, hu: huTitle, ro: roTitle },
  price: price,
  description: description,
  imageUrl: imageUrl,
  category: category,
  adminId: req.admin,
  extraPrice: price * 10
});

const enTitle = req.body.enTitle;
const roTitle = req.body.roTitle;

const enTitle = req.body.product.title.en;
const roTitle = req.body.product.title.ro;
