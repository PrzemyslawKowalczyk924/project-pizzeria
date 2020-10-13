import {settings, select} from '../settings.js';

class AmountWidget{
  constructor(element){
    const thisWidget = this;

    thisWidget._value = null;
    thisWidget.getElements(element);
    thisWidget.value = settings.amountWidget.defaultValue;
    thisWidget.initActions();
  }

  getElements(element){
    const thisWidget = this;

    thisWidget.element = element;
    thisWidget.input = thisWidget.element.querySelector(select.widgets.amount.input);
    thisWidget.linkDecrease = thisWidget.element.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.linkIncrease = thisWidget.element.querySelector(select.widgets.amount.linkIncrease);
  }

  get value(){
    const thisWidget = this;
    return thisWidget._value;
  }

  set value(val){
    const thisWidget = this;

    const newValue = parseInt(val);

    /*TO DO: Add validation*/
    if(newValue != settings.amountWidget.defaultValue && newValue >= settings.amountWidget.defaultMin && newValue <= settings.amountWidget.defaultMax || newValue == 1){
      thisWidget._value = newValue;
      thisWidget.announce();
    }

    thisWidget.input.value = thisWidget.value;
  }

  initActions(){
    const thisWidget = this;
    thisWidget.input.addEventListener('change', function(){
      thisWidget.value = thisWidget.input.value;
    });
    thisWidget.linkDecrease.addEventListener('click', function(event){
      event.preventDefault();
      thisWidget.value = thisWidget.value -1;
    });
    thisWidget.linkIncrease.addEventListener('click', function(event){
      event.preventDefault();
      thisWidget.value = thisWidget.value +1;
    });
  }

  announce(){
    const thisWidget = this;
    const event = new CustomEvent('updated', {
      bubbles: true
    });
    thisWidget.element.dispatchEvent(event);
  }
}

export default AmountWidget;
