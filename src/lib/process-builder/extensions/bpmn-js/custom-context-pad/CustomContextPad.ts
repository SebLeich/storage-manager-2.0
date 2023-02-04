import { BpmnJsService } from 'src/lib/process-builder/services/bpmn-js.service';

export default class CustomContextPad {
  public create: any;
  public elementFactory: any;
  public translate: any;
  public autoPlace: any;
  public static $inject: any;
  constructor(config: any, contextPad: any, create: any, elementFactory: any, injector: any, translate: any) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get("autoPlace", false);
    }

    contextPad.registerProvider(this);
  }

  getContextPadEntries(element: any) {
    const { autoPlace, create, elementFactory, translate } = this;
    return function (entries: any) {
      delete entries["delete"];
      return {
        ...entries,
        delete: {
          group: "edit",
          className: "bpmn-icon-trash",
          title: translate("Remove"),
          action: {
            click: () => BpmnJsService.elementDeletionRequested$.next(element),
          },
        },
      };
    };
  }
}

CustomContextPad.$inject = [
  "config",
  "contextPad",
  "create",
  "elementFactory",
  "injector",
  "translate",
];
