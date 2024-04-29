export class HelperMethods {
  public static getMainViews(numberOfFakeViews = 5) {
    const mainViews = [
      { url: 'about', component: 'app-about' },
      { url: 'calculation', component: 'app-calculation' },
      {
        url: 'data-pipeline-designer',
        component: 'app-process-builder-wrapper',
      },
      { url: 'local-data', component: 'app-local-data' },
      { url: 'visualizer', component: 'app-visualizer' },
    ];
    const fakeViews = [];
    for (let index = 0; index < numberOfFakeViews; index++) {
      fakeViews.push({ url: `fake-view-${index}`, component: 'app-error' });
    }
    return [...mainViews, ...fakeViews];
  }

  public static getNavigationBarItems() {
    const expectedNavigationBarItems = [
      { url: 'about', selector: ".option[routerlink='about']" },
      { url: 'calculation', selector: ".option[routerlink='calculation']" },
      {
        url: 'data-pipeline-designer',
        selector: ".option[routerlink='data-pipeline-designer']",
      },
      { url: 'local-data', selector: ".option[routerlink='local-data']" },
      {
        url: 'visualizer',
        selector: '#visualization-option-wrapper .option',
        disabled: true,
      },
    ];
    return expectedNavigationBarItems;
  }
}
