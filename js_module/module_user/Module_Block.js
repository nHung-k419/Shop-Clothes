import Blogs_page from '../../Views/Blogs.html?raw'
import user_template from '../../Views/User_template.html?raw'
export function Module_Block(){
    document.getElementById('template').innerHTML = user_template
    document.getElementById('app_index').innerHTML = Blogs_page
}