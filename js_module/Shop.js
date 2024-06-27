let cart = []
let products = []
let Products_Shop = []
let product_price = []
let category = []
let products_Search = []
class Show_Shop {
    async convertShopToHTML() {
        // console.log(Products_Shop);
        document.querySelector('.shop_products').innerHTML = ''
        Object.entries(Products_Shop).forEach(([key, value]) => {
            document.querySelector('.shop_products').innerHTML += ` <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="product__item">
                <div class="product__item__pic set-bg" data-setbg="${value.Image}">
                <img src="${value.Image}" width = "250px" height = "280px" alt="">
                    <ul class="product__hover">
                        <li><a href="#"><img src="img/icon/heart.png" alt=""></a></li>
                        <li><a href="#"><img src="img/icon/compare.png" alt=""> <span>Compare</span></a>
                        </li>
                        <li><a href="#"><img src="img/icon/search.png" alt=""></a></li>
                    </ul>
                </div>
                <div class="product__item__text">
                    <h6>${value.Name}</h6>
                    <a data-id=${key} href="#" class="add-cart btn-click">+ Add To Cart</a>
                    <h5>${value.Price}</h5>
                    <div class="product__color__select">
                        <label for="pc-4">
                            <input type="radio" id="pc-4">
                        </label>
                        <label class="active black" for="pc-5">
                            <input type="radio" id="pc-5">
                        </label>
                        <label class="grey" for="pc-6">
                            <input type="radio" id="pc-6">
                        </label>
                    </div>
                </div>
            </div>
        </div>`
        })
        this.setID()
        this.Filter_Price()
        this.showCategory()
        this.Search_Products()
    }
    setID = () => {
        let btn_click = document.querySelectorAll('.btn-click')
        // console.log(btn_click);
        for (var i = 0; i < btn_click.length; i++) {
            btn_click[i].addEventListener('click', (e) => this.addcarrt(e))
        }
    }
    addcarrt(e) {
        let click_id = e.target.dataset.id
        // click_id = Number(click_id, 10)
        // console.log(click_id);
        let position_Cart = Object.entries(cart).findIndex(([key, value]) => {
            return value.product_id === click_id
        })
        // console.log(position_Cart);
        if (cart.length <= 0) {
            cart = [{
                product_id: click_id,
                quantity: 1
            }]
            // console.log(cart);
        } else if (position_Cart < 0) {
            cart.push({
                product_id: click_id,
                quantity: 1
            })

            // console.log(cart);
        } else {
            cart[position_Cart].quantity = cart[position_Cart].quantity + 1
            // console.log(cart); 
        }
        // localStorage.setItem('Cart_local', JSON.stringify(cart))#
        // console.log(cart);
        this.show_cart()
    }
    // show cart 
    show_cart() {
        let productss = products.Products
        document.querySelector('.show_CartHTML').innerHTML = ''
        let total = 0
        cart.forEach(item_cart => {
            let position_Show = Object.entries(productss).find(([key, value]) => {
                // console.log(key);
                // key = Number(key)
                // console.log(key);
                return key === item_cart.product_id
            })
            // console.log(position_Show[1]);
            let info = productss[position_Show[0]]
            // console.log(info);
            total += info.Price * item_cart.quantity
            // console.log(total);
            document.querySelector('.total_price').innerHTML = total
            document.querySelector('.show_CartHTML').innerHTML += `
     <tr>
     <td class="product__cart__item">
         <div class="product__cart__item__pic">
             <img src="${info.Image}" style ="width : 100px" alt="">
         </div>
         <div class="product__cart__item__text">
             <h6>${info.Name}</h6>
             <h5 >${info.Price}</h5>
         </div>
     </td>
     <td class="quantity__item p-5">
         <div class="quantity">
         
         <div class="pro-qty-2">
             <span class="fa fa-angle-left dec qtybtn btn_prev" data-id = ${item_cart.product_id}></span>
             <input type="text" value="${item_cart.quantity}">
             <span class="fa fa-angle-right inc qtybtn btn_next" data-id = ${item_cart.product_id} ></span>
         </div>
        
         </div>
     </td>
     <td class="cart__price">${info.Price * item_cart.quantity}</td>
     <td data-id = ${item_cart.product_id} class="cart__close  "><i class="fa fa-close  delete_item"></i></td>
 </tr>`
        })
        this.delete_cart()
        this.Pay_Price()
        this.prev()
        this.next()
        // this.total_price()
    }
    // total_price(){
    //     let total_price = document.querySelector('.total_price')
    //     console.log(total_price);
    // }

