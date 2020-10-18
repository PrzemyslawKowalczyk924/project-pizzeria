import { select, templates } from './../settings.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';

class Booking {
  constructor(element){
    const thisBooking = this;
    thisBooking.render(element);
    thisBooking.initWidgets();
  }

  render(element){
    const thisBooking = this;

    /* generate HTML by using templates.bookingWidget withoud any arguments */
    const generatedHTML = templates.bookingWidget();
    /* create empty object thisBooking.dom */
    thisBooking.dom = {};
    /* save to thisBooking.dom wrapper equoal to render() argument 'element' */
    thisBooking.dom.wrapper = element;
    /* content of wrapper generate to HTML, by using template */
    thisBooking.dom.wrapper.innerHTML = generatedHTML;
    console.log('domWraper', thisBooking.dom.wrapper);
    /* save to thisBooking.dom.peopleAmount single element found in wrapper and equoal to select.booking.peopleAmount */
    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);
    console.log('people', thisBooking.dom.peopleAmount);
    /* same as in peopleAmount do the same to hoursAmount */
    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);
    thisBooking.dom.datePicker = thisBooking.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);
  }

  initWidgets(){
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
  }
}

export default Booking;
