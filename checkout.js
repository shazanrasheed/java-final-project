if (localStorage.getItem("Product List")) {
  var productList = localStorage.getItem("Product List");
  productList = JSON.parse(productList);
} else {
  var productList = [];
}
function createCard(product) {
  var card = $("<div>").addClass("product-card");
  var imgDiv = $("<div>");
  var detailsDiv = $("<div>");
  var productImg = $("<img>").attr({
    class: "product-img",
    src: product.photos[0],
  });
  imgDiv.append(productImg);
  var name = $("<h4>").text(product.name);
  var count = $("<p>").text("x" + product.count);
  var priceTotal = product.count * product.price;
  var amount = $("<p>").append([
    $("<span>").text("Amount: Rs "),
    $("<span>").text(priceTotal),
  ]);
  detailsDiv.append(name, count, amount);
  card.append(imgDiv, detailsDiv);
  $("#product-cards").append(card);
  return priceTotal;
}
var cardsCount = 0;
var totalPrice = 0;
for (var i = 0; i < productList.length; i++) {
  var priceEach = createCard(productList[i]);
  totalPrice += priceEach;
  cardsCount++;
}
console.log(productList
  )
$("#item-count").text(cardsCount);
$("#total-cost").text(totalPrice);


$("#place-order-btn").click(function () {
  if (cardsCount === 0){
    alert("No items in cart")

  }

else{
  location.href = "order.html?";
}
  localclear()
});