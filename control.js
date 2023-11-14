const provinceUrl = "https://provinces.open-api.vn/api/p/?depth=2";
const districtUrl = "https://provinces.open-api.vn/api/p/"; // URL huyện, thay đổi ID khi chọn tỉnh
const wardUrl = "https://provinces.open-api.vn/api/d/"; // URL xã, thay đổi ID khi chọn huyện

const btntinh = document.querySelector("#tinh");
const menutinh = document.querySelector("#list_tinh");

const btnhuyen = document.querySelector("#huyen");
const menuhuyen = document.querySelector("#list_huyen");

const btnxa = document.querySelector("#xa");
const menuxa = document.querySelector("#list_xa");

btntinh.addEventListener("click", function () {
  menutinh.style.display = menutinh.style.display === "none" ? "block" : "none";
});

btnhuyen.addEventListener("click", function () {
  menuhuyen.style.display =
    menuhuyen.style.display === "none" ? "block" : "none";
});

btnxa.addEventListener("click", function () {
  menuxa.style.display = menuxa.style.display === "none" ? "block" : "none";
});

// Sử dụng sự kiện "input" để tìm kiếm tỉnh khi gõ
btntinh.addEventListener("input", function () {
  const searchValue = btntinh.value.trim().toLowerCase();
  const provinceList = document.querySelectorAll("#list_tinh li");
  provinceList.forEach((item) => {
    const text = item.textContent.toLowerCase();
    if (text.includes(searchValue)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  menutinh.style.display = "block";
});

// Sử dụng sự kiện "input" để tìm kiếm huyện khi gõ
btnhuyen.addEventListener("input", function () {
  const searchValue = btnhuyen.value.trim().toLowerCase();
  const districtList = document.querySelectorAll("#list_huyen li");
  districtList.forEach((item) => {
    const text = item.textContent.toLowerCase();
    if (text.includes(searchValue)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  menuhuyen.style.display = "block";
});

// Sử dụng sự kiện "input" để tìm kiếm xã khi gõ
btnxa.addEventListener("input", function () {
  const searchValue = btnxa.value.trim().toLowerCase();
  const wardList = document.querySelectorAll("#list_xa li");
  wardList.forEach((item) => {
    const text = item.textContent.toLowerCase();
    if (text.includes(searchValue)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  menuxa.style.display = "block";
});

document.addEventListener("mousedown", function (event) {
  const target = event.target;
  if (!target.closest("#tinh") && !target.closest("#list_tinh")) {
    menutinh.style.display = "none";
  }
  if (!target.closest("#huyen") && !target.closest("#list_huyen")) {
    menuhuyen.style.display = "none";
  }
  if (!target.closest("#xa") && !target.closest("#list_xa")) {
    menuxa.style.display = "none";
  }
});

menutinh.addEventListener("click", function (event) {
  const target = event.target;
  const option = target.textContent;
  if (option) {
    btntinh.value = option;
    menutinh.style.display = "none";
    // Đổi đường dẫn để lấy danh sách huyện của tỉnh đã chọn
    const provinceId = target.getAttribute("code");
    fetch(`${districtUrl}${provinceId}?depth=2`)
      .then((response) => response.json())
      .then((data) => {
        const districtList = document.getElementById("list_huyen");
        const data1 = data.districts;
        districtList.innerHTML = ""; // Xóa danh sách huyện cũ
        data1.forEach((district) => {
          const listItem = document.createElement("li");
          listItem.textContent = district.name;
          listItem.setAttribute("code", district.code);
          districtList.appendChild(listItem);
        });
      })
      .catch((error) => console.error("Lỗi khi lấy danh sách huyện:", error));
  }
});

menuhuyen.addEventListener("click", function (event) {
  const target = event.target;
  const option = target.textContent;
  if (option) {
    btnhuyen.value = option;
    menuhuyen.style.display = "none";
    // Đổi đường dẫn để lấy danh sách xã của huyện đã chọn
    const districtId = target.getAttribute("code");
    fetch(`${wardUrl}${districtId}?depth=2`)
      .then((response) => response.json())
      .then((data) => {
        const wardList = document.getElementById("list_xa");
        const data1 = data.wards;
        wardList.innerHTML = ""; // Xóa danh sách xã cũ
        data1.forEach((ward) => {
          const listItem = document.createElement("li");
          listItem.textContent = ward.name;
          listItem.setAttribute("code", ward.code);
          wardList.appendChild(listItem);
        });
      })
      .catch((error) => console.error("Lỗi khi lấy danh sách xã:", error));
  }
});

menuxa.addEventListener("click", function (event) {
  const target = event.target;
  const option = target.textContent;
  if (option) {
    btnxa.value = option;
    menuxa.style.display = "none";
  }
});

fetch(provinceUrl)
  .then((response) => response.json())
  .then((data) => {
    const provinceList = document.getElementById("list_tinh");
    data.forEach((province) => {
      const listItem = document.createElement("li");
      listItem.textContent = province.name;
      listItem.setAttribute("code", province.code);
      provinceList.appendChild(listItem);
    });
  })
  .catch((error) => console.error("Lỗi khi lấy danh sách tỉnh:", error));



// now when i click submid button, i want to get all the value of input and select tag
document.addEventListener("DOMContentLoaded", function () {
  // Lắng nghe sự kiện click vào nút Submit
  document.getElementById("submit").addEventListener("click", function () {
    // Gọi hàm để đọc dữ liệu và chuyển đổi thành JSON
    submitForm();
  });
});

function submitForm() {
  // Khởi tạo đối tượng JSON để lưu trữ dữ liệu
  var formData = {};

  // Lặp qua tất cả các thẻ input và select
  var inputs = document.querySelectorAll("input, select");
  inputs.forEach(function (input) {
    // Kiểm tra nếu là input hoặc select có giá trị
    if (input.value.trim() !== "") {
      // Lưu trữ giá trị vào đối tượng JSON
      formData[input.id] = input.value;
    }
  });

  // Chuyển đổi đối tượng JSON thành chuỗi JSON
  var jsonData = JSON.stringify(formData);

  // Hiển thị chuỗi JSON trong console (có thể gửi dữ liệu đến máy chủ ở đây)
  console.log(jsonData);
}
