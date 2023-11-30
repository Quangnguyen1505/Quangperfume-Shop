$(document).ready(function(){
    
    //Sign up
    $("#btnSubmit-Signup").click(function(){
        var Email=$("#txtemail").val();
        var Password=$("#txtpassword").val();
        var Name=$("#txtname").val();
        var address=$("#txtaddress").val();
        var mobile=$("#txtmobile").val();
       var data = {Email:Email,Password:Password,Name:Name,address:address,mobile:mobile};
        // Gửi yêu cầu POST với dữ liệu FormData
        jQuery.ajax({
        url: './Register',
        data: data,
        cache: false,
        // contentType: false,
        // processData: false,
        method: 'POST',
        type: 'POST',
        success: function (data) {
            if(data.result==1){
                window.location = "./Quangperfume";
                alert("tao tai khoan thanh cong hay dang nhap");
            }else{
                alert("tao tai khoan that bai")
            }
        }
        });
    });

    //Login
    $("#btnlogin").click(function(){
        var un = $("#txt_username").val();
        var pw = $("#txt_password").val();
        $.post("./Login",{
            Email:un,
            Password:pw
        },function(data){
            console.log(data);
            if(data.result==1){
                setCookie("TOKEN",data.token,30);
                window.location = "./admin";
            }else{
                alert(data.message);
            }
        });
    });

     //logout
     $("#btnlogout").click(function(){
        var data = {Token:getCookie("TOKEN")};
        jQuery.ajax({
            url: './Logout',
            data: data,
            cache: false,
            // contentType: false,
            // processData: false,
            method: 'POST',
            type: 'POST',
            success: function (data) {
                if(data.result==1){
                    window.location = "./Quangperfume";
                    alert("Logout account thanh cong");
                }else{
                    alert("Logout account that bai");
                }
            }
        });

    });

    // task list categories
     function GetCategories(){
        $.post("./administrator/category",function(data){
        if(data.result==1){
            $("#select_categories").html(`<option value="-1">Các loại nước hoa</option>`);
            data.categories.forEach(function(cate){
                $("#select_categories").append(`<option _id="`+cate._id+`" value="`+cate.title+`">`+cate.title+`</option>`)
            });
        }
        })
    }
    GetCategories();

    // upload file
    $("#btnUploadImage").click(function(){
        var data = new FormData();
        jQuery.each(jQuery('#txtFileImage')[0].files, function(i, file) {
            data.append('avatar', file);
        });

        jQuery.ajax({
            url: './uploadfile',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST', // For jQuery < 1.9
            success: function(data){
                if(data.result==1){
                    $("#imgProduct").attr("src","upload/" + data.info.filename);
                    $("#hid_avt").attr("value","upload/" + data.info.filename);
                }else{
                    alert(data.message);
                }
            }
        });
    });

    //add data product database
    $("#btnSubmit_addProd").click(function(){
        var data = new FormData();

        data.append("title", $("#txtTitle").val());
        data.append("category_id", $("#select_categories").val());
        data.append("price_original", $("#txt_price_original").val());
        data.append("price_current", $("#txt_price_current").val());
        data.append("image", $("#hid_avt").val());
        data.append("description", $("#textarea").val());
        // Gửi yêu cầu POST với dữ liệu FormData
        jQuery.ajax({
        url: './addNew/Product',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST',
        success: function (data) {
            window.location = "./products";
        }
        });
    });

    // show list user
    $.post("./listuser", function (data) {
        console.log(data);
        if(data.result==1){
            data.userdata.forEach(function(dt,k){
                k=k+1;
                $("#listuser").append(`
                    <tr>
                        <td class="text-center">`+k+`</td>
                        <td class="txt-oflo">`+dt.Name+`</td>
                        <td><span class="badge bg-success rounded-pill">`+dt.Active+`</span> </td>
                        <td><span class="text-success">`+dt.Email+`</span></td>
                        <td><span class="text-success">`+dt.mobile+`</span></td>
                        <td><a href="javascript:void(0)" class="text-inverse p-r-10" data-bs-toggle="tooltip" title="" data-original-title="Edit"><i class="ti-marker-alt"></i></a> <a class="Delete_User text-inverse" id="`+dt._id+`" title="" data-bs-toggle="tooltip" data-original-title="Delete"><i class="ti-trash"></i></a></td> 
                    </tr>
                `)
            })

            //delete user
            $('.Delete_User').on('click', function(e){
                var id = $(this).attr('id');
                var confirmDelete = confirm("Bạn có chắc muốn xóa item có ID ?");
                if(confirmDelete){
                    $.ajax({
                        type: 'GET',
                        method: 'GET',
                        url: '/delete/user/'+id,
                        success: function(response){
                            window.location = "./users";
                        },
                        error: function(err){
                            console.log(err);
                        }
                    });
                }
            });
        }
    });

    //show list Prod
    $.post("./listprod", function (data) {
        console.log(data);
        if(data.result==1){
            data.proddata.forEach(function(dt,k){
                k=k+1
                $("#listprod").append(`
                    <tr>
                        <td class="text-center">`+k+`</td>
                        <td class="txt-oflo">`+dt.title+`</td>
                        <td><span class="text-success">`+dt.category_id+`</span></td>
                        <td class="txt-oflo"><span><img id="avatar_prod" class="avatar" src="./`+dt.image+`" alt=""></span></td>
                        <td><span class="text-success">$`+dt.price_original+`</span></td>
                        <td><span class="text-success">$`+dt.price_current+`</span></td>
                        <td class="txt-oflo">`+dt.description+`</td>
                        <td><span class="badge bg-success rounded-pill">`+dt.Status+`</span> </td>
                        <td><a href="javascript:void(0)" class="text-inverse p-r-10" data-bs-toggle="tooltip" title="" data-original-title="Edit"><i class="ti-marker-alt"></i></a> <a class="Delete_Cate text-inverse" id="`+dt._id+`" title="" data-bs-toggle="tooltip" data-original-title="Delete"><i class="ti-trash"></i></a></td> 
                    </tr>
                `)
            });

            // delete prod
            $('.Delete_Cate').on('click', function(e){
                var id = $(this).attr('id');
                var confirmDelete = confirm("Bạn có chắc muốn xóa item có ID ?");
                if(confirmDelete){
                    $.ajax({
                        type: 'GET',
                        method: 'GET',
                        url: '/delete/'+id,
                        success: function(response){
                            window.location = "./products";
                        },
                        error: function(err){
                            console.log(err);
                        }
                    });
                }
            });
        }
    });
    // take token logout
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
});
