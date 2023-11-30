function KiemtraDangNhap(){
      var username = document.getElementById("username").value
      var password = document.getElementById("password").value

      if(username != "" && password != ""){
        alert("Đăng nhập thành công!")
        return false
      }else{
        alert("Đăng nhập thất bại, mời nhập lại!")
      }
}
function Guithongtin(){
    var username2 = document.getElementById("username2").value
    if(username2 != ""){
        alert("Quang perfume đã nhận thông tin từ bạn hệ thống sẽ gửi mật khẩu vào email của bạn sớm nhất!")
        return false
    }
}
function Kiemtradangky(){
  var password=document.getElementById("password").value
  var re_password=document.getElementById("re_password").value
  if(password != re_password || password==""){
    alert("mật khẩu chưa khớp,mời nhập lại!")
    return false
  }else{
      alert("bạn đã đăng kí thành công!")
  }
}
function KiemtraGui(){
  var comment=document.getElementById("comment").value
  if(comment !=""){
    alert("Bạn đã gửi thông tin thành công!")
    return false
  }else{
    alert("Vui lòng điền thông tin!")
  }
  return true
  
}
