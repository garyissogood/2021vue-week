//Product總數
const countProduct = document.getElementById('productCount');

//建立button
const addProductBtn = document.getElementById('addProduct');
addProductBtn.addEventListener("click", addProductData);

//資料表
const productList = document.querySelector('#productList');

//清除全部
const clearAllBtn = document.getElementById('clearAll');
clearAllBtn.addEventListener("click", clearAllData);


//product資料
let productData = [
  {
   id:1234,
    title: "產品1",
    origin_price: 21234,
    price: 12345,
    enabled: false
  },
  {
    id:8989,
    title: "產品2",
    origin_price: 21234,
    price: 12345,
    enabled: true
  }
];

/*********JS********/
init();

// 初始化設定
function init(){
  //Product資料渲染至列表
  render();
  //監聽
  productList.addEventListener('click', changeProductData);
}

//Product資料渲染至列表
function render(){
  //列表內容
  let content = "";
  
  //總筆數
  countProduct.textContent = productData.length;
  
  //資料渲染
  productData.forEach((item, index) => {
    content += `
      <tr>
        <td>${item.title}</td>
        <td class="text-center">NT ${parseInt(
          item.origin_price
        ).toLocaleString()}</td>
        <td class="text-center">NT ${parseInt(
          item.price).toLocaleString()}</td>
        <td >
        
          <div class="form-check form-switch d-flex justify-content-center">
            <input class="form-check-input me-2" type="checkbox" data-action="changeStaus" data-id="${item.id}" ${item.enabled? 'checked':''} >
            <label class="form-check-label" for="productEnabled${index.id}" data-id="${index.id}">${
      item.enabled ? "已啟用" : "未啟用"
    }</label>
          </div>
        </td>
        <td class="text-center">
         <button type="button" 
                  data-id="${item.id}" data-action="delProduct" >刪除
          </button>
          </td>
      </tr>
    `;
  });
  
  //渲染資料
  productList.innerHTML = content;
}

//新增產品資料
function addProductData() {
  //取得產品標題
  const getTitle = document.getElementById('title').value.trim();
  //取得原價
  const getOriginPrice = document.getElementById('origin_price').value.trim();
  //取得售價
  const getPrice = document.getElementById('price').value.trim();
  
  //判斷是否填寫內容
  if(!getTitle){
  alert('產品標題必須填寫!!!');
    return;
  }else if(!getOriginPrice ){
     alert('原價必須填寫!!!');
    return;
  }else if(!getPrice){
    alert('售價必須填寫!!!');
     return;
  }else{
    productData.push(
     { id: Date.now().toString(),
      title: getTitle,
      origin_price: parseInt(getOriginPrice) || 0,
      price: parseInt(getPrice) || 0,
      enabled: false //預設為false
     }
    )
  }
  
  //product資料渲染
  render();
  
  //Input欄位清空
  initInput();
}
  
  //Input欄位清空
function initInput() {
   //產品標題
   document.getElementById('title').value = '';
  //取得原價
  document.getElementById('origin_price').value = '';
  //取得售價
   document.getElementById('price').value = '';
}
 

//資料觸發 
function changeProductData(e) {
  //取得id
  const id = e.target.dataset.id;
  //取得action  
  const action = e.target.dataset.action;
    
 //delProduct＝為刪除資料 / 反則為改變狀態
  if(action == 'delProduct'){
    //刪除產品資料
    delProductData(id);
  }else{
    //改變狀態
    changeEnabled(id);
  }
}

 //改變狀態
function changeEnabled(id) {
  productData.forEach((item, index) => {
    if (item.id == id) {
      item.enabled = !item.enabled;
    }
  });
  render();
}
  
//刪除產品資料
function delProductData(id){
  productData.forEach((item, index) => {
    if(item.id == id){
      productData.splice(index, 1); 
    }
  })
  render();
}

//資料全部刪除
function clearAllData() {
  productData = [];
  render();
}


