import contact_page from '../../Views/contact.html?raw'
import user_template from '../../Views/User_template.html?raw'
export function Module_Contact(){
    document.getElementById('template').innerHTML = user_template
    document.getElementById('app_index').innerHTML = contact_page
}