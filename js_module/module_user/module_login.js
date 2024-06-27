import login_page from '../../Views/login.html?raw'
import user_template from '../../Views/User_template.html?raw'
export function Module_Login(){
    document.getElementById('template').innerHTML = user_template
    document.getElementById('app_index').innerHTML = login_page
    // console.log(document.getElementById('app_index'));
}