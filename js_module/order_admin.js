let products = []
class handle_order_admin {
  handle_show_order() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Tháng bắt đầu từ 0
    const day = now.getDate();
    const orders = products.orders
    document.querySelector('.render_category').innerHTML = ''
    let i = 1
    Object.entries(orders).forEach(([key, value]) => {
      document.querySelector('.render_category').innerHTML += `<tr>
        <th scope="row">${i++}</th>
        <td>${value.Customer_name}</td>
        <td>${value.Customer_email}</td>
        <td>${value.Customer_address}</td>
        <td>${value.Customer_phone_number}</td>
        <td>${day}/${month}/${year}</td>
        <td><button data-id = ${key} class ="btn btn-warning btn_show_Details">details</button></td>    
      </tr>`
    });
    //   this.orrder_del()
    this.setID_Order()
  }
  setID_Order() {
    let show_details = document.querySelectorAll('.btn_show_Details')
    for (let i = 0; i < show_details.length; i++) {
      show_details[i].addEventListener('click', (e) => this.Click_id_details(e))
    }
  }
  Click_id_details(e) {
    let products_order = products.Products
    let order = products.orders
    let id_products = e.target.dataset.id
    console.log(id_products);
    let order_id = ''
    let i = 1
    // id_products = Number(id_products)
    // console.log(id_products);
    document.querySelector('.name_title').innerHTML = `Order Details`
    document.querySelector('.thead').innerHTML = `<tr>
        <th scope="col">Stt</th>
        <th scope="col">Name</th>
        <th scope="col">Image</th>
        <th scope="col">Price</th>
        <th scope="col">Quantity</th>
        <th scope="col">Total</th>
      </tr>`
    let id_order = Object.entries(order).filter(([key, value]) => {
      return key === id_products
    })
    console.log(id_order);
    if (id_order) {
      document.querySelector('.render_category').innerHTML = ''
      let product_orderShow = Object.entries(id_order).forEach((key, value) => {
        // console.log(key[1][1]);
        order_id = key[1][1].product_id
      })
      console.log(order_id);
      order_id.forEach(id_order => {
        let show_order = Object.entries(products_order).filter(([key, value]) => {
          return key === id_order.product_id
        })
        // console.log(show_order);
        
        show_order.forEach(item_order_show => {
          // console.log(item_order_show[1]);
          document.querySelector('.render_category').innerHTML += `
        <tr>
            <th scope="row">${i++}</th>
            <td>${item_order_show[1].Name}</td>
            <td><img src="${item_order_show[1].Image}" width = "90px" height ="100px"></td>
            <td>${item_order_show[1].Price}</td>
            <td>${id_order.quantity}</td>
            <td>${item_order_show[1].Price * id_order.quantity}</td>
          </tr>`
        })
      })
    }

  }
  async initApp() {
    await fetch('https://assignment-6a0d8-default-rtdb.firebaseio.com/.json', {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data !== null) {
          products = data;
          this.handle_show_order()
          //   console.log(products);
        }

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}
const moddule_order_admin = new handle_order_admin()
export default moddule_order_admin