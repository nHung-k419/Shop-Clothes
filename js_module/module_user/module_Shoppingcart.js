
import Shopping_Cart_page from '../../Views/Shopping_Cart.html?raw'
import user_template from '../../Views/User_template.html?raw'
export function Module_ShoppingCart(){
    document.getElementById('template').innerHTML = user_template
    document.getElementById('app_index').innerHTML = Shopping_Cart_page
}