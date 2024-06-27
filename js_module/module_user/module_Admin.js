
import navbar_page from '../../Views/navbar.html?raw'

export function Module_Amin(){
    console.log(document.getElementById('template'));
    document.getElementById('template').innerHTML = navbar_page

}
