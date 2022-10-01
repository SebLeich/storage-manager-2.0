import { HelperMethods } from './general-e2e.helper';
import { browser, logging } from 'protractor';
import { timer } from 'rxjs';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';

describe('Storage Manager App: general e2e tests', () => {
  let page: HelperMethods = new HelperMethods();

  it('should display navbar', async () => {
    await page.navigateTo();
    const navbar = page.findNavbar();
    expect(navbar.isPresent()).toBeTruthy();
  });

  page.getMainViews().forEach(async mainView => {

    it(`should display ${mainView.component} component at url '${browser.baseUrl}${mainView.url}'`, async () => {
      await browser.waitForAngular();
      await selectSnapshot(timer(1000));
      await page.navigateTo(`${browser.baseUrl}${mainView.url}`);

      await browser.waitForAngular();

      const mainViewObject = page.findViewByNS(mainView.component);
      expect(mainViewObject.isPresent()).toBeTruthy();
      expect(mainViewObject.isDisplayed()).toBeTruthy();
    });

  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
