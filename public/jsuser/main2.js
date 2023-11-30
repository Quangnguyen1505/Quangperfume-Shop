    // Biến toàn cục để theo dõi trạng thái chatbox
    var isChatboxOpen = false;

    // Hàm để hiển thị/ẩn chatbox
    function toggleChatbox() {
      var chatbox = document.getElementById("chatbox-container");
      if (isChatboxOpen) {
        chatbox.style.display = "none";
        isChatboxOpen = false;
      } else {
        chatbox.style.display = "block";
        isChatboxOpen = true;
      }
    }
      function Guidi() {
        var input = document.getElementById("chatbox-input");
        var message = input.value.trim().toLowerCase();
        var chatboxBody = document.getElementById("chatbox-body");
        var response = document.createElement("p");
        if (message === "p") {
          response.textContent = "bạn vui lòng đăng nhập ở mục đăng nhập, nếu không có tài khoản vui lòng đăng kí tài khoản !";
        }else if(message === "hello"){
          response.textContent = "Xin chào! Tôi có thể giúp gì cho bạn?";
        }
         else {
          response.textContent = "Xin lỗi, tôi không hiểu. Vui lòng thử lại.";
        }
        chatboxBody.appendChild(response);
      
        // Xóa nội dung đã gửi sau khi xử lý
        input.value = "";
      }
    // Thêm sự kiện click vào biểu tượng chat
    document.getElementById("chatbox-icon").addEventListener("click", toggleChatbox);
    // Thêm sự kiện click vào nút "X"
    document.getElementById("close-button").addEventListener("click", toggleChatbox);
  
// menusticky 
window.onscroll = function() { stickyMenu() };

var navbar = document.querySelector('.navbar');
var sticky = navbar.offsetTop;

function stickyMenu() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}
function mua(){
  bootbox.confirm('Bạn chắc chắn muốn mua!',
        function(result) {
            console.log('This was logged in the callback: ' + result);
            if (result) {
              bootbox.alert('Bạn đã mua thành công,hẹn gặp lại!');
            }
  });
    // bootbox.alert("Bạn đã mua thành công, hẹn gặp lại!")
}

