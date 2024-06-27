var cart = []
var products = []
let Products = []
class Show_Home {
    async convertToHTML() {
        // console.log(Products);
        document.querySelector('.product-show').innerHTML = ''
        Object.entries(Products).forEach(([key, value]) => {
            // console.log(key,value);
            document.querySelector('.product-show').innerHTML += `
                <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales ">
                       <div class="product__item ">
                           <div class="product__item__pic set-bg" data-setbg="${value.Image}">
                           <img src="${value.Image}" width = "250px" height = "280px" alt="">
                               <ul class="product__hover">
                                   <li><a href="#"><img src="img/icon/heart.png" alt=""></a></li>
                                   <li><a href="#"><img src="img/icon/compare.png" alt=""> <span>Compare</span></a></li>
                                   <li><a href="#"><img src="img/icon/search.png" alt=""></a></li>
                               </ul>
                           </div>
                           <div class="product__item__text">
                               <h6>${value.Name}</h6>
                               <a data-id=${key} class="btn-click" href="#" class="add-cart">+ Add To Cart</a>
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
                   </div> `
        })


        this.setID()
    }
    setID = () => {
        let btn_click = document.querySelectorAll('.btn-click')
        for (var i = 0; i < btn_click.length; i++) {
            btn_click[i].addEventListener('click', (e) => this.addcarrt(e))
        }
    }
    addcarrt(e) {
        let click_id = e.target.dataset.id
        // click_id = Number(click_id, 10)
        let position_Cart = Object.entries(cart).findIndex(([key, value]) => {
            return value.product_id === click_id
        })
        // console.log(position_Cart);
        if (cart.length <= 0) {
            cart = [{
                product_id: click_id,
                quantity: 1
            }]
        } else if (position_Cart < 0) {
            cart.push({
                product_id: click_id,
                quantity: 1
            })
        } else {
            cart[position_Cart].quantity = cart[position_Cart].quantity + 1
        }
        this.show_cart()
    }
    show_cart() {
        let productss = products.Products
        document.querySelector('.show_CartHTML').innerHTML = ''
        let total = 0
        cart.forEach(item_cart => {
            let position_Show = Object.entries(productss).find(([key, value]) => {
                return key === item_cart.product_id
            })
            let info = productss[position_Show[0]]
            total += info.Price * item_cart.quantity
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
    }
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
        document.querySelector('.Check_Out').onclick = () => {
            if (cart.length > 0) {
                localStorage.setItem("pay_cart", JSON.stringify())
                const isEdit = $("#exampleModal_information").modal('show')
                if (isEdit) {
                    $("#modal_cart").modal('hide')
                    document.querySelector('.btn_information').onclick = () => {
                        let Name_infor = document.getElementById('name_infor')
                        let Email_infor = document.getElementById('email_infor')
                        let Address_infor = document.getElementById('address_infor')
                        let Phone_infor = document.getElementById('phone_infor')
                        let infor_products = products.Products
                        let information = ''
                        // cart.forEach(item_infor => {
                        //     let position_infor = infor_products.findIndex(infor_items => infor_items.id === item_infor.product_id)
                        //      information = infor_products[position_infor]

                        //      console.log(information);
                        // })
                        let cart_id_order = []
                        for (var i = 0; i < cart.length; i++) {
                            cart_id_order.push(cart[i])
                        }
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
                            })
                            .catch(err => {
                                console.log('Lỗi Không được được hàng', err);
                            })
                    }
                }
            }
        }
    }
    async initApp() {
        await fetch('https://assignment-6a0d8-default-rtdb.firebaseio.com/.json')
            .then(res => res.json())
            .then(data => {
                products = data
                Products = products.Products
                this.convertToHTML()
                console.log(products);
            })
    }
}
var Home = new Show_Home()
export default Home 
