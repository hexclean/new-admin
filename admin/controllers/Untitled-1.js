////itt is nezni req.body.price[i]
const updatedExtraPrice = req.body.price;
const updatedExtraDiscountedPrice = req.body.discountedPrice;
const updatedExtraQuantityMin = req.body.quantityMin;
const updatedExtraQuantityMax = req.body.quantityMax;
const updatedExtraMandatory = req.body.mandatory;
const ext = await req.admin.getExtras();

if (Array.isArray(extId)) {
  console.log("2");
  for (let i = 0; extId.length - 1; i++) {
    console.log("3");
    if (status[i] == "on") {
      console.log("4");
      await ProductVariantsExtras.create({
        price: updatedExtraPrice[i],
        discountedPrice: updatedExtraDiscountedPrice[i],
        quantityMin: updatedExtraQuantityMin[i],
        quantityMax: updatedExtraQuantityMax[i],
        mandatory: updatedExtraMandatory[i],
        productVariantId: vrId,
        extraId: extId[i],
        active: typeof status[i] == "on" ? 1 : 0,
      });
      console.log("5");
    }
    console.log("6");
  }
  console.log("7");
} else {
  console.log("8");
  if (typeof status == "undefined") {
    console.log("9");
    return;
  }
  console.log("10");
  await ProductVariantsExtras.create({
    price: updatedExtraPrice,
    discountedPrice: updatedExtraDiscountedPrice,
    quantityMin: updatedExtraQuantityMin,
    quantityMax: updatedExtraQuantityMax,
    mandatory: updatedExtraMandatory,
    productVariantId: vrId,
    extraId: extId,
    active: typeof req.body["status"] !== "undefined" ? 1 : 0,
  });
  console.log("11");
}
console.log("12");

console.log("13");