    prev() {
        let btn_prev = document.querySelectorAll('.btn_prev')
        for (var i = 0; i < btn_prev.length; i++) {
            btn_prev[i].addEventListener('click', (e) => this.prev_product(e))
        }
    }
    prev_product(e) {
        let id = e.target.dataset.id
        // id = Number(id, 10)
        let index = cart.findIndex(item_prev => item_prev.product_id === id)
        let position_index = cart[index].quantity
        if (position_index > 1) {
            position_index--
            cart[index].quantity = position_index
            this.show_cart()
        }
    }
    next() {
        let btn_next = document.querySelectorAll('.btn_next')
        for (var i = 0; i < btn_next.length; i++) {
            btn_next[i].addEventListener('click', (e) => this.next_product(e))
        }
    }
    next_product(e) {
        let id = e.target.dataset.id
        // id = Number(id, 10)
        // console.log(id);
        let index = cart.findIndex(item_prev => item_prev.product_id === id)
        let position_index = cart[index].quantity
        if (position_index) {
            position_index++
            cart[index].quantity = position_index
            this.show_cart()
        }
    }
    delete_cart() {
        let btn_delete = document.querySelectorAll('.delete_item');
        // console.log(btn_delete);
        for (var i = 0; i < btn_delete.length; i++) {
            btn_delete[i].addEventListener('click', (e) => this.delete_item(e))
        }
    }
    delete_item(e) {
        let id_delete = e.target.parentElement.dataset.id
        id_delete = Number(id_delete, 10)
        let index = cart.findIndex(index_delete => index_delete.product_id === id_delete)
        cart.splice(index, 1)
        this.show_cart()
    }
    Pay_Price() {
        let Name_infor = document.getElementById('name_infor')
        let Email_infor = document.getElementById('email_infor')
        let Address_infor = document.getElementById('address_infor')
        let Phone_infor = document.getElementById('phone_infor')
        let infor_products = products.Products
        document.querySelector('.Check_Out').onclick = () => {
            if (cart.length > 0) {
                localStorage.setItem("pay_cart", JSON.stringify())
                const isEdit = $("#exampleModal_information").modal('show')
                if (isEdit) {
                    $("#modal_cart").modal('hide')
                    document.querySelector('.btn_information').onclick = () => {
                        let information = ''
                        let cart_id_order = []
                        for (var i = 0; i < cart.length; i++) {
                            cart_id_order.push(cart[i])
                        }
                        console.log(cart_id_order);
                        // console.log(cart_id_order);
                        fetch('https://assignment-6a0d8-default-rtdb.firebaseio.com/orders/.json', {
                            method: "POST",
                            body: JSON.stringify({
                                Customer_name: Name_infor.value, Customer_email: Email_infor.value,
                                Customer_address: Address_infor.value, Customer_phone_number: Phone_infor.value, product_id: cart_id_order
                            })
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);
                                console.log('Đặt Hàng Thành công');
                                $("#exampleModal_information").modal('hide')
                                location.reload()
                            })
                            .catch(err => {
                                console.log('Lỗi Không đặt được hàng', err);
                            })
                    }
                }
            }
        }

    }


    showCategory = async () => {
        // console.log(category);
        document.querySelector('.show_cate').innerHTML = ''
        Object.entries(category).forEach(([key, value]) => {
            // console.log(value.id);
            document.querySelector('.show_cate').innerHTML += `
            <li data-id=${value.id} class="btn_cate"><a href="#">${value.Name}</a></li>
        `

        })
        this.Click_Category()
    }
    Click_Category() {
        let btn_category = document.querySelectorAll('.btn_cate')
        for (let i = 0; i < btn_category.length; i++) {
            btn_category[i].addEventListener('click', (e) => this.show_categories(e))
        }
    }
    show_categories(e) {
        let Products_Cate = products.Products
        let clickCateID = e.target.parentElement.dataset.id
        clickCateID = Number(clickCateID, 10)
        // console.log(clickCateID);
        document.querySelector('.shop_products').innerHTML = ''
        let result_cate = Object.entries(Products_Cate).filter(([key, value]) => {
            return value.Cate_id === clickCateID
        })
        // console.log(result_cate);
        result_cate.forEach(item_cate => {
            // console.log(item_cate[0]);
            document.querySelector('.shop_products').innerHTML += ` <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="product__item">
            <div class="product__item__pic set-bg" data-setbg="${item_cate[1].Image}">
            <img src="${item_cate[1].Image}" width = "250px" height = "280px" alt="">
                <ul class="product__hover">
                    <li><a href="#"><img src="img/icon/heart.png" alt=""></a></li>
                    <li><a href="#"><img src="img/icon/compare.png" alt=""> <span>Compare</span></a>
                    </li>
                    <li><a href="#"><img src="img/icon/search.png" alt=""></a></li>
                </ul>
            </div>
            <div class="product__item__text">
                <h6>${item_cate[1].Name}</h6>
                <a href="#" data-id=${item_cate[0]} class="add-cart btn-click">+ Add To Cart</a>
                <h5>${item_cate[1].Price}</h5>
                <div class="product__color__select">
                    <label for="pc-4">
                        <input type="radio" id="pc-4">
                    </label>
                    <label class="active black" for="pc-5">
                        <input type="radio" id="pc-5">
                    </label>
                    <label class="grey" for="pc-6">
                        <input type="radio" id="pc-6">
                    </label>
                </div>
            </div>
        </div>
    </div>`;
        })
        this.setID()
    }
    Filter_Price = async () => {
        // console.log(product_price);
        document.querySelector('.show_price').innerHTML = ''
        Object.entries(product_price).forEach(([key, value]) => {
            document.querySelector('.show_price').innerHTML += ` <li data-price="${value.Price}" class="Click_price" ><a href="#">${value.Price} - ${value.Max_Price}</a></li>`
        })
        this.click_price()
    }
    click_price() {
        let btn_price = document.querySelectorAll('.Click_price')
        for (var i = 0; i < btn_price.length; i++) {
            btn_price[i].addEventListener('click', (e) => this.show_Price(e))
        }
    }
    show_Price(e) {
        let product_price = products.Products
        document.querySelector('.shop_products').innerHTML = ''
        let data_price = e.target.parentElement.dataset.price 
        data_price = Number(data_price, 10)
        console.log(data_price);
        let show_price = Object.entries(product_price).filter(([key, value]) => {
            return value.Price >= data_price && data_price <= value.Max_Price
        })
        // console.log(show_price);
        show_price.forEach(render_price => {
            // console.log(render_price[0]);
            document.querySelector('.shop_products').innerHTML += ` <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="product__item">
                <div class="product__item__pic set-bg" data-setbg="${render_price[1].Image}">
                <img src="${render_price[1].Image}" width = "250px" height = "280px" alt="">
                    <ul class="product__hover">
                        <li><a href="#"><img src="img/icon/heart.png" alt=""></a></li>
                        <li><a href="#"><img src="img/icon/compare.png" alt=""> <span>Compare</span></a>
                        </li>
                        <li><a href="#"><img src="img/icon/search.png" alt=""></a></li>
                    </ul>
                </div>
                <div class="product__item__text">
                    <h6>${render_price[1].Name}</h6>
                    <a href="#" data-id =${render_price[0]} class="add-cart btn-click">+ Add To Cart</a>
                    <h5>${render_price[1].Price}</h5>
                    <div class="product__color__select">
                        <label for="pc-4">
                            <input type="radio" id="pc-4">
                        </label>
                        <label class="active black" for="pc-5">
                            <input type="radio" id="pc-5">
                        </label>
                        <label class="grey" for="pc-6">
                            <input type="radio" id="pc-6">
                        </label>
                    </div>
                </div>
            </div>
        </div>`
        })
        this.setID()
    }
    Search_Products() {

        let search_input = document.querySelector('.input_value')
        search_input.addEventListener('change', (e) => this.show_products_search(e))
    }
    show_products_search(e) {
        e.preventDefault()
        document.querySelector('.shop_products').innerHTML = ''
        let value_input = e.target.value
        let value_Search = Object.entries(products_Search).filter(item_search => {
            return item_search[1].Name.toUpperCase().includes(value_input.toUpperCase())
        })
        value_Search.forEach(items_search => {
            // console.log(items_search[0]);
            document.querySelector('.shop_products').innerHTML += ` <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="product__item">
                <div class="product__item__pic set-bg" data-setbg="${items_search[1].Image}">
                <img src="${items_search[1].Image}" width = "250px" height = "280px" alt="">
                    <ul class="product__hover">
                        <li><a href="#"><img src="img/icon/heart.png" alt=""></a></li>
                        <li><a href="#"><img src="img/icon/compare.png" alt=""> <span>Compare</span></a>
                        </li>
                        <li><a href="#"><img src="img/icon/search.png" alt=""></a></li>
                    </ul>
                </div>
                <div class="product__item__text">
                    <h6>${items_search[1].Name}</h6>
                    <a href="#" data-id =${items_search[0]} class="add-cart btn-click">+ Add To Cart</a>
                    <h5>${items_search[1].Price}</h5>
                    <div class="product__color__select">
                        <label for="pc-4">
                            <input type="radio" id="pc-4">
                        </label>
                        <label class="active black" for="pc-5">
                            <input type="radio" id="pc-5">
                        </label>
                        <label class="grey" for="pc-6">
                            <input type="radio" id="pc-6">
                        </label>
                    </div>
                </div>
            </div>
        </div>`
        })
        this.setID()
    }
    async initApp_shop() {
        await fetch('https://assignment-6a0d8-default-rtdb.firebaseio.com/.json')
            .then(res => res.json())
            .then(data => {
                products = data
                Products_Shop = products.Products
                product_price = products.Products
                category = products.Category
                products_Search = products.Products
                this.convertShopToHTML()
                // this.Click_Category()
                // console.log( Products_Shop);
            })
    }

}
let newShop = new Show_Shop()
export default newShop