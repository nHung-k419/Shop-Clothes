import Admin_Products from '../../Views/products_admin.html?raw'
export function products_Amin(){
    console.log(document.getElementById('app'));
    document.getElementById('app').innerHTML = Admin_Products
}