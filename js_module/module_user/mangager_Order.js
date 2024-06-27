import Admin_Order from '../../Views/orderAdmin.html?raw'
export function Order_Category_Amin(){
    console.log(document.getElementById('app'));
    document.getElementById('app').innerHTML = Admin_Order
}