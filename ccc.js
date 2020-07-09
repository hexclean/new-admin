SELECT varTrans.name as variantName, catTrans.name as catName FROM foodnet.productFinals as prodFin INNER JOIN foodnet.products as prod ON prodFin.productId = prod.id INNER JOIN foodnet.productTranslations as prodTrans ON prodTrans.productId = prod.id INNER JOIN foodnet.productVariants as var ON prodFin.variantId = var.id INNER JOIN foodnet.productVariantTranslations as varTrans ON varTrans.productVariantId = var.id INNER JOIN foodnet.productCategories as cat ON cat.id = varTrans.categoryId inner join foodnet.productCategoryTranslations as catTrans ON catTrans.productCategoryId = cat.id WHERE catTrans.languageId =2 AND varTrans.languageId =2 AND prodTrans.languageId =2;