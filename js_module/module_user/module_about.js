import about_page from '../../Views/about.html?raw'
import user_template from '../../Views/User_template.html?raw'
export function Module_About(){
    document.getElementById('template').innerHTML = user_template
    document.getElementById('app_index').innerHTML = about_page
}