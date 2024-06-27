
import Blog_details_page from '../../Views/Blog_details.html?raw'
import user_template from '../../Views/User_template.html?raw'

export function Module_BlogsDetails(){
    document.getElementById('template').innerHTML = user_template
    document.getElementById('app_index').innerHTML = Blog_details_page
}