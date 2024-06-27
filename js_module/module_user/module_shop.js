import shop_page from '../../Views/shop.html?raw'
import user_template from '../../Views/User_template.html?raw'
export function Module_Shop(){
    console.log( document.getElementById('template'));
    document.getElementById('template').innerHTML = user_template
    document.getElementById('app_index').innerHTML = shop_page
}