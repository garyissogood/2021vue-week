// 總數
const totalProducts = document.getElementById('productCount');

// 按鈕
const addProductBtn = document.getElementById('addProduct');
addProductBtn.addEventListener("click", addProductData);

// 資料區
const productList = document.querySelector('#productList');

// 清除全部
const clearAllBtn = document.getElementById('clearAll');
clearAllBtn.addEventListener("click", clearAllData);


// product資料
let productData = [
  {
    id: 101,
    title: "產品A",
    origin_price: 1000,
    price: 699,
    enablend: false
  },
  {
    id: 102,
    title: "產品B",
    origin_price: 2000,
    price: 999,
    enablend: true
  }
]

// --------------------------------------------

init();

// 初始化
function init(){
  // 資料渲染至網頁列表中
  render();
  // 監聽
  productList.addEventListener('click', changeProductData);
}

// 資料渲染到網頁列表
function render(){
  // 列表
  let content = "";
  
  // 總數
  totalProducts.textContent = productData.length;
  
  // 資料渲染
  productData.forEach((item, index) => {
   content += `
     <tr>
        <td>${item.title}</td>
        <td class="text-center"> 
          $ ${parseInt(item.origin_price).toLocaleString()}
        </td>
        <td>
          $ ${parseInt(item.price).toLocaleString()}
        </td>
        <td>
          <div class="form-check form-switch d-flex justify-content-center">
            <input
             class="form-check-input me-2"
             type="checkbox"
             data-action="changeStaus"
             data-id="${item.id}"
             ${item.enabled? 'checked':''}
            >
            <label 
             class="form-check-label"
             for="productEnabled${index.id}"
             data-id="${item.id}"
            >
              ${item.enabled ? "已啟用":"未啟用"}
            <lable>
          </div>
        </td>
        <td class="text-center">
          <button 
           type="button"
           data-id="${item.id}"
           data-action="delProduct"
          >
            刪除
          </button>
        </td>
     </tr>
   `;  
  });
  
  // 渲染資料
  productList.innerHTML = content;  
}

// 新增資料
function addProductData(){
  // 標題取得
  const getTitle = document.getElementById('title').value.trim();
  // 原價取得
  const getOriginPrice = document.getElementById('origin_price').value.trim();
  // 售價取得
  const getPrice = document.getElementById('price').value.trim();
  
  // 判斷有無內容
  if(!getTitle){
    alert('請填寫產品標題');
    return;
  }else if(!getOriginPrice){
    alert('請填寫原價');
    return;
  }else if(!getPrice){
    alert('請填寫售價');
    return;
  }else{
    productData.push({
      id: Date.now().toString(),
      title: getTitle,
      origin_price: parseInt(getOriginPrice) || 0,
      price: parseInt(getPrice) || 0,
      enabled: flase // 預設
    })
  }
  
  // product資料渲染
  render();
  
  // input欄位清空
  initInput();
  
}


// input欄位清空
function initInput(){
  // 標題取得
  document.getElementById('title').value = '';
  // 原價取得
  document.getElementById('origin_price').value = '';
  // 售價取得
  document.getElementById('price').value = '';
}


// 資料觸發
function changeProductData(e){
  // 取得 id
  const id = e.target.dataset.id;
  // 取得 action
  const action = e.target.dataset.action;
  // 判斷 刪除資料 / 改變狀態
  if(action == 'delProduct'){
    // 刪除資料
    delProductData(id);
  }else{
    // 改變狀態
    changEnabled(id);
  }
}


// 改變狀態
function changEnabled(id){
  productData.forEach((item, index) => {
    if(item.id == id){
      item.enabled = !item.enabled;
    }
  });
  render();
}

// 刪除資料
function delProductData(id){
  productData.forEach((item, index) => {
    if(item.id == id){
      productData.splice(index, 1);
    }
  })
  render();
}

// 刪除全部資料
function clearAllData() {
  productData = [];
  render();
}