import Checkout__page from '../../Views/Checkout.html?raw'
import user_template from '../../Views/User_template.html?raw'
export function Module_Checkout(){
    document.getElementById('template').innerHTML = user_template
    document.getElementById('app_index').innerHTML = Checkout__page
}