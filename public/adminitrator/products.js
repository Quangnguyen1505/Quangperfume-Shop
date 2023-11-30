$(document).ready(function(){
    $.post("./listprod", function (data) {
            console.log(data);
            if(data.result==1){
                data.proddata.forEach(function(dt,k){
                    k=k+1
                    $("#danhmuc").append(`
                      <div class="col-lg-4 col-md-6 col-sm-6 col-6">
                          <div class="product-card">
                              <img class="ProdPhoto" src="`+dt.image+`" alt="Product 1">
                              <h4 class="ProdName">`+dt.title+`</h4>
                              <p>`+dt.description+`</p>
                              <p>giá: $`+dt.price_original+`</p>
                              <p class="ProdPrice">giá giảm giá: $`+dt.price_current+` </p>
                              <button class="buy-button mt-2">Mua Ngay</button>
                              <button class="btn_add_to_cart buy-button"
                                _id="`+dt._id+`" ProdName="`+dt.title+`" 
                                ProdPhoto="`+dt.image+`" ProdPrice="`+dt.price_current+`" 
                              >Thêm vào giỏ hàng</button>
                          </div>
                      </div>
                    `)
                });
            }
    });
    // products women
    $.post("./listprod_women",function(data){
        $("#danhmucsanpham").html(`
        <h2 class="mt-3">Danh sách sản phẩm</h2>
        <ul>
            
            <li><a href="sanpham2.html">Nước hoa nam</a></li>
            <li><a href="sanpham1.html">Nước hoa nữ</a></li>
            <li><a href="sanphamkhac.html">sản phẩm khác</a></li>
          </ul>
            <h2 class="qc">Quảng cáo</h2>
            <img class="qc0" src="images/tintuc1.jpg" class="mt-1" style="width: 100%;" alt="">
        `)
        if(data.result==1){
            data.proddata.forEach(function(dt){
                $("#products_women").append(`
                <div class="col-lg-4 col-md-6 col-sm-6 col-6">
                    <div class="product">
                      <img src="`+dt.image+`" alt="Sản phẩm 1">
                      <h4>`+dt.title+`</h4>
                      <p>`+dt.description+`</p>
                      <p>giá: $`+dt.price_original+`</p>
                      <p>giá giảm giá: $`+dt.price_current+` </p>
                      <button class="buy-button" onclick="mua()">Mua ngay</button>
                    </div>
                </div>
                `)
            })
        }
    })
    // products man
    $.post("./listprod_man",function(data){
        $("#danhmucsanpham").html(`
        <h2 class="mt-3">Danh sách sản phẩm</h2>
        <ul>
            
            <li><a href="sanpham2.html">Nước hoa nam</a></li>
            <li><a href="sanpham1.html">Nước hoa nữ</a></li>
            <li><a href="sanphamkhac.html">sản phẩm khác</a></li>
          </ul>
            <h2 class="qc">Quảng cáo</h2>
            <img class="qc0" src="images/tintuc1.jpg" class="mt-1" style="width: 100%;" alt="">
        `)
        if(data.result==1){
            data.proddata.forEach(function(dt){
                $("#products_man").append(`
                <div class="col-lg-4 col-md-6 col-sm-6 col-6">
                    <div class="product">
                      <img src="`+dt.image+`" alt="Sản phẩm 1">
                      <h4>`+dt.title+`</h4>
                      <p>`+dt.description+`</p>
                      <p>giá: $`+dt.price_original+`</p>
                      <p>giá giảm giá: $`+dt.price_current+` </p>
                      <button class="buy-button" onclick="mua()">Mua ngay</button>
                    </div>
                </div>
                `)
            })
        }
    })
    // products other
    $.post("./listprod_other",function(data){
        $("#danhmucsanpham").html(`
        <h2 class="mt-3">Danh sách sản phẩm</h2>
        <ul>
            
            <li><a href="./products_man">Nước hoa nam</a></li>
            <li><a href="./products_women">Nước hoa nữ</a></li>
            <li><a href="./other-products">sản phẩm khác</a></li>
          </ul>
            <h2 class="qc">Quảng cáo</h2>
            <img class="qc0" src="images/tintuc1.jpg" class="mt-1" style="width: 100%;" alt="">
        `)
        if(data.result==1){
            data.proddata.forEach(function(dt){
                $("#other-products").append(`
                <div class="col-lg-4 col-md-6 col-sm-6 col-6">
                    <div class="product">
                      <img src="`+dt.image+`" alt="Sản phẩm 1">
                      <h4>`+dt.title+`</h4>
                      <p>`+dt.description+`</p>
                      <p>giá: $`+dt.price_original+`</p>
                      <p>giá giảm giá: $`+dt.price_current+` </p>
                      <button class="buy-button" onclick="mua()">Mua ngay</button>
                    </div>
                </div>
                `)
            })
        }
    })
});