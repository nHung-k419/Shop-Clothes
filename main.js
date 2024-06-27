
import Navigo from 'navigo'; // When using ES modules.
const router = new Navigo('/');
import {Module_home} from './js_module/module_user/module_home.js'
import { Module_Shop } from './js_module/module_user/module_shop.js';
import { Module_About } from './js_module/module_user/module_about.js';
import { Module_Shopdetails } from './js_module/module_user/module_shopDetails.js';
import { Module_ShoppingCart } from './js_module/module_user/module_Shoppingcart.js';
import { Module_Checkout } from './js_module/module_user/Module_Checkout.js';
import { Module_BlogsDetails } from './js_module/module_user/Module_BlockDetails.js';
import { Module_Block } from './js_module/module_user/Module_Block.js';
import { Module_Contact } from './js_module/module_user/Module_Contact.js';
import { Module_Login } from './js_module/module_user/module_login.js';
// admin
import { Module_Amin } from './js_module/module_user/module_Admin.js';
import { Category_Amin} from './js_module/module_user/mangager.js';
import { Order_Category_Amin } from './js_module/module_user/mangager_Order.js';
import { products_Amin } from './js_module/module_user/products_admin.js';
// END VIEWS





import Home from './js_module/Home_page.js'
import newShop from './js_module/Shop.js'
import module_category_admin from './js_module/category_admin.js';
import module_products_admin from './js_module/products_admin.js';
import moddule_order_admin from './js_module/order_admin.js';
import show_login_module from './js_module/form_login.js';
// console.log(firebase.app().name);
router.on('/', function () {
  Module_Login()
  show_login_module.handle_login()
})
.on('/home', function () {
  Module_home()
  Home.initApp()
  Home.convertToHTML()
  // Home.setID()
  // Api.addCartToHome()
  // Api.setID()

})
.on('/shop', function () {
  Module_Shop()
  newShop.convertShopToHTML()
  newShop.initApp_shop()
  // newShop.Filter_Price()
  // newShop.showCategory()
  // newShop.Click_Category()
})
.on('/about', function () {
  Module_About()
})
.on('/Shop_Details', function () {
  Module_Shopdetails()
})
.on('/Shopping_Cart', function () {
  Module_ShoppingCart()
})
.on('/Checkout', function () {
  Module_Checkout()
})
.on('/Blog_details', function () {
  Module_BlogsDetails()
})
.on('/Blogs', function () {
  Module_Block
})
.on('/contact', function () {
  Module_Contact()
})
.on('/admin', function () {
  Module_Amin()
})
.on('/admin/managecategories', function () {
  Module_Amin()
  Category_Amin()
  module_category_admin.initApp()
})
.on('/admin/Products', function () {
  Module_Amin()
  products_Amin()
  module_products_admin.initApp()
})
.on('/admin/Order', function () {
  Module_Amin()
  Order_Category_Amin()
  moddule_order_admin.initApp()
})

router.resolve();