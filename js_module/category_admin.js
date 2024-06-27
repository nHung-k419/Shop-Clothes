let products = []

class show_Category_admin {
  render_category_admin() {
    let category = products.Category
    document.querySelector('.render_category').innerHTML = ''
    let i = 1
    // let Newcategory = Object.entries(category).filter(category => category !== null)
    // console.log(Newcategory);
  
    Object.entries(category).forEach(([key,value]) => {
      console.log(key);
      if (value !== null) {
        document.querySelector('.render_category').innerHTML += `
        <tr>
            <th scope="row">${i++}</th>
            <td>${value.Name}</td>
            <td><button data-id =${key} class ="btn btn-danger btn-click">Delete</button></td>
            <td><button data-id = ${key} class="btn btn-warning btn-edit">Edit</button></td>
          </tr>
        `
      }
    });
    this.SetID_Delete()
    this.set_id_edit()
    this.add_Category()
  }
  SetID_Delete() {
    let btn_del = document.querySelectorAll('.btn-click')
    for (var i = 0; i < btn_del.length; i++) {
      btn_del[i].addEventListener('click', (e) => this.click_id_Delete(e))
    }
  }
  async click_id_Delete(e) {
    // console.log(e.target);
    let id = e.target.dataset.id
    // id = Number(id, 10)
    console.log(id);
    await fetch(`https://assignment-6a0d8-default-rtdb.firebaseio.com/Category/${id}.json`, {
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
      btn_edit[i].addEventListener('click', (e) => this.click_category_edit(e))
    }
  }
  click_category_edit(e) {
    let id_edit = e.target.dataset.id
    // id_edit = Number(id_edit, 10)
    console.log(id_edit);
    const isEdit = $("#exampleModalx").modal('show')
    if (isEdit) {
      this.Save_Edit(id_edit)
    }
  }
  Save_Edit(id) {
    // const btn_edit = document.querySelector('.edit_save')
    console.log(id);
    const btn_edit = document.querySelector('.edit_save')
    btn_edit.onclick = (e) => {
      e.preventDefault()
      const Vlue_edit_category = document.querySelector('.edit-category')
      fetch(`https://assignment-6a0d8-default-rtdb.firebaseio.com/Category/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify({ Name: Vlue_edit_category.value }),
      })
        .then((response) => response.json())
        .then((data) => {
          location.reload()
          console.log("Sản phẩm đã được sửa thành công!");
        })
        .catch((error) => {
          console.error("Lỗi khi sửa sản phẩm:", error);
        });
    }
  }
  add_Category() {
    const input = document.querySelector('.input-category')
    const add_cate = document.querySelector('.add-btn');
    // console.log(input.value)
    add_cate.onclick = (e) => {
      fetch("https://assignment-6a0d8-default-rtdb.firebaseio.com/Category.json", {
        method: "POST",
        body: JSON.stringify({Name:input.value}),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Sản phẩm đã được thêm thành công!");
          location.reload()
        })
        .catch((error) => {
          console.error("Lỗi khi thêm sản phẩm:", error);
        });
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
          this.render_category_admin();
          console.log(products.Category);
        }

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}
var module_category_admin = new show_Category_admin()
export default module_category_admin