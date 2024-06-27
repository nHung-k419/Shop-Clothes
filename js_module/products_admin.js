let products = []
class show_Products_admin {
    render_products_admin() {
        //    let images = 'img/product'
        let i = 1
        let products_show = products.Products
        document.querySelector('.render_products').innerHTML = ''
        Object.entries(products_show).forEach(([key, value], index) => {
            // console.log(value.Image);
            if (value !== null) {
                document.querySelector('.render_products').innerHTML += ` <tr>
        <th scope="row">${i++}</th>
        <td>${value.Name}</td>
        <td><img src="${value.Image}" style ="object-fit: cover" width ="120px" height="120px" object-fit: cover;></td>
        <td>${value.Price}</td>
        <td>${value.detail}</td>
        <td>${value.Cate_id}</td>
        <td><button data-id =${key} class ="btn btn-danger btn-delete">Delete</button></td>
        <td><button data-id = ${key} class="btn btn-warning btn-edit">Edit</button></td>
      </tr>`
            }
        });

        this.SetID_Delete()
        this.set_id_edit()
        this.add_product()
    }
    SetID_Delete() {
        let btn_del = document.querySelectorAll('.btn-delete')
        for (var i = 0; i < btn_del.length; i++) {
            btn_del[i].addEventListener('click', (e) => this.click_id_Delete(e))
        }
    }
    async click_id_Delete(e) {
        // console.log(e.target);
        let id = e.target.dataset.id
        // id = Number(id, 10)
        console.log(id);
        await fetch(`https://assignment-6a0d8-default-rtdb.firebaseio.com/Products/${id}.json`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    console.log('Delete is sucessfull');
                    location.reload()

                    // location.reload()
                } else {
                    console.error('Lỗi xóa dữ liệu:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Lỗi mạng:', error);
            });
    }
    set_id_edit() {
        let btn_edit = document.querySelectorAll('.btn-edit');
        for (var i = 0; i < btn_edit.length; i++) {
            btn_edit[i].addEventListener('click', (e) => this.click_product_edit(e))
        }
    }
    click_product_edit(e) {
        let id_edit = e.target.dataset.id
        // id_edit = Number(id_edit, 10)
        // console.log(id_edit);
        const isEdit = $("#exampleModalx").modal('show')
        if (isEdit) {
            this.Save_Edit(id_edit)
        }
    }
    Save_Edit(id) {
        const btn_edit = document.querySelector('.edit_save')
        const name = document.querySelector('.input_name input')
        const price = document.querySelector('.input_price input')
        const detail = document.querySelector('.input_detail input')
        const image = document.getElementById('input_image')
        let image_Url = ''
        let url_src = ''
        image.addEventListener('change', (e) => {
            e.preventDefault()
            const file = e.target.files[0]
            const reader = new FileReader();
            reader.onload = (event) => {
                const url = event.target.result;
             
                url_src = url
            
                // console.log(url_src);
              };
              reader.readAsDataURL(file);
        })
        btn_edit.onclick = (e) => {
            e.preventDefault()
            fetch(`https://assignment-6a0d8-default-rtdb.firebaseio.com/Products/${id}.json`, {
                method: "PATCH",
                body: JSON.stringify({Image:url_src, Name:name.value, Price:price.value,detail:detail.value}),
            })
                .then( res => res.json())
                .then((data) => {
                    console.log(data); // Dữ liệu đã được cập nhật trong Firebase
                    console.log("Sản phẩm đã được sửa thành công!");
                    location.reload()
                })
                .catch((error) => {
                    console.error("Lỗi khi sửa sản phẩm:", error);
                });
        }
    }
    add_product(){
        const add_name = document.getElementById('name')
        const add_image = document.getElementById('image')
        const add_price = document.getElementById('price')
        const add_maxprice = document.getElementById('maxprice')
        let select_products = document.getElementById('select_product')
        const add_detail = document.getElementById('detail')
        const btn_add = document.querySelector('.add-btn')
        let categories = products.Category
        let url_src = ''
        let id_option = ''
        Object.entries(categories).forEach(([key,value]) =>{
            // console.log(key);
            select_products.innerHTML += `<option data-id = ${key} class="select_cate">${value.Name}</option>`
        })
        select_products.addEventListener('click', (e) => {
             id_option = e.target.selectedOptions[0].dataset.id
            id_option = Number(id_option,10)
            // console.log(id_option);
            // Xử lý dữ liệu của option được chọn nếu cần thiết
          })
        add_image.addEventListener('change', (e) => {
            e.preventDefault()
            const file = e.target.files[0]
            const reader = new FileReader();
            reader.onload = (event) => {
                const url = event.target.result;
                url_src = url
              };
              reader.readAsDataURL(file);
        })
        btn_add.addEventListener('click', (e) => {
            // console.log(url_src);
            fetch('https://assignment-6a0d8-default-rtdb.firebaseio.com/Products/.json',{
                method:"POST",
                body: JSON.stringify({Name:add_name.value, Price:add_price.value, Max_Price: add_maxprice.value ,Image:url_src, detail:add_detail.value, Cate_id: id_option})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                console.log("Sản phẩm đã được thêm thành công!");
                location.reload()
            })
            .catch(error => {
                console.error("Lỗi khi thêm sản phẩm:", error);
            })
        })
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
                    this.render_products_admin();
                    // console.log(products.Category);
                }

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
}
const a = [1,2,3,4,5,6,7,8,9,10]
let n = 5
let m = 10
for(let i = 0 ; i < a.length ;i++){
    if(a[i] <= n && a[i] >= m){
        console.log(a[i]);
    }
}

let module_products_admin = new show_Products_admin
export default module_products_admin