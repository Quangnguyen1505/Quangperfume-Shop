var arrayProd = null;
if(getCookie("ArrayPrd")==""){
    arrayProd = [];
}else{
    arrayProd = JSON.parse(getCookie("ArrayPrd"));
}
$(document).ready(function(){
    $( ".Prod_price" ).each(function(item) {
       var price = numberWithCommas($(this).text());
       $(this).html(price);
    });
    getNumberOfItemsInCart();
    // showCart();
    $('#cartInfo').fadeOut();
});
var check = false;
$(document).on('click', '#btnCart', function() {
    check = !check;
    if(check){
        $('#cartInfo').fadeIn();
        showCart();
    }else{
        $('#cartInfo').fadeOut();
    }
    
});
$(document).on('click', '.btn_add_to_cart', function() {
    console.log(arrayProd);
    var _id = $(this).attr("_id");
    var ProdName = $(this).attr("ProdName");
    var ProdPhoto = $(this).attr("ProdPhoto");
    var ProdPrice = $(this).attr("ProdPrice");
    var checkProduct = false;
    arrayProd.forEach(function(item){
        if(item._id==_id){
            checkProduct = true;
            item.Quantity = item.Quantity + 1;
        }
    });
    if(checkProduct==false){
        arrayProd.push({_id:_id,name:ProdName,Photo:ProdPhoto,Price:ProdPrice,Quantity:1});
    }
    getNumberOfItemsInCart();
    console.log(arrayProd);
    // convert Json 
    var cartStringJson = JSON.stringify(arrayProd);
    console.log(cartStringJson);
    setCookie("ArrayPrd",cartStringJson,30);
    showCart();   
});
function showCart(){
    var TotalOrders = 0;
        $("#tblcard").html(`
            <tr id="row1">
                <td width="10%">MaSP</td>
                <td width="20%">Name</td>
                <td width="20%">Quantity</td>
                <td width="20%">Price</td>
                <td width="30%" colspan="2">$</td>
            </tr>
        `)
    arrayProd.forEach(function(item,k){
        console.log(item);
        var TotalPrice = item.Price * item.Quantity;
        TotalOrders =TotalOrders + TotalPrice;
        $("#tblcard").append(`
            <tr>
                <td>`+(k+1)+`</td>
                <td>`+item.name+`</td>
                <td>
                    <button ordering="`+k+`" class="btnDecrease">-</button>
                    <input class="valQuantity" type="text" value="`+numberWithCommas(item.Quantity)+`">
                    <button ordering="`+k+`" class="btnIncease">+</button>
                </td>
                <td>`+numberWithCommas(item.Price)+`</td>
                <td width="30%">`+numberWithCommas(TotalPrice)+`</td>
                <td><button class="btnRemoveItem" ordering="`+k+`">Xóa</button></td>
            </tr>
        `)
    });
        $("#tblcard").append(`
            <tr>
                <td colspan="4">Tổng Tiền($)</td>
                <td colspan="1">`+numberWithCommas(TotalOrders)+`</td>
                <td colspan="1"><button id="btnDelete">Mua ngay</button></td>
            </tr>
        `)
}
function getNumberOfItemsInCart(){
    var found = 0;
    arrayProd.forEach(function(item){
        found= found + item.Quantity;
    });
    $("#sum-item").html(found);
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
$(document).on("click",".btnRemoveItem",function(){
    var ordering = parseInt($(this).attr("ordering"));
    arrayProd.splice(ordering, 1);
    console.log(arrayProd);
    var cartStringJson = JSON.stringify(arrayProd);
    console.log(cartStringJson);
    setCookie("ArrayPrd",cartStringJson,30);
    getNumberOfItemsInCart();
    showCart();
});
$(document).on("click", ".btnDecrease", function() {
    var ordering = parseInt($(this).attr("ordering"));
    console.log(ordering);
    arrayProd.forEach(function(item,k) {
        if(item.Quantity<=1){
            item.Quantity = 1;
        }else{
            if(ordering==k){
                item.Quantity = item.Quantity - 1;
             }
        }
    });

    var cartStringJson = JSON.stringify(arrayProd);
    setCookie("ArrayPrd", cartStringJson, 30);
    getNumberOfItemsInCart();
    showCart();
});
$(document).on("click", ".btnIncease", function() {
    var ordering = parseInt($(this).attr("ordering"));
    console.log(ordering);
    arrayProd.forEach(function(item,k) {
        if(ordering==k){
           item.Quantity = item.Quantity + 1;
        }
    });

    var cartStringJson = JSON.stringify(arrayProd);
    setCookie("ArrayPrd", cartStringJson, 30);
    getNumberOfItemsInCart();
    showCart();
});
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }