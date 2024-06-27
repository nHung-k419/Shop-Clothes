import home_page from '../../Views/index.html?raw'
import user_template from '../../Views/User_template.html?raw'

export function Module_home() {
    document.getElementById('template').innerHTML = user_template
    document.getElementById('app_index').innerHTML = home_page
}