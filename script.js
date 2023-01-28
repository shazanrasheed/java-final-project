

$('.mainsection').slick({
    dots:true,
    infinite:true,
    speed:300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  });

  $(document).ready(function(){


  // grids accessories and clothes

const API_END_POINT = "https://5d76bf96515d1a0014085cf9.mockapi.io/product"

function onApiCallSuccess(productList) {

  var access = document.getElementById("accessories");
  var clothes = document.getElementById("dresses");

  for(var count = 0; count < productList.length; count++){
    var productInfo = productList[count];

    var div1 = document.createElement("div");
    div1.classList.add("card");
    div1.id = productInfo.id;

    var body = document.body;
    body.append(div1);

    var img = document.createElement("img");
    img.src = productInfo.preview;

    var info = document.createElement("div");
     info.classList.add("info");

    var h2 = document.createElement("h2");
    h2.innerText = productInfo.name;

    var para = document.createElement("p");
    para.innerText = productInfo.brand;

    var span = document.createElement("span");
    span.innerText = "Rs" + productInfo.price;

    info.append(h2,para,span);
     
    div1.append(img,info);

    if(productInfo.isAccessory === 
        true){
        access.append(div1);   
    }
    else{
        clothes.append(div1);
    }
   

  }
  $(".card").on("click",function(e){
    const id = e.currentTarget.id;
  
    location.href = "\product.html?productId=" +id;
    console.log("clicked")
  });

  $("#cart-wrapper").on("click", function (e) {

    const cartid = e.currentTarget.id;
    window.location = "checkout.html?productData=" + cartid;
  })

}

  function onApiCallError(error) {
    console.log("error")
}

  $.ajax({
    method: "GET",
    url: API_END_POINT,
    success: onApiCallSuccess,
    error: onApiCallError,
});

  })

    