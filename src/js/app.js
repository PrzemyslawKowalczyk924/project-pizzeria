import {settings, select, classNames} from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import Booking from './components/Booking.js';

const app = {
  initPages: function(){
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    thisApp.homeLinks = document.querySelectorAll('.link-wrapper a');

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMachingHash = thisApp.pages[0].id;

    for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMachingHash = page.id;
      }
    }

    for(let homeLink of thisApp.homeLinks){
      homeLink.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();

        const pageId = clickedElement.getAttribute('href').replace('#', '');
        thisApp.activatePage(pageId);
        homeLink.classList.add('active');
        console.log('page listener', thisApp.activatePage);
      });
    }

    thisApp.activatePage(pageMachingHash);

    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;

        event.preventDefault();

        /*get page id from href attribute*/
        const id = clickedElement.getAttribute('href').replace('#', '');

        /* run thisApp.activatePage with that id */
        thisApp.activatePage(id);

        /* change URL hash */
        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function(pageId){
    const thisApp = this;

    /*add class 'active' to maching pages, remove from non-matching */
    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    /*add class 'active' to maching links, remove from non-matching */
    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  initMenu: function(){
    const thisApp = this;

    for(let productData in thisApp.data.products){
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },

  initBooking: function(){
    const thisApp = this;

    thisApp.bookingWrapper = document.querySelector(select.containerOf.booking);
    thisApp.booking = new Booking(thisApp.bookingWrapper);
  },

  initData: function(){
    const thisApp = this;

    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.product;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);

        /* save parsedReposne as thisApp.data.products */
        thisApp.data.products = parsedResponse;

        /* execute initMenu method */
        thisApp.initMenu();
      });

    console.log('thisApp.data', JSON.stringify(thisApp.data));
  },

  initCart: function(){
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);

    thisApp.productList.addEventListener('add-to-cart', function(event){
      app.cart.add(event.detail.product);
    });
  },

  initHomePage: function(){
    //const thisApp = this;

  },

  init: function(){
    const thisApp = this;
    //thisApp.initHomePage();
    thisApp.initPages();
    thisApp.initData();
    thisApp.initCart();
    thisApp.initBooking();
  },
};

app.init();
export default app;
