import admin_page from '../../Views/home_admin.html?raw'
export function Category_Amin(){
    console.log(document.getElementById('app'));
    document.getElementById('app').innerHTML = admin_page
}