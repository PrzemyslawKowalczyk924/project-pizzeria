import { templates } from './../settings.js';
import utils from './../utils.js';

class HomePage {
  constructor(data) {
    const thisHomePage = this;

    thisHomePage.render(data);
  }

  render() {
    const thisHomePage = this;

    const generatedHTML = templates.homePage(thisHomePage.data);
    thisHomePage.element = utils.createDOMFromHTML(generatedHTML);
  }

}

export default HomePage;
