// second page

$(document).ready(function () {
  const Newwindow = new URLSearchParams(window.location.search);
  const pId = Newwindow.get("productId")
  const API_END_POINT_PRODUCT = "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + pId;
  //console.log(pId)
  function onApiCallSuccess(productData) {

    var add = document.getElementById("Addcontainer")

    var container = document.createElement("div");
    container.classList.add("full")


    var left = document.createElement("div");
    var right = document.createElement("div");
    container.append(left, right);
    container.style.marginTop = "6rem";
    container.style.display = "flex";

    //left wing
    left.style.width = "30%";

    var img = document.createElement("img");
    img.src = productData.preview;
    left.append(img)
    img.style.width = "100%";
    img.style.height = "100%";

    //right wing
    right.style.width = "60%";
    right.style.height = "80vh";
    right.style.marginLeft = "30px";

    var h1 = document.createElement("h1");
    h1.innerText = productData.name;
    h1.classList.add("h1");

    var brand = document.createElement("p");
    brand.innerText = productData.brand;
    brand.classList.add("brand");

    var price = document.createElement("span");
    price.innerText = " Price: Rs ";
    price.classList.add("price")

    var price1 = document.createElement("span");
    price1.innerText = productData.price;
    price.append(price1);
    price1.style.color = "#009688";
    price1.style.fontWeight = "bold";
    price1.style.fontSize = "20px";
    price1.style.letterSpacing = "1px";

    var description1 = document.createElement("p");
    description1.innerText = "Description";
    description1.classList.add("description1");

    var description = document.createElement("p");
    description.innerText = productData.description;
    description.classList.add("description");

    var productpreview = document.createElement("p");
    productpreview.innerText = "Product Preview";
    productpreview.classList.add("productpreview")

    right.append(h1, brand, price, description1, description, productpreview);
    var body = document.body;
    body.append(container);

    var preImage = document.createElement("div");
    right.append(preImage);
    function onImg(e) {
      var src = e.target.src;
      img.src = src;

      var activeElement = document.getElementsByClassName("active");
      activeElement[0].classList.remove("active");
      e.target.classList.add("active");
    }

    //loop
    for (var i = 0; i < productData.photos.length; i++) {
      var imageUrl = productData.photos[i];
      var img1 = document.createElement("img");
      img1.src = imageUrl;
      img1.id = "width";
      if (i == 0) {
        img1.classList.add("active");
      }
      preImage.append(img1);
      img1.addEventListener('click', onImg)

    }
    var btn = document.createElement("button");
    btn.innerText = "add to Cart";
    btn.classList.add("btn");
    right.append(btn)
    add.append(container);

    /********************************************** */

    btn.addEventListener("click", function () {

      var cartcount = $("#cart-count").text()

      cartcount = parseInt(cartcount)
      cartcount++
      $('#cart-count').text(cartcount)

      //localStorage.setItem("cartcount",JSON.stringify(productList))
      //

      if (localStorage.getItem("Product List")) {
        var productList = JSON.parse(localStorage.getItem("Product List"))
        var state = false
        for (var i = 0; i < productList.length; i++) {
          if (productList[i].id === pId) {
            productList[i].count++
            localStorage.setItem("Product List", JSON.stringify(productList))
            state = true
          }
        }


        if (!state) {
          var obj = productData
          obj.count = 0
          obj.count++
          productList.push(obj)
          localStorage.setItem("Product List", JSON.stringify(productList))
        }
      }
      else {
        var productList = []
        var obj = productData
        obj.count = 0
        obj.count++
        productList.push(obj)
        localStorage.setItem("Product List", JSON.stringify(productList))
      }

    });

    /***************************************************** */
  }
  $("#cart-wrapper").on("click", function (e) {

    const cartid = e.currentTarget.id;
    window.location = "checkout.html?productData=" + cartid;
  })

  function onApiCallError(error) {
    console.log("error")
  }

  $.ajax({
    method: "GET",
    url: API_END_POINT_PRODUCT,
    success: onApiCallSuccess,
    error: onApiCallError,
  });

});