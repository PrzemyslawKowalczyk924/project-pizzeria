import { select, templates } from '../settings.js';
//import app from './../app.js';
import AmountWidget from './AmountWidget.js';

class Booking {
  constructor(element){
    const thisBooking = this;
    thisBooking.render(element);
    thisBooking.initWidgets();
  }

  render(element){
    const thisBooking = this;

    /* generate HTML by using templates.bookingWidget withoud any arguments */
    const generatedHTML = templates.bookingWidget;
    /* create empty object thisBooking.dom */
    thisBooking.dom = {};
    /* save to thisBooking.dom wrapper equoal to render() argument 'element' */
    thisBooking.dom.wrapper = element;
    /* content of wrapper generate to HTML, by using template */
    thisBooking.dom.wrapper = generatedHTML;
    /* save to thisBooking.dom.peopleAmount single element found in wrapper and equoal to select.booking.peopleAmount */
    thisBooking.dom.peopleAmount = document.querySelector(select.booking.peopleAmount);
    /* same as in peopleAmount do the same to hoursAmount */
    thisBooking.dom.hoursAmount = document.querySelector(select.booking.hoursAmount);
  }

  initWidgets(){
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
  }
}

export default Booking;
