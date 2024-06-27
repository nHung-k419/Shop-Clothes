import Shop_Details_page from '../../Views/Shop_Details.html?raw'
import user_template from '../../Views/User_template.html?raw'
export function Module_Shopdetails(){
    document.getElementById('template').innerHTML = user_template
    document.getElementById('app_index').innerHTML = Shop_Details_page 
}