import { browser, by, element, ElementFinder } from 'protractor';
import { v4 as generateGuid } from 'uuid';

export class HelperMethods {
  async navigateTo(url: string = browser.baseUrl): Promise<unknown> {
    return browser.get(url);
  }

  findNavbar(): ElementFinder {
    return element(by.css('app-navbar'));
  }

  findViewByNS(view: string) {
    return element(by.css(view));
  }

  getMainViews(){
    const mainViews = [
      { url: 'calculation', component: 'app-calculation' },
      { url: 'local-data', component: 'app-local-data' },
      { url: 'visualizer', component: 'app-visualizer' }
    ];
    const fakeViews = [];
    for(let index = 0; index < 10; index++){
      fakeViews.push({ url: generateGuid(), component: 'app-error' });
    }
    return [
      ...mainViews,
      ...fakeViews
    ]
  }
}

