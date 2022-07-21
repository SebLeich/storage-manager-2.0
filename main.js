(self["webpackChunkstorage_manager"] = self["webpackChunkstorage_manager"] || []).push([["main"],{

/***/ 54000:
/*!*******************************!*\
  !*** ./src/app/animations.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showAnimation": () => (/* binding */ showAnimation)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ 24851);

const showAnimation = (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('show', [
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('void', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        opacity: 0,
        transform: 'scale(.9)'
    })),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('*', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        opacity: 1,
        transform: 'scale(1)'
    })),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('void => *', [
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('.2s ease-out')
    ])
]);


/***/ }),

/***/ 90158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var src_lib_shared_components_error_error_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/lib/shared/components/error/error.component */ 48225);
/* harmony import */ var _components_main_calculation_calculation_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/main/calculation/calculation.component */ 83386);
/* harmony import */ var _components_main_orders_orders_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/main/orders/orders.component */ 20056);
/* harmony import */ var _components_main_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/main/visualizer/visualizer.component */ 84);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);







const routes = [
    { path: '', pathMatch: 'full', redirectTo: 'visualizer' },
    { path: 'calculation', component: _components_main_calculation_calculation_component__WEBPACK_IMPORTED_MODULE_1__.CalculationComponent },
    { path: 'data-pipeline-designer', loadChildren: () => __webpack_require__.e(/*! import() */ "src_lib_process-builder-wrapper_process-builder-wrapper_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! src/lib/process-builder-wrapper/process-builder-wrapper.module */ 76544)).then(m => m.ProcessBuilderWrapperModule) },
    { path: 'orders', component: _components_main_orders_orders_component__WEBPACK_IMPORTED_MODULE_2__.OrdersComponent },
    { path: 'visualizer', component: _components_main_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__.VisualizerComponent },
    { path: '**', component: src_lib_shared_components_error_error_component__WEBPACK_IMPORTED_MODULE_0__.ErrorComponent }
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule] }); })();


/***/ }),

/***/ 55041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 84505);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/snack-bar */ 10930);
/* harmony import */ var _components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/navbar/navbar.component */ 33252);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);







class AppComponent {
  constructor(_snackBar, _router) {
    this._snackBar = _snackBar;
    this._router = _router;
    this.title = 'storage-manager';
    this._loadingRoute = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(false);
    this.loadingRoute$ = this._loadingRoute.asObservable();
  }

  ngOnInit() {
    if (localStorage.getItem('cookie_consent') !== 'true') {
      this._snackBar.open('In addition to cookies which are necessary for the proper functioning of websites, we use cookies on your browser to improve your experience.', 'Consent', {
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }).afterDismissed().subscribe(() => localStorage.setItem('cookie_consent', 'true'));
    }

    this._router.events.subscribe(event => {
      if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__.NavigationStart) this._loadingRoute.next(true);else if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__.NavigationEnd) this._loadingRoute.next(false);
    });
  }

}

AppComponent.ɵfac = function AppComponent_Factory(t) {
  return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_4__.MatSnackBar), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
};

AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: AppComponent,
  selectors: [["app-root"]],
  decls: 5,
  vars: 4,
  consts: [[1, "body"], [1, "content"]],
  template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](1, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "app-navbar");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("loading", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](1, 2, ctx.loadingRoute$));
    }
  },
  directives: [_components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_0__.NavbarComponent, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterOutlet],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.AsyncPipe],
  styles: [".body[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: row;\n    height: -webkit-fill-available;\n    width: -webkit-fill-available;\n    overflow: hidden;\n}\n\n.body.loading[_ngcontent-%COMP%] { \n    opacity: .5;\n}\n\n.content[_ngcontent-%COMP%] {\n    flex: 1;\n    background-color: rgb(243, 243, 243);\n    overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtJQUNuQiw4QkFBOEI7SUFDOUIsNkJBQTZCO0lBQzdCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLE9BQU87SUFDUCxvQ0FBb0M7SUFDcEMsZ0JBQWdCO0FBQ3BCIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJvZHkge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBoZWlnaHQ6IC13ZWJraXQtZmlsbC1hdmFpbGFibGU7XG4gICAgd2lkdGg6IC13ZWJraXQtZmlsbC1hdmFpbGFibGU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmJvZHkubG9hZGluZyB7IFxuICAgIG9wYWNpdHk6IC41O1xufVxuXG4uY29udGVudCB7XG4gICAgZmxleDogMTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQzLCAyNDMsIDI0Myk7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbn0iXX0= */"]
});

/***/ }),

/***/ 36747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/platform-browser */ 34497);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 90158);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 55041);
/* harmony import */ var _components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/navbar/navbar.component */ 33252);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/platform-browser/animations */ 37146);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material/icon */ 57822);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/expansion */ 17591);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/material/table */ 85288);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/material/dialog */ 31484);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! @angular/common/http */ 58987);
/* harmony import */ var src_config_process_builder_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/config/process-builder-config */ 30800);
/* harmony import */ var src_config_params_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/config/params-config */ 29713);
/* harmony import */ var src_config_function_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/config/function-config */ 68133);
/* harmony import */ var src_config_interfaces_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/config/interfaces-config */ 9359);
/* harmony import */ var _components_main_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/main/visualizer/visualizer.component */ 84);
/* harmony import */ var _components_good_preview_good_preview_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/good-preview/good-preview.component */ 28142);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/material/button */ 84522);
/* harmony import */ var _pipes_pretty_length_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pipes/pretty-length.pipe */ 1399);
/* harmony import */ var _pipes_pretty_volume_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pipes/pretty-volume.pipe */ 51285);
/* harmony import */ var _components_dialog_edit_data_dialog_edit_data_dialog_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/dialog/edit-data-dialog/edit-data-dialog.component */ 8933);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @angular/material/tooltip */ 6896);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! @angular/material/toolbar */ 52543);
/* harmony import */ var _components_solution_preview_solution_preview_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/solution-preview/solution-preview.component */ 98067);
/* harmony import */ var _components_container_preview_container_preview_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/container-preview/container-preview.component */ 13599);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ng2-charts */ 53808);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! @angular/material/snack-bar */ 10930);
/* harmony import */ var _components_goods_panel_goods_panel_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/goods-panel/goods-panel.component */ 44611);
/* harmony import */ var _components_groups_panel_groups_panel_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/groups-panel/groups-panel.component */ 50982);
/* harmony import */ var _components_main_orders_orders_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/main/orders/orders.component */ 20056);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _pipes_sorted_form_array_pipe__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pipes/sorted-form-array.pipe */ 1662);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! @angular/material/sort */ 92197);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! @angular/material/input */ 68562);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! @angular/material/checkbox */ 44792);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! @angular/material/select */ 57371);
/* harmony import */ var _components_select_select_unit_select_unit_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/select/select-unit/select-unit.component */ 811);
/* harmony import */ var _components_main_calculation_calculation_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/main/calculation/calculation.component */ 83386);
/* harmony import */ var _components_dialog_api_call_configurator_dialog_api_call_configurator_dialog_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/dialog/api-call-configurator-dialog/api-call-configurator-dialog.component */ 6665);
/* harmony import */ var _components_select_select_group_select_group_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/select/select-group/select-group.component */ 4214);
/* harmony import */ var _components_select_select_product_select_product_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/select/select-product/select-product.component */ 61065);
/* harmony import */ var src_lib_automation_automation_module__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! src/lib/automation/automation.module */ 40260);
/* harmony import */ var _pipes_calculation_error_pipe__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./pipes/calculation-error.pipe */ 14045);
/* harmony import */ var _components_solution_animation_solution_animation_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/solution-animation/solution-animation.component */ 76774);
/* harmony import */ var _components_dialog_no_solution_dialog_no_solution_dialog_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/dialog/no-solution-dialog/no-solution-dialog.component */ 69735);
/* harmony import */ var _components_solution_validation_solution_validation_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/solution-validation/solution-validation.component */ 23846);
/* harmony import */ var _pipes_solution_validation_error_pipe__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./pipes/solution-validation-error.pipe */ 57293);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! @ngrx/store */ 23488);
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! @ngrx/effects */ 5405);
/* harmony import */ var src_lib_process_builder_globals_i_process_builder_config__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! src/lib/process-builder/globals/i-process-builder-config */ 37088);
/* harmony import */ var src_lib_process_builder_globals_i_param__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! src/lib/process-builder/globals/i-param */ 49075);
/* harmony import */ var src_lib_process_builder_globals_i_function__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! src/lib/process-builder/globals/i-function */ 10852);
/* harmony import */ var src_lib_process_builder_globals_i_interface__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! src/lib/process-builder/globals/i-interface */ 67371);
/* harmony import */ var src_lib_shared_shared_module__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! src/lib/shared/shared.module */ 49873);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @angular/material/menu */ 88589);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/core */ 22560);

























































class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_34__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_34__["ɵɵdefineInjector"]({ providers: [
        { provide: src_lib_process_builder_globals_i_process_builder_config__WEBPACK_IMPORTED_MODULE_29__.PROCESS_BUILDER_CONFIG_TOKEN, useValue: src_config_process_builder_config__WEBPACK_IMPORTED_MODULE_3__["default"] },
        { provide: src_lib_process_builder_globals_i_param__WEBPACK_IMPORTED_MODULE_30__.PARAMS_CONFIG_TOKEN, useValue: src_config_params_config__WEBPACK_IMPORTED_MODULE_4__["default"] },
        { provide: src_lib_process_builder_globals_i_function__WEBPACK_IMPORTED_MODULE_31__.FUNCTIONS_CONFIG_TOKEN, useValue: src_config_function_config__WEBPACK_IMPORTED_MODULE_5__["default"] },
        { provide: src_lib_process_builder_globals_i_interface__WEBPACK_IMPORTED_MODULE_32__.INTERFACES_CONFIG_TOKEN, useValue: src_config_interfaces_config__WEBPACK_IMPORTED_MODULE_6__["default"] },
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_35__.BrowserModule,
            _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_36__.BrowserAnimationsModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_37__.MatIconModule,
            _angular_material_expansion__WEBPACK_IMPORTED_MODULE_38__.MatExpansionModule,
            _angular_material_table__WEBPACK_IMPORTED_MODULE_39__.MatTableModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_40__.MatButtonModule,
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_41__.MatDialogModule,
            _angular_material_menu__WEBPACK_IMPORTED_MODULE_42__.MatMenuModule,
            _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_43__.MatTooltipModule,
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_44__.MatToolbarModule,
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_45__.MatSnackBarModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_46__.HttpClientModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_47__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_47__.ReactiveFormsModule,
            _angular_material_sort__WEBPACK_IMPORTED_MODULE_48__.MatSortModule,
            _angular_material_input__WEBPACK_IMPORTED_MODULE_49__.MatInputModule,
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_50__.MatCheckboxModule,
            _angular_material_select__WEBPACK_IMPORTED_MODULE_51__.MatSelectModule,
            ng2_charts__WEBPACK_IMPORTED_MODULE_52__.ChartsModule,
            src_lib_automation_automation_module__WEBPACK_IMPORTED_MODULE_23__.AutomationModule,
            src_lib_shared_shared_module__WEBPACK_IMPORTED_MODULE_33__.SharedModule,
            _ngrx_store__WEBPACK_IMPORTED_MODULE_53__.StoreModule.forRoot({}, {}),
            _ngrx_effects__WEBPACK_IMPORTED_MODULE_54__.EffectsModule.forRoot([])
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_34__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent,
        _components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_2__.NavbarComponent,
        _components_main_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_7__.VisualizerComponent,
        _components_good_preview_good_preview_component__WEBPACK_IMPORTED_MODULE_8__.GoodPreviewComponent,
        _pipes_pretty_length_pipe__WEBPACK_IMPORTED_MODULE_9__.PrettyLengthPipe,
        _pipes_pretty_volume_pipe__WEBPACK_IMPORTED_MODULE_10__.PrettyVolumePipe,
        _components_dialog_edit_data_dialog_edit_data_dialog_component__WEBPACK_IMPORTED_MODULE_11__.EditDataDialogComponent,
        _components_solution_preview_solution_preview_component__WEBPACK_IMPORTED_MODULE_12__.SolutionPreviewComponent,
        _components_container_preview_container_preview_component__WEBPACK_IMPORTED_MODULE_13__.ContainerPreviewComponent,
        _components_goods_panel_goods_panel_component__WEBPACK_IMPORTED_MODULE_14__.GoodsPanelComponent,
        _components_groups_panel_groups_panel_component__WEBPACK_IMPORTED_MODULE_15__.GroupsPanelComponent,
        _components_main_orders_orders_component__WEBPACK_IMPORTED_MODULE_16__.OrdersComponent,
        _pipes_sorted_form_array_pipe__WEBPACK_IMPORTED_MODULE_17__.SortedFormArrayPipe,
        _components_select_select_group_select_group_component__WEBPACK_IMPORTED_MODULE_21__.SelectGroupComponent,
        _components_select_select_product_select_product_component__WEBPACK_IMPORTED_MODULE_22__.SelectProductComponent,
        _components_select_select_unit_select_unit_component__WEBPACK_IMPORTED_MODULE_18__.SelectUnitComponent,
        _components_main_calculation_calculation_component__WEBPACK_IMPORTED_MODULE_19__.CalculationComponent,
        _components_dialog_api_call_configurator_dialog_api_call_configurator_dialog_component__WEBPACK_IMPORTED_MODULE_20__.ApiCallConfiguratorDialogComponent,
        _pipes_calculation_error_pipe__WEBPACK_IMPORTED_MODULE_24__.CalculationErrorPipe,
        _components_solution_animation_solution_animation_component__WEBPACK_IMPORTED_MODULE_25__.SolutionAnimationComponent,
        _components_dialog_no_solution_dialog_no_solution_dialog_component__WEBPACK_IMPORTED_MODULE_26__.NoSolutionDialogComponent,
        _components_solution_validation_solution_validation_component__WEBPACK_IMPORTED_MODULE_27__.SolutionValidationComponent,
        _pipes_solution_validation_error_pipe__WEBPACK_IMPORTED_MODULE_28__.SolutionValidationErrorPipe], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_35__.BrowserModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_36__.BrowserAnimationsModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_37__.MatIconModule,
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_38__.MatExpansionModule,
        _angular_material_table__WEBPACK_IMPORTED_MODULE_39__.MatTableModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_40__.MatButtonModule,
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_41__.MatDialogModule,
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_42__.MatMenuModule,
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_43__.MatTooltipModule,
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_44__.MatToolbarModule,
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_45__.MatSnackBarModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_46__.HttpClientModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_47__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_47__.ReactiveFormsModule,
        _angular_material_sort__WEBPACK_IMPORTED_MODULE_48__.MatSortModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_49__.MatInputModule,
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_50__.MatCheckboxModule,
        _angular_material_select__WEBPACK_IMPORTED_MODULE_51__.MatSelectModule,
        ng2_charts__WEBPACK_IMPORTED_MODULE_52__.ChartsModule,
        src_lib_automation_automation_module__WEBPACK_IMPORTED_MODULE_23__.AutomationModule,
        src_lib_shared_shared_module__WEBPACK_IMPORTED_MODULE_33__.SharedModule, _ngrx_store__WEBPACK_IMPORTED_MODULE_53__.StoreRootModule, _ngrx_effects__WEBPACK_IMPORTED_MODULE_54__.EffectsRootModule] }); })();


/***/ }),

/***/ 65444:
/*!****************************!*\
  !*** ./src/app/classes.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Container": () => (/* binding */ Container),
/* harmony export */   "Dimension": () => (/* binding */ Dimension),
/* harmony export */   "Good": () => (/* binding */ Good),
/* harmony export */   "Group": () => (/* binding */ Group),
/* harmony export */   "Order": () => (/* binding */ Order),
/* harmony export */   "Point": () => (/* binding */ Point),
/* harmony export */   "Product": () => (/* binding */ Product),
/* harmony export */   "Solution": () => (/* binding */ Solution),
/* harmony export */   "Space": () => (/* binding */ Space),
/* harmony export */   "Step": () => (/* binding */ Step),
/* harmony export */   "UnusedDimension": () => (/* binding */ UnusedDimension)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 56908);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globals */ 37503);


class Container {
    constructor(height = null, width = null, length = null) {
        this.height = null;
        this.width = null;
        this.length = null;
        this.goods = [];
        this.height = height;
        this.width = width;
        this.length = length;
    }
    getUnusedDimension() {
        let unusedDimension = new UnusedDimension(this.width, this.height, Infinity, null);
        unusedDimension.setPosition(0, 0, 0);
        return unusedDimension;
    }
}
class Good {
    constructor(id, x = null, y = null, z = null, sequenceNumber = null, description = null) {
        this.id = null;
        this.desc = null;
        this.height = null;
        this.group = null;
        this.width = null;
        this.length = null;
        this.turningAllowed = null;
        this.turned = null;
        this.stackingAllowed = null;
        this.stackedOnGood = null;
        this.x = null;
        this.y = null;
        this.z = null;
        this.sequenceNr = null;
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = z;
        this.sequenceNr = sequenceNumber;
        this.desc = description;
    }
    setOrderDimensions(order) {
        this.height = order.height;
        this.width = order.width;
        this.length = order.length;
        this.turningAllowed = order.turningAllowed;
        this.stackingAllowed = order.stackingAllowed;
        this.group = order.group;
    }
}
class Group {
}
class Order {
    constructor() {
        this.orderId = null;
        this.description = null;
        this.quantity = null;
        this.length = null;
        this.width = null;
        this.height = null;
        this.turningAllowed = true;
        this.stackingAllowed = false;
        this.group = null;
    }
}
class Point {
    constructor(x = null, y = null, z = null) {
        this.x = null;
        this.y = null;
        this.z = null;
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
class Product {
}
class Space {
    constructor(width = null, height = null, length = null) {
        this.width = null;
        this.height = null;
        this.length = null;
        this.width = width;
        this.height = height;
        this.length = length;
    }
}
class Dimension extends Space {
    constructor(width = null, height = null, length = null) {
        super(width, height, length);
        this.guid = (0,_globals__WEBPACK_IMPORTED_MODULE_1__.generateGuid)();
        this.x = null;
        this.y = null;
        this.z = null;
        this.r = null;
        this.t = null;
        this.f = null;
        this.points = [];
    }
    setPosition(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = x + this.width;
        this.t = y + this.height;
        this.f = z + this.length;
        this.points = [
            new Point(this.x, this.y, this.z),
            new Point(this.r, this.y, this.z),
            new Point(this.x, this.y, this.f),
            new Point(this.r, this.y, this.f),
            new Point(this.x, this.t, this.z),
            new Point(this.r, this.t, this.z),
            new Point(this.x, this.t, this.f),
            new Point(this.r, this.t, this.f),
        ];
    }
}
class UnusedDimension extends Dimension {
    constructor(width = null, height = null, length = null, stackedOn = null, groupRestrictedBy = null) {
        super(width, height, length);
        this.stackedOn = null;
        this.groupRestrictedBy = null;
        this.stackedOn = stackedOn;
        this.groupRestrictedBy = groupRestrictedBy;
    }
}
class Solution {
    constructor(id = (0,_globals__WEBPACK_IMPORTED_MODULE_1__.generateGuid)(), algorithm = null, calculated = moment__WEBPACK_IMPORTED_MODULE_0__().format('YYYY-MM-DDTHH:mm:ss')) {
        this.id = null;
        this.container = null;
        this.algorithm = null;
        this.groups = [];
        this.steps = [];
        this.calculated = null;
        this.description = null;
        this.id = id;
        this.algorithm = algorithm;
        this.calculated = calculated;
    }
}
class Step {
}


/***/ }),

/***/ 13599:
/*!*****************************************************************************!*\
  !*** ./src/app/components/container-preview/container-preview.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContainerPreviewComponent": () => (/* binding */ ContainerPreviewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng2-charts */ 53808);
/* harmony import */ var _pipes_pretty_length_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pipes/pretty-length.pipe */ 1399);
/* harmony import */ var _pipes_pretty_volume_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pipes/pretty-volume.pipe */ 51285);





function ContainerPreviewComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 3)(2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Container");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 5)(5, "div", 6)(6, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Breite");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](10, "prettyLength");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 6)(12, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "H\u00F6he");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](16, "prettyLength");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "div", 6)(18, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "L\u00E4nge");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](22, "prettyLength");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "div", 6)(24, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, "Volumen");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](28, "prettyVolume");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "div", 9)(30, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](31, "canvas", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "div", 12)(33, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](36, "Auslastung");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](10, 8, ctx_r0.container.width));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](16, 10, ctx_r0.container.height));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](22, 12, ctx_r0.container.length));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](28, 14, ctx_r0.container.length * ctx_r0.container.height * ctx_r0.container.width, true), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("datasets", ctx_r0.datasets)("labels", ctx_r0.labels)("options", ctx_r0.options);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx_r0.percentage, " %");
} }
function ContainerPreviewComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Kein Container verf\u00FCgbar ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
class ContainerPreviewComponent {
    constructor() {
        this.datasets = [
            {
                backgroundColor: ['rgba(101, 166, 90,  0.4)', 'rgba(214, 55, 55,  0.4)'],
                borderColor: ['rgba(101, 166, 90, 1.0)', 'rgba(214, 55, 55, 1.0)'],
                data: [0, 0]
            }
        ];
        this.labels = ['Belegt', 'Frei'];
        this.type = 'doughnut';
        this.options = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                position: 'bottom'
            }
        };
        this.percentage = '0';
    }
    ngOnChanges(changes) {
        if (changes['container'])
            this._calculateUsedSpace();
    }
    ngOnInit() {
        this._calculateUsedSpace();
    }
    _calculateUsedSpace() {
        if (!this.container || !Array.isArray(this.container.goods))
            return;
        let used = this.container.goods.reduce((x, curr) => x += (curr.length * curr.width * curr.height), 0);
        let total = this.container.height * this.container.length * this.container.width;
        this.datasets[0].data = [used, total - used];
        this.percentage = ((used / total) * 100).toFixed(0);
    }
}
ContainerPreviewComponent.ɵfac = function ContainerPreviewComponent_Factory(t) { return new (t || ContainerPreviewComponent)(); };
ContainerPreviewComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ContainerPreviewComponent, selectors: [["app-container-preview"]], inputs: { container: "container" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵNgOnChangesFeature"]], decls: 4, vars: 2, consts: [[1, "body"], [4, "ngIf", "ngIfElse"], ["noContainerAvailable", ""], [1, "description"], [1, "text"], [1, "property-row"], [1, "property"], [1, "attribute"], [1, "value"], [1, "chart-wrapper"], [1, "chart-inner"], ["baseChart", "", "chartType", "doughnut", 3, "datasets", "labels", "options"], [1, "percentage-wrapper"], [1, "percentage"], [1, "no-content-available"]], template: function ContainerPreviewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ContainerPreviewComponent_ng_container_1_Template, 37, 17, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, ContainerPreviewComponent_ng_template_2_Template, 2, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.container)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, ng2_charts__WEBPACK_IMPORTED_MODULE_4__.BaseChartDirective], pipes: [_pipes_pretty_length_pipe__WEBPACK_IMPORTED_MODULE_0__.PrettyLengthPipe, _pipes_pretty_volume_pipe__WEBPACK_IMPORTED_MODULE_1__.PrettyVolumePipe], styles: [".property[_ngcontent-%COMP%] {\n    flex: 1;\n    display: inline-flex;\n    flex-direction: column;\n    align-items: baseline;\n    margin-right: .5rem;\n}\n\n.property-row[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    margin-bottom: 1rem;\n}\n\n.description[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n}\n\n.description[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n    line-height: 1.2rem;\n    font-weight: 500;\n    margin-right: .5rem;\n}\n\n.property[_ngcontent-%COMP%]   .attribute[_ngcontent-%COMP%] {\n    margin-right: .2rem;\n    font-size: .8rem;\n}\n\n.property[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n    white-space: nowrap;\n    padding: 0.2rem;\n    background-color: #ececec;\n    border-radius: 3px;\n}\n\n.no-container-hint[_ngcontent-%COMP%] {\n    font-family: monospace;\n}\n\n.chart-wrapper[_ngcontent-%COMP%] {\n    display: flex;\n}\n\n.chart-wrapper[_ngcontent-%COMP%] > *[_ngcontent-%COMP%] {\n    flex: 1;\n    overflow: hidden;\n}\n\n.chart-wrapper[_ngcontent-%COMP%]   .percentage-wrapper[_ngcontent-%COMP%] {\n    max-width: 100px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-direction: column;\n}\n\n.chart-wrapper[_ngcontent-%COMP%]   .percentage-wrapper[_ngcontent-%COMP%]   .percentage[_ngcontent-%COMP%] {\n    font-size: 2rem;\n}\n\n.chart-wrapper[_ngcontent-%COMP%]   .percentage-wrapper[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%] {\n    margin-top: .2rem;\n    font-size: .8rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lci1wcmV2aWV3LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxPQUFPO0lBQ1Asb0JBQW9CO0lBQ3BCLHNCQUFzQjtJQUN0QixxQkFBcUI7SUFDckIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksaUJBQWlCO0lBQ2pCLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQixlQUFlO0lBQ2YseUJBQXlCO0lBQ3pCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxPQUFPO0lBQ1AsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsdUJBQXVCO0lBQ3ZCLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsZ0JBQWdCO0FBQ3BCIiwiZmlsZSI6ImNvbnRhaW5lci1wcmV2aWV3LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucHJvcGVydHkge1xuICAgIGZsZXg6IDE7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XG4gICAgbWFyZ2luLXJpZ2h0OiAuNXJlbTtcbn1cblxuLnByb3BlcnR5LXJvdyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbi5kZXNjcmlwdGlvbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uZGVzY3JpcHRpb24gLnRleHQge1xuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjJyZW07XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBtYXJnaW4tcmlnaHQ6IC41cmVtO1xufVxuXG4ucHJvcGVydHkgLmF0dHJpYnV0ZSB7XG4gICAgbWFyZ2luLXJpZ2h0OiAuMnJlbTtcbiAgICBmb250LXNpemU6IC44cmVtO1xufVxuXG4ucHJvcGVydHkgLnZhbHVlIHtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIHBhZGRpbmc6IDAuMnJlbTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWNlY2VjO1xuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbn1cblxuLm5vLWNvbnRhaW5lci1oaW50IHtcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xufVxuXG4uY2hhcnQtd3JhcHBlciB7XG4gICAgZGlzcGxheTogZmxleDtcbn1cblxuLmNoYXJ0LXdyYXBwZXI+KiB7XG4gICAgZmxleDogMTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4uY2hhcnQtd3JhcHBlciAucGVyY2VudGFnZS13cmFwcGVyIHtcbiAgICBtYXgtd2lkdGg6IDEwMHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4uY2hhcnQtd3JhcHBlciAucGVyY2VudGFnZS13cmFwcGVyIC5wZXJjZW50YWdlIHtcbiAgICBmb250LXNpemU6IDJyZW07XG59XG5cbi5jaGFydC13cmFwcGVyIC5wZXJjZW50YWdlLXdyYXBwZXIgLnRleHQge1xuICAgIG1hcmdpbi10b3A6IC4ycmVtO1xuICAgIGZvbnQtc2l6ZTogLjhyZW07XG59Il19 */"] });


/***/ }),

/***/ 54825:
/*!*******************************************************************************************************************!*\
  !*** ./src/app/components/dialog/api-call-configurator-dialog/api-call-configuration-dialog-component.service.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiCallConfiguratorComponentService": () => (/* binding */ ApiCallConfiguratorComponentService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_lib_automation_services_configure_api_call_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/lib/automation/services/configure-api-call.service */ 31129);


class ApiCallConfiguratorComponentService {
    constructor(_configureApiCallService) {
        this._configureApiCallService = _configureApiCallService;
    }
    takeConfiguration() {
        if (this.configurationFormGroup) {
            let config = this.configurationFormGroup.value;
            config.calculationEndpoint = this.formGroup.controls['endpoint'].value;
            this._configureApiCallService.setAuthType(this.formGroup.controls['authorization'].value);
            this._configureApiCallService.setConfiguration(config);
        }
    }
}
ApiCallConfiguratorComponentService.ɵfac = function ApiCallConfiguratorComponentService_Factory(t) { return new (t || ApiCallConfiguratorComponentService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](src_lib_automation_services_configure_api_call_service__WEBPACK_IMPORTED_MODULE_0__.ConfigureApiCallService)); };
ApiCallConfiguratorComponentService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ApiCallConfiguratorComponentService, factory: ApiCallConfiguratorComponentService.ɵfac });


/***/ }),

/***/ 6665:
/*!**********************************************************************************************************!*\
  !*** ./src/app/components/dialog/api-call-configurator-dialog/api-call-configurator-dialog.component.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiCallConfiguratorDialogComponent": () => (/* binding */ ApiCallConfiguratorDialogComponent)
/* harmony export */ });
/* harmony import */ var src_lib_automation_interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/lib/automation/interfaces */ 7686);
/* harmony import */ var _api_call_configuration_dialog_component_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api-call-configuration-dialog-component.service */ 54825);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ 31484);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 57822);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 84522);
/* harmony import */ var _lib_automation_components_api_call_configurator_api_call_configurator_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../lib/automation/components/api-call-configurator/api-call-configurator.component */ 1093);








class ApiCallConfiguratorDialogComponent {
    constructor(_apiCallConfiguratorComponentService, _ref) {
        this._apiCallConfiguratorComponentService = _apiCallConfiguratorComponentService;
        this._ref = _ref;
        this.close = () => this._ref.close();
    }
    ngOnInit() {
    }
    takeConfiguration() {
        this._apiCallConfiguratorComponentService.takeConfiguration();
        this.close();
    }
}
ApiCallConfiguratorDialogComponent.ɵfac = function ApiCallConfiguratorDialogComponent_Factory(t) { return new (t || ApiCallConfiguratorDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_api_call_configuration_dialog_component_service__WEBPACK_IMPORTED_MODULE_1__.ApiCallConfiguratorComponentService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogRef)); };
ApiCallConfiguratorDialogComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: ApiCallConfiguratorDialogComponent, selectors: [["app-api-call-configurator-dialog"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([
            _api_call_configuration_dialog_component_service__WEBPACK_IMPORTED_MODULE_1__.ApiCallConfiguratorComponentService,
            { provide: src_lib_automation_interfaces__WEBPACK_IMPORTED_MODULE_0__.FORM_GROUP_PROVIDER, useExisting: _api_call_configuration_dialog_component_service__WEBPACK_IMPORTED_MODULE_1__.ApiCallConfiguratorComponentService },
            { provide: src_lib_automation_interfaces__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION_FORM_GROUP_PROVIDER, useExisting: _api_call_configuration_dialog_component_service__WEBPACK_IMPORTED_MODULE_1__.ApiCallConfiguratorComponentService },
            { provide: src_lib_automation_interfaces__WEBPACK_IMPORTED_MODULE_0__.SUBMIT_CONFIGURATION_PROVIDER, useExisting: _api_call_configuration_dialog_component_service__WEBPACK_IMPORTED_MODULE_1__.ApiCallConfiguratorComponentService }
        ])], decls: 14, vars: 0, consts: [[1, "body", "dialog-body"], [1, "dialog-nav-bar"], [1, "icon"], [1, "text"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "content", "dialog-content"], [1, "footer"], ["mat-raised-button", "", "color", "primary", 3, "click"]], template: function ApiCallConfiguratorDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "mat-icon", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "build");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, " API Request konfigurieren ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ApiCallConfiguratorDialogComponent_Template_button_click_6_listener() { return ctx.close(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "clear");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](10, "app-api-call-configurator");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 6)(12, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ApiCallConfiguratorDialogComponent_Template_button_click_12_listener() { return ctx.takeConfiguration(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, " \u00DCbernehmen ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    } }, directives: [_angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton, _lib_automation_components_api_call_configurator_api_call_configurator_component__WEBPACK_IMPORTED_MODULE_2__.ApiCallConfiguratorComponent], styles: [".body[_ngcontent-%COMP%] {\n    width: 800px;\n    max-width: 80vw;\n    overflow: hidden;\n}\n\n.footer[_ngcontent-%COMP%] {\n    padding: .5rem 2rem;\n    display: flex;\n    justify-content: flex-end;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS1jYWxsLWNvbmZpZ3VyYXRvci1kaWFsb2cuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFlBQVk7SUFDWixlQUFlO0lBQ2YsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLGFBQWE7SUFDYix5QkFBeUI7QUFDN0IiLCJmaWxlIjoiYXBpLWNhbGwtY29uZmlndXJhdG9yLWRpYWxvZy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJvZHkge1xuICAgIHdpZHRoOiA4MDBweDtcbiAgICBtYXgtd2lkdGg6IDgwdnc7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmZvb3RlciB7XG4gICAgcGFkZGluZzogLjVyZW0gMnJlbTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG59XG4iXX0= */"] });


/***/ }),

/***/ 8933:
/*!**********************************************************************************!*\
  !*** ./src/app/components/dialog/edit-data-dialog/edit-data-dialog.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditDataDialogComponent": () => (/* binding */ EditDataDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/toolbar */ 52543);


class EditDataDialogComponent {
    constructor() { }
    ngOnInit() {
    }
}
EditDataDialogComponent.ɵfac = function EditDataDialogComponent_Factory(t) { return new (t || EditDataDialogComponent)(); };
EditDataDialogComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: EditDataDialogComponent, selectors: [["app-edit-data-dialog"]], decls: 3, vars: 0, consts: [[1, "body"], [1, "content"]], template: function EditDataDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-toolbar")(2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_1__.MatToolbar], styles: [".body[_ngcontent-%COMP%] {\n    height: 600px;\n    width: 1200px;\n    max-height: 80vh;\n    max-width: 80vw;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXQtZGF0YS1kaWFsb2cuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGFBQWE7SUFDYixhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLGVBQWU7QUFDbkIiLCJmaWxlIjoiZWRpdC1kYXRhLWRpYWxvZy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJvZHkge1xuICAgIGhlaWdodDogNjAwcHg7XG4gICAgd2lkdGg6IDEyMDBweDtcbiAgICBtYXgtaGVpZ2h0OiA4MHZoO1xuICAgIG1heC13aWR0aDogODB2dztcbn0iXX0= */"] });


/***/ }),

/***/ 69735:
/*!**************************************************************************************!*\
  !*** ./src/app/components/dialog/no-solution-dialog/no-solution-dialog.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoSolutionDialogComponent": () => (/* binding */ NoSolutionDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ 31484);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var src_app_services_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/data.service */ 52468);
/* harmony import */ var src_app_services_csv_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/csv.service */ 49697);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ 10930);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 57822);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 84522);









const _c0 = ["uploadSolution"];
class NoSolutionDialogComponent {
    constructor(_ref, _router, _dataService, _csvService, _snackBar) {
        this._ref = _ref;
        this._router = _router;
        this._dataService = _dataService;
        this._csvService = _csvService;
        this._snackBar = _snackBar;
        this.close = () => this._ref.close();
    }
    gotoOrders() {
        this._ref.close();
        this._router.navigate(['/orders']);
    }
    gotoPipelineDesigner() {
        this._ref.close();
        this._router.navigate(['/data-pipeline-designer']);
    }
    ngOnInit() {
    }
    useExampleData() {
        this.close();
        this._csvService.uploadDefaultOrders().subscribe(() => this._router.navigate(['/calculation']));
    }
    uploadOwnSolution(evt) {
        let file = evt.target.files[0];
        (this.uploadSolutionInput.nativeElement).value = '';
        if (!file)
            return;
        let reader = new FileReader();
        reader.onloadend = () => {
            try {
                let result = JSON.parse(reader.result);
                this._dataService.setCurrentSolution(result);
                this._router.navigate(['/visualizer']);
                this._ref.close();
            }
            catch (error) {
                this._snackBar.open(`error during solution import: ${error}`, 'ok', { duration: 3000 });
            }
        };
        reader.readAsText(file);
    }
    useExampleSolution() {
        this.close();
        this._dataService.loadDefaultSolution().subscribe(() => this._router.navigate(['/visualizer']));
    }
}
NoSolutionDialogComponent.ɵfac = function NoSolutionDialogComponent_Factory(t) { return new (t || NoSolutionDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_data_service__WEBPACK_IMPORTED_MODULE_0__.DataService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_csv_service__WEBPACK_IMPORTED_MODULE_1__.CsvService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__.MatSnackBar)); };
NoSolutionDialogComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: NoSolutionDialogComponent, selectors: [["app-no-solution-dialog"]], viewQuery: function NoSolutionDialogComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5, _angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.uploadSolutionInput = _t.first);
    } }, decls: 55, vars: 1, consts: [[1, "body", "dialog-body"], [1, "dialog-nav-bar"], [1, "icon"], [1, "text"], ["mat-icon-button", "", "color", "warn", 3, "disabled", "click"], [1, "content", "dialog-content"], [1, "user-hint"], [1, "suggeston-wrapper"], [1, "suggestion", "data-pipeline", 3, "click"], [1, "headline"], [1, "sub-title"], [1, "footer"], [1, "suggestion", "static-orders", 3, "click"], [1, "suggestion", "exemplary-data", 3, "click"], [1, "suggestion", "exemplary-solution", 3, "click"], [1, "suggestion", "upload-own-solution", 3, "click"], ["type", "file", "accept", "application/json", 1, "file-upload", 2, "display", "none", 3, "input"], ["uploadSolution", ""]], template: function NoSolutionDialogComponent_Template(rf, ctx) { if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "mat-icon", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "block");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, " no data found ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function NoSolutionDialogComponent_Template_button_click_6_listener() { return ctx.close(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "clear");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 5)(10, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, " No data to display. Decide for one option to proceed. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 7)(13, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function NoSolutionDialogComponent_Template_div_click_13_listener() { return ctx.gotoPipelineDesigner(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, " design data pipeline ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, " design a flow to import data and calculate solution ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 11)(19, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "hub");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function NoSolutionDialogComponent_Template_div_click_21_listener() { return ctx.gotoOrders(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, " use static orders ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, " navigate to order preview and provide static set ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "div", 11)(27, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, "web_stories");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function NoSolutionDialogComponent_Template_div_click_29_listener() { return ctx.useExampleData(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31, " use exemplary data ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](33, " use exemplary data and navigate to algorithm overview ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "div", 11)(35, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](36, "tips_and_updates");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function NoSolutionDialogComponent_Template_div_click_37_listener() { return ctx.useExampleSolution(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](38, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](39, " use exemplary solution ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](40, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](41, " use and visualize exemplary solution ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "div", 11)(43, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](44, "view_in_ar");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](45, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function NoSolutionDialogComponent_Template_div_click_45_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](54); return _r0.click(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](46, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](47, " upload solution ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](48, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](49, " upload an own solution ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](50, "div", 11)(51, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](52, "grid_on");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](53, "input", 16, 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("input", function NoSolutionDialogComponent_Template_input_input_53_listener($event) { return ctx.uploadOwnSolution($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", true);
    } }, directives: [_angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButton], styles: [".body[_ngcontent-%COMP%] {\n    overflow: hidden;\n    display: flex;\n    flex-direction: column;\n    max-width: 716px;\n}\n\n.content[_ngcontent-%COMP%] {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    background-color: #f7f7f7;\n}\n\n.user-hint[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n    font-weight: 100;\n}\n\n.suggeston-wrapper[_ngcontent-%COMP%] {\n    flex: 1;\n    overflow-x: auto;\n    padding-bottom: 1rem;\n}\n\n.suggestion[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-direction: column;\n    vertical-align: top;\n    width: 196px;\n    height: 140px;\n    border-radius: 3px;\n    cursor: pointer;\n    transition: .5s all ease-out;\n    border-radius: 3px;\n    padding: 0.5rem;\n    margin-bottom: 0.3rem;\n    margin-right: 0.3rem;\n    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);\n    -webkit-user-select: none;\n            user-select: none;\n}\n\n.suggestion.data-pipeline[_ngcontent-%COMP%] {\n    background: linear-gradient(135deg, #0078d4, #0078d4bd, #0078d4);\n}\n\n.suggestion.static-orders[_ngcontent-%COMP%] {\n    background: linear-gradient(135deg, #00aed4, #00aed4b0, #00aed4);\n}\n\n.suggestion.exemplary-data[_ngcontent-%COMP%] {\n    background: linear-gradient(135deg, #6000d4, #6000d4a3, #6000d4);\n}\n\n.suggestion.exemplary-solution[_ngcontent-%COMP%] {\n    background: linear-gradient(135deg, #444444, #444444c7, #444444);\n}\n\n.suggestion.upload-own-solution[_ngcontent-%COMP%] {\n    background: linear-gradient(135deg, #181818, #181818bf, #181818);\n}\n\n.suggestion[_ngcontent-%COMP%]:hover {\n    opacity: .8;\n}\n\n.suggestion[_ngcontent-%COMP%]   .headline[_ngcontent-%COMP%] {\n    padding: 0.5rem;\n    font-weight: 500;\n    text-align: center;\n    color: white;\n}\n\n.suggestion[_ngcontent-%COMP%]   .sub-title[_ngcontent-%COMP%] {\n    white-space: break-spaces;\n    padding: 0.5rem;\n    color: #e3e3e3;\n    flex: 1;\n    font-size: .7rem;\n    text-align: center;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    line-height: .8rem;\n    font-weight: 100;\n}\n\n.suggestion[_ngcontent-%COMP%]   .footer[_ngcontent-%COMP%] {\n    text-align: center;\n}\n\n.suggestion[_ngcontent-%COMP%]   .footer[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    height: auto;\n    width: auto;\n    font-size: 3rem;\n    line-height: 3rem;\n    color: #ffffff;\n    opacity: .5;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vLXNvbHV0aW9uLWRpYWxvZy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksT0FBTztJQUNQLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLE9BQU87SUFDUCxnQkFBZ0I7SUFDaEIsb0JBQW9CO0FBQ3hCOztBQUVBO0lBQ0ksb0JBQW9CO0lBQ3BCLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLDRCQUE0QjtJQUM1QixrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLHFCQUFxQjtJQUNyQixvQkFBb0I7SUFDcEIsaUhBQWlIO0lBQ2pILHlCQUFpQjtZQUFqQixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxnRUFBZ0U7QUFDcEU7O0FBRUE7SUFDSSxnRUFBZ0U7QUFDcEU7O0FBRUE7SUFDSSxnRUFBZ0U7QUFDcEU7O0FBRUE7SUFDSSxnRUFBZ0U7QUFDcEU7O0FBRUE7SUFDSSxnRUFBZ0U7QUFDcEU7O0FBRUE7SUFDSSxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLGVBQWU7SUFDZixjQUFjO0lBQ2QsT0FBTztJQUNQLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIsa0JBQWtCO0lBQ2xCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLFlBQVk7SUFDWixXQUFXO0lBQ1gsZUFBZTtJQUNmLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2QsV0FBVztBQUNmIiwiZmlsZSI6Im5vLXNvbHV0aW9uLWRpYWxvZy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJvZHkge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIG1heC13aWR0aDogNzE2cHg7XG59XG5cbi5jb250ZW50IHtcbiAgICBmbGV4OiAxO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmN2Y3O1xufVxuXG4udXNlci1oaW50IHtcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICAgIGZvbnQtd2VpZ2h0OiAxMDA7XG59XG5cbi5zdWdnZXN0b24td3JhcHBlciB7XG4gICAgZmxleDogMTtcbiAgICBvdmVyZmxvdy14OiBhdXRvO1xuICAgIHBhZGRpbmctYm90dG9tOiAxcmVtO1xufVxuXG4uc3VnZ2VzdGlvbiB7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIHdpZHRoOiAxOTZweDtcbiAgICBoZWlnaHQ6IDE0MHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgdHJhbnNpdGlvbjogLjVzIGFsbCBlYXNlLW91dDtcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgcGFkZGluZzogMC41cmVtO1xuICAgIG1hcmdpbi1ib3R0b206IDAuM3JlbTtcbiAgICBtYXJnaW4tcmlnaHQ6IDAuM3JlbTtcbiAgICBib3gtc2hhZG93OiAwcHggM3B4IDFweCAtMnB4IHJnYigwIDAgMCAvIDIwJSksIDBweCAycHggMnB4IDBweCByZ2IoMCAwIDAgLyAxNCUpLCAwcHggMXB4IDVweCAwcHggcmdiKDAgMCAwIC8gMTIlKTtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuLnN1Z2dlc3Rpb24uZGF0YS1waXBlbGluZSB7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzAwNzhkNCwgIzAwNzhkNGJkLCAjMDA3OGQ0KTtcbn1cblxuLnN1Z2dlc3Rpb24uc3RhdGljLW9yZGVycyB7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzAwYWVkNCwgIzAwYWVkNGIwLCAjMDBhZWQ0KTtcbn1cblxuLnN1Z2dlc3Rpb24uZXhlbXBsYXJ5LWRhdGEge1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2MDAwZDQsICM2MDAwZDRhMywgIzYwMDBkNCk7XG59XG5cbi5zdWdnZXN0aW9uLmV4ZW1wbGFyeS1zb2x1dGlvbiB7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzQ0NDQ0NCwgIzQ0NDQ0NGM3LCAjNDQ0NDQ0KTtcbn1cblxuLnN1Z2dlc3Rpb24udXBsb2FkLW93bi1zb2x1dGlvbiB7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzE4MTgxOCwgIzE4MTgxOGJmLCAjMTgxODE4KTtcbn1cblxuLnN1Z2dlc3Rpb246aG92ZXIge1xuICAgIG9wYWNpdHk6IC44O1xufVxuXG4uc3VnZ2VzdGlvbiAuaGVhZGxpbmUge1xuICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBjb2xvcjogd2hpdGU7XG59XG5cbi5zdWdnZXN0aW9uIC5zdWItdGl0bGUge1xuICAgIHdoaXRlLXNwYWNlOiBicmVhay1zcGFjZXM7XG4gICAgcGFkZGluZzogMC41cmVtO1xuICAgIGNvbG9yOiAjZTNlM2UzO1xuICAgIGZsZXg6IDE7XG4gICAgZm9udC1zaXplOiAuN3JlbTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGxpbmUtaGVpZ2h0OiAuOHJlbTtcbiAgICBmb250LXdlaWdodDogMTAwO1xufVxuXG4uc3VnZ2VzdGlvbiAuZm9vdGVyIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5zdWdnZXN0aW9uIC5mb290ZXIgbWF0LWljb24ge1xuICAgIGhlaWdodDogYXV0bztcbiAgICB3aWR0aDogYXV0bztcbiAgICBmb250LXNpemU6IDNyZW07XG4gICAgbGluZS1oZWlnaHQ6IDNyZW07XG4gICAgY29sb3I6ICNmZmZmZmY7XG4gICAgb3BhY2l0eTogLjU7XG59Il19 */"] });


/***/ }),

/***/ 28142:
/*!*******************************************************************!*\
  !*** ./src/app/components/good-preview/good-preview.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GoodPreviewComponent": () => (/* binding */ GoodPreviewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 84522);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 57822);
/* harmony import */ var _pipes_pretty_length_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pipes/pretty-length.pipe */ 1399);
/* harmony import */ var _pipes_pretty_volume_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pipes/pretty-volume.pipe */ 51285);






function GoodPreviewComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 3)(2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 5)(5, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "search");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 6)(8, "div", 7)(9, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Breite");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](13, "prettyLength");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 7)(15, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "H\u00F6he");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](19, "prettyLength");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "div", 7)(21, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "L\u00E4nge");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](25, "prettyLength");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "div", 7)(27, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, "Volumen");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](31, "prettyVolume");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "div", 6)(33, "div", 7)(34, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](35, "x-Koordinate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](38, "div", 7)(39, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](40, "y-Koordinate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](42);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "div", 7)(44, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](45, "z-Koordinate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](46, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](47);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.good.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](13, 8, ctx_r0.good.width));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](19, 10, ctx_r0.good.height));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](25, 12, ctx_r0.good.length));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](31, 14, ctx_r0.good.length * ctx_r0.good.height * ctx_r0.good.width, true));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.good.x);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.good.y);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.good.z);
} }
function GoodPreviewComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Kein Element ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
class GoodPreviewComponent {
    constructor() {
        this.columns = [];
    }
}
GoodPreviewComponent.ɵfac = function GoodPreviewComponent_Factory(t) { return new (t || GoodPreviewComponent)(); };
GoodPreviewComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: GoodPreviewComponent, selectors: [["app-good-preview"]], inputs: { good: "good" }, decls: 4, vars: 2, consts: [[1, "body"], [4, "ngIf", "ngIfElse"], ["noGood", ""], [1, "description"], [1, "text"], ["mat-icon-button", ""], [1, "property-row"], [1, "property"], [1, "attribute"], [1, "value"], [1, "no-good-hint"]], template: function GoodPreviewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, GoodPreviewComponent_ng_container_1_Template, 48, 17, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, GoodPreviewComponent_ng_template_2_Template, 2, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.good)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon], pipes: [_pipes_pretty_length_pipe__WEBPACK_IMPORTED_MODULE_0__.PrettyLengthPipe, _pipes_pretty_volume_pipe__WEBPACK_IMPORTED_MODULE_1__.PrettyVolumePipe], styles: [".property[_ngcontent-%COMP%] {\n    flex: 1;\n    display: inline-flex;\n    flex-direction: column;\n    align-items: baseline;\n    margin-right: .5rem;\n}\n\n.property-row[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    margin-bottom: 1rem;\n}\n\n.description[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n}\n\n.description[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n    line-height: 1.2rem;\n    font-weight: 500;\n    margin-right: .5rem;\n}\n\n.property[_ngcontent-%COMP%]   .attribute[_ngcontent-%COMP%] {\n    margin-right: .2rem;\n    font-size: .8rem;\n}\n\n.property[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n    white-space: nowrap;\n    padding: 0.2rem;\n    background-color: #ececec;\n    border-radius: 3px;\n}\n\n.no-good-hint[_ngcontent-%COMP%] {\n    font-family: monospace;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdvb2QtcHJldmlldy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksT0FBTztJQUNQLG9CQUFvQjtJQUNwQixzQkFBc0I7SUFDdEIscUJBQXFCO0lBQ3JCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixtQkFBbUI7SUFDbkIsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsZUFBZTtJQUNmLHlCQUF5QjtJQUN6QixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxzQkFBc0I7QUFDMUIiLCJmaWxlIjoiZ29vZC1wcmV2aWV3LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucHJvcGVydHkge1xuICAgIGZsZXg6IDE7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XG4gICAgbWFyZ2luLXJpZ2h0OiAuNXJlbTtcbn1cblxuLnByb3BlcnR5LXJvdyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbi5kZXNjcmlwdGlvbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uZGVzY3JpcHRpb24gLnRleHQge1xuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjJyZW07XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBtYXJnaW4tcmlnaHQ6IC41cmVtO1xufVxuXG4ucHJvcGVydHkgLmF0dHJpYnV0ZSB7XG4gICAgbWFyZ2luLXJpZ2h0OiAuMnJlbTtcbiAgICBmb250LXNpemU6IC44cmVtO1xufVxuXG4ucHJvcGVydHkgLnZhbHVlIHtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIHBhZGRpbmc6IDAuMnJlbTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWNlY2VjO1xuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbn1cblxuLm5vLWdvb2QtaGludCB7XG4gICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ 44611:
/*!*****************************************************************!*\
  !*** ./src/app/components/goods-panel/goods-panel.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GoodsPanelComponent": () => (/* binding */ GoodsPanelComponent)
/* harmony export */ });
/* harmony import */ var src_app_interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/interfaces */ 43780);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _main_visualizer_visualizer_component_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../main/visualizer/visualizer-component-service */ 7078);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/table */ 85288);
/* harmony import */ var _pipes_pretty_length_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pipes/pretty-length.pipe */ 1399);







function GoodsPanelComponent_ng_container_1_th_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "th", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Beschreibung");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}

function GoodsPanelComponent_ng_container_1_td_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const element_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](element_r18.description);
  }
}

function GoodsPanelComponent_ng_container_1_td_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (tmp_0_0 = (tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 1, ctx_r5.goodsProvider.goods$)) == null ? null : tmp_0_0.length) !== null && tmp_0_0 !== undefined ? tmp_0_0 : 0, " G\u00FCter ");
  }
}

function GoodsPanelComponent_ng_container_1_th_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "th", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "H\u00F6he");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}

function GoodsPanelComponent_ng_container_1_td_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "prettyLength");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const element_r19 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 1, element_r19.height));
  }
}

function GoodsPanelComponent_ng_container_1_td_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "td", 22);
  }
}

function GoodsPanelComponent_ng_container_1_th_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "th", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Breite");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}

function GoodsPanelComponent_ng_container_1_td_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "prettyLength");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const element_r20 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 1, element_r20.width));
  }
}

function GoodsPanelComponent_ng_container_1_td_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "td", 22);
  }
}

function GoodsPanelComponent_ng_container_1_th_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "th", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "L\u00E4nge");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}

function GoodsPanelComponent_ng_container_1_td_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "prettyLength");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const element_r21 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 1, element_r21.length));
  }
}

function GoodsPanelComponent_ng_container_1_td_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "td", 22);
  }
}

function GoodsPanelComponent_ng_container_1_tr_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "tr", 23);
  }
}

function GoodsPanelComponent_ng_container_1_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("mouseenter", function GoodsPanelComponent_ng_container_1_tr_20_Template_tr_mouseenter_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r25);
      const row_r22 = restoredCtx.$implicit;
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return ctx_r24.hoverGood(row_r22);
    })("click", function GoodsPanelComponent_ng_container_1_tr_20_Template_tr_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r25);
      const row_r22 = restoredCtx.$implicit;
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return ctx_r26.selectGood(row_r22);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}

function GoodsPanelComponent_ng_container_1_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "tr", 25);
  }
}

function GoodsPanelComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "table", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](3, 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, GoodsPanelComponent_ng_container_1_th_4_Template, 2, 0, "th", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, GoodsPanelComponent_ng_container_1_td_5_Template, 2, 1, "td", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, GoodsPanelComponent_ng_container_1_td_6_Template, 3, 3, "td", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](7, 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, GoodsPanelComponent_ng_container_1_th_8_Template, 2, 0, "th", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, GoodsPanelComponent_ng_container_1_td_9_Template, 3, 3, "td", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, GoodsPanelComponent_ng_container_1_td_10_Template, 1, 0, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](11, 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](12, GoodsPanelComponent_ng_container_1_th_12_Template, 2, 0, "th", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](13, GoodsPanelComponent_ng_container_1_td_13_Template, 3, 3, "td", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](14, GoodsPanelComponent_ng_container_1_td_14_Template, 1, 0, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](15, 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](16, GoodsPanelComponent_ng_container_1_th_16_Template, 2, 0, "th", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](17, GoodsPanelComponent_ng_container_1_td_17_Template, 3, 3, "td", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](18, GoodsPanelComponent_ng_container_1_td_18_Template, 1, 0, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](19, GoodsPanelComponent_ng_container_1_tr_19_Template, 1, 0, "tr", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](20, GoodsPanelComponent_ng_container_1_tr_20_Template, 1, 0, "tr", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](21, GoodsPanelComponent_ng_container_1_tr_21_Template, 1, 0, "tr", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("dataSource", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 6, ctx_r0.goodsProvider.goods$));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matHeaderRowDef", ctx_r0.columns)("matHeaderRowDefSticky", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matRowDefColumns", ctx_r0.columns);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matFooterRowDef", ctx_r0.columns)("matFooterRowDefSticky", true);
  }
}

function GoodsPanelComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Keine G\u00FCter verf\u00FCgbar ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}

class GoodsPanelComponent {
  constructor(goodsProvider, _visualizerComponentService) {
    this.goodsProvider = goodsProvider;
    this._visualizerComponentService = _visualizerComponentService;
    this.columns = ['desc', 'height', 'width', 'length'];
    this._subscriptions = [];

    this.hoverGood = good => this._visualizerComponentService.highlightGood(good);

    this.selectGood = good => this._visualizerComponentService.selectGood(good);
  }

  ngOnDestroy() {
    for (let sub of this._subscriptions) sub.unsubscribe();

    this._subscriptions = [];
  }

  ngOnInit() {}

}

GoodsPanelComponent.ɵfac = function GoodsPanelComponent_Factory(t) {
  return new (t || GoodsPanelComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_interfaces__WEBPACK_IMPORTED_MODULE_0__.GOODS_PROVIDER), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_main_visualizer_visualizer_component_service__WEBPACK_IMPORTED_MODULE_1__.VisualizerComponentService));
};

GoodsPanelComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: GoodsPanelComponent,
  selectors: [["app-goods-panel"]],
  decls: 5,
  vars: 4,
  consts: [[1, "body"], [4, "ngIf", "ngIfElse"], ["noGoodsAvailable", ""], ["mat-table", "", 1, "smgr-table", "small", "striped", 3, "dataSource"], ["matColumnDef", "desc"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-footer-cell", "", "class", "footer-cell", "colspan", "5", 4, "matFooterCellDef"], ["matColumnDef", "height"], ["mat-header-cell", "", "class", "centered-cell", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "centered-cell", 4, "matCellDef"], ["mat-footer-cell", "", 4, "matFooterCellDef"], ["matColumnDef", "width"], ["matColumnDef", "length"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", "class", "smgr-table-body-row hoverable", 3, "mouseenter", "click", 4, "matRowDef", "matRowDefColumns"], ["mat-footer-row", "", 4, "matFooterRowDef", "matFooterRowDefSticky"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-footer-cell", "", "colspan", "5", 1, "footer-cell"], ["mat-header-cell", "", 1, "centered-cell"], ["mat-cell", "", 1, "centered-cell"], ["mat-footer-cell", ""], ["mat-header-row", ""], ["mat-row", "", 1, "smgr-table-body-row", "hoverable", 3, "mouseenter", "click"], ["mat-footer-row", ""], [1, "no-content-available"]],
  template: function GoodsPanelComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, GoodsPanelComponent_ng_container_1_Template, 22, 8, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, GoodsPanelComponent_ng_template_3_Template, 2, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
    }

    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](4);

      let tmp_0_0;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ((tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 2, ctx.goodsProvider.goods$)) == null ? null : tmp_0_0.length) > 0)("ngIfElse", _r1);
    }
  },
  directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatFooterCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatFooterCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatFooterRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatFooterRow],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.AsyncPipe, _pipes_pretty_length_pipe__WEBPACK_IMPORTED_MODULE_2__.PrettyLengthPipe],
  styles: [".body[_ngcontent-%COMP%] {\n    max-height: 400px;\n    overflow-y: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdvb2RzLXBhbmVsLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxpQkFBaUI7SUFDakIsZ0JBQWdCO0FBQ3BCIiwiZmlsZSI6Imdvb2RzLXBhbmVsLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYm9keSB7XG4gICAgbWF4LWhlaWdodDogNDAwcHg7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbn0iXX0= */"]
});

/***/ }),

/***/ 50982:
/*!*******************************************************************!*\
  !*** ./src/app/components/groups-panel/groups-panel.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GroupsPanelComponent": () => (/* binding */ GroupsPanelComponent)
/* harmony export */ });
/* harmony import */ var src_app_interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/interfaces */ 43780);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _main_visualizer_visualizer_component_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../main/visualizer/visualizer-component-service */ 7078);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/table */ 85288);






function GroupsPanelComponent_ng_container_1_th_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Beschreibung");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}

function GroupsPanelComponent_ng_container_1_td_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const element_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](element_r12._Desc);
  }
}

function GroupsPanelComponent_ng_container_1_td_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", (tmp_0_0 = (tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 1, ctx_r5.groupsProvider.groups$)) == null ? null : tmp_0_0.length) !== null && tmp_0_0 !== undefined ? tmp_0_0 : 0, " Gruppen ");
  }
}

function GroupsPanelComponent_ng_container_1_th_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Farbe");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}

function GroupsPanelComponent_ng_container_1_td_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 19)(1, "input", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("input", function GroupsPanelComponent_ng_container_1_td_9_Template_input_input_1_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r15);
      const element_r13 = restoredCtx.$implicit;
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return ctx_r14.setGroupColor($event, element_r13);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const element_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", element_r13._Color);
  }
}

function GroupsPanelComponent_ng_container_1_td_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "td", 21);
  }
}

function GroupsPanelComponent_ng_container_1_tr_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "tr", 22);
  }
}

function GroupsPanelComponent_ng_container_1_tr_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "tr", 23);
  }
}

function GroupsPanelComponent_ng_container_1_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "tr", 24);
  }
}

function GroupsPanelComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "table", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](3, 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, GroupsPanelComponent_ng_container_1_th_4_Template, 2, 0, "th", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, GroupsPanelComponent_ng_container_1_td_5_Template, 2, 1, "td", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, GroupsPanelComponent_ng_container_1_td_6_Template, 3, 3, "td", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](7, 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, GroupsPanelComponent_ng_container_1_th_8_Template, 2, 0, "th", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, GroupsPanelComponent_ng_container_1_td_9_Template, 2, 1, "td", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, GroupsPanelComponent_ng_container_1_td_10_Template, 1, 0, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, GroupsPanelComponent_ng_container_1_tr_11_Template, 1, 0, "tr", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](12, GroupsPanelComponent_ng_container_1_tr_12_Template, 1, 0, "tr", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, GroupsPanelComponent_ng_container_1_tr_13_Template, 1, 0, "tr", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("dataSource", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 6, ctx_r0.groupsProvider.groups$));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matHeaderRowDef", ctx_r0.columns)("matHeaderRowDefSticky", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matRowDefColumns", ctx_r0.columns);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matFooterRowDef", ctx_r0.columns)("matFooterRowDefSticky", true);
  }
}

function GroupsPanelComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Keine Gruppen verf\u00FCgbar ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}

class GroupsPanelComponent {
  constructor(groupsProvider, _visualizerComponentService) {
    this.groupsProvider = groupsProvider;
    this._visualizerComponentService = _visualizerComponentService;
    this.columns = ['desc', 'color'];
    this._subscriptions = [];
  }

  ngOnDestroy() {
    for (let sub of this._subscriptions) sub.unsubscribe();

    this._subscriptions = [];
  }

  ngOnInit() {}

  setGroupColor(event, group) {
    group.color = event.target.value;

    this._visualizerComponentService.updateGroupColors();
  }

}

GroupsPanelComponent.ɵfac = function GroupsPanelComponent_Factory(t) {
  return new (t || GroupsPanelComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_interfaces__WEBPACK_IMPORTED_MODULE_0__.GROUPS_PROVIDER), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_main_visualizer_visualizer_component_service__WEBPACK_IMPORTED_MODULE_1__.VisualizerComponentService));
};

GroupsPanelComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: GroupsPanelComponent,
  selectors: [["app-groups-panel"]],
  decls: 5,
  vars: 4,
  consts: [[1, "body"], [4, "ngIf", "ngIfElse"], ["noGroupsAvailable", ""], ["mat-table", "", 1, "smgr-table", "small", "striped", 3, "dataSource"], ["matColumnDef", "desc"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-footer-cell", "", "class", "footer-cell", "colspan", "2", 4, "matFooterCellDef"], ["matColumnDef", "color"], ["mat-header-cell", "", "class", "centered-cell", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "centered-cell", 4, "matCellDef"], ["mat-footer-cell", "", 4, "matFooterCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", "class", "smgr-table-body-row hoverable", 4, "matRowDef", "matRowDefColumns"], ["mat-footer-row", "", 4, "matFooterRowDef", "matFooterRowDefSticky"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-footer-cell", "", "colspan", "2", 1, "footer-cell"], ["mat-header-cell", "", 1, "centered-cell"], ["mat-cell", "", 1, "centered-cell"], ["type", "color", 3, "value", "input"], ["mat-footer-cell", ""], ["mat-header-row", ""], ["mat-row", "", 1, "smgr-table-body-row", "hoverable"], ["mat-footer-row", ""], [1, "no-content-available"]],
  template: function GroupsPanelComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, GroupsPanelComponent_ng_container_1_Template, 14, 8, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, GroupsPanelComponent_ng_template_3_Template, 2, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    }

    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](4);

      let tmp_0_0;
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ((tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 2, ctx.groupsProvider.groups$)) == null ? null : tmp_0_0.length) > 0)("ngIfElse", _r1);
    }
  },
  directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatFooterCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatFooterCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatFooterRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatFooterRow],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.AsyncPipe],
  styles: [".body[_ngcontent-%COMP%] {\n    max-height: 400px;\n    overflow-y: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyb3Vwcy1wYW5lbC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksaUJBQWlCO0lBQ2pCLGdCQUFnQjtBQUNwQiIsImZpbGUiOiJncm91cHMtcGFuZWwuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ib2R5IHtcbiAgICBtYXgtaGVpZ2h0OiA0MDBweDtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xufSJdfQ== */"]
});

/***/ }),

/***/ 4908:
/*!******************************************************************************!*\
  !*** ./src/app/components/main/calculation/calculation-component.classes.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ALGORITHM_CALCULATION_STATUS": () => (/* binding */ ALGORITHM_CALCULATION_STATUS),
/* harmony export */   "AlgorihmStatusWrapper": () => (/* binding */ AlgorihmStatusWrapper),
/* harmony export */   "CALCULATION_ERROR": () => (/* binding */ CALCULATION_ERROR)
/* harmony export */ });
class AlgorihmStatusWrapper {
    constructor() {
        this.status = ALGORITHM_CALCULATION_STATUS.UNCHECKED;
    }
}
var ALGORITHM_CALCULATION_STATUS;
(function (ALGORITHM_CALCULATION_STATUS) {
    ALGORITHM_CALCULATION_STATUS[ALGORITHM_CALCULATION_STATUS["UNCHECKED"] = 0] = "UNCHECKED";
    ALGORITHM_CALCULATION_STATUS[ALGORITHM_CALCULATION_STATUS["PENDING"] = 1] = "PENDING";
    ALGORITHM_CALCULATION_STATUS[ALGORITHM_CALCULATION_STATUS["PREPARE_CALCULATION"] = 2] = "PREPARE_CALCULATION";
    ALGORITHM_CALCULATION_STATUS[ALGORITHM_CALCULATION_STATUS["CALCULATING"] = 3] = "CALCULATING";
    ALGORITHM_CALCULATION_STATUS[ALGORITHM_CALCULATION_STATUS["CALCULATED"] = 4] = "CALCULATED";
    ALGORITHM_CALCULATION_STATUS[ALGORITHM_CALCULATION_STATUS["ERROR"] = 5] = "ERROR";
})(ALGORITHM_CALCULATION_STATUS || (ALGORITHM_CALCULATION_STATUS = {}));
var CALCULATION_ERROR;
(function (CALCULATION_ERROR) {
    CALCULATION_ERROR[CALCULATION_ERROR["ALGORITHM_NOT_IMPLEMENTED"] = 0] = "ALGORITHM_NOT_IMPLEMENTED";
    CALCULATION_ERROR[CALCULATION_ERROR["CONTAINER_NOT_READY"] = 1] = "CONTAINER_NOT_READY";
})(CALCULATION_ERROR || (CALCULATION_ERROR = {}));


/***/ }),

/***/ 50391:
/*!******************************************************************************!*\
  !*** ./src/app/components/main/calculation/calculation-component.service.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CalculationComponentService": () => (/* binding */ CalculationComponentService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 45398);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 19193);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 64139);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 66587);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 59095);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 47418);
/* harmony import */ var src_app_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/globals */ 37503);
/* harmony import */ var src_app_solvers_all_in_one_row__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/solvers/all-in-one-row */ 11106);
/* harmony import */ var src_app_solvers_start_left_bottom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/solvers/start-left-bottom */ 48377);
/* harmony import */ var src_app_solvers_super_flo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/solvers/super-flo */ 64727);
/* harmony import */ var _calculation_component_classes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./calculation-component.classes */ 4908);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_services_data_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/data.service */ 52468);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 60124);










class CalculationComponentService {
    constructor(_dataService, _router) {
        this._dataService = _dataService;
        this._router = _router;
        this.algorithms = [];
        this._calculationCallback = {
            next: ([wrapper, solution]) => {
                wrapper.solution = solution;
                wrapper.status = _calculation_component_classes__WEBPACK_IMPORTED_MODULE_4__.ALGORITHM_CALCULATION_STATUS.CALCULATED;
            },
            error: (error) => {
                error.wrapper.status = _calculation_component_classes__WEBPACK_IMPORTED_MODULE_4__.ALGORITHM_CALCULATION_STATUS.ERROR;
                error.wrapper.errors.push(error.errorCode);
            },
            complete: () => {
            }
        };
        this._setUp();
    }
    calculateAlgorithm(wrapper) {
        wrapper.errors.splice(0, wrapper.errors.length);
        wrapper.status = _calculation_component_classes__WEBPACK_IMPORTED_MODULE_4__.ALGORITHM_CALCULATION_STATUS.PREPARE_CALCULATION;
        (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.timer)(1000).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)(_ => {
            switch (wrapper.algorithm.code) {
                case src_app_globals__WEBPACK_IMPORTED_MODULE_0__.ALGORITHMS.ALL_IN_ONE_ROW:
                    wrapper.status = _calculation_component_classes__WEBPACK_IMPORTED_MODULE_4__.ALGORITHM_CALCULATION_STATUS.CALCULATING;
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.combineLatest)([(0,rxjs__WEBPACK_IMPORTED_MODULE_9__.of)(wrapper), new src_app_solvers_all_in_one_row__WEBPACK_IMPORTED_MODULE_1__.AllInOneRowSolver(this._dataService, wrapper.solutionDescription).solve().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.catchError)((errorCode) => {
                            return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)({
                                wrapper: wrapper,
                                errorCode: errorCode
                            });
                        }))]);
                case src_app_globals__WEBPACK_IMPORTED_MODULE_0__.ALGORITHMS.START_LEFT_BOTTOM:
                    wrapper.status = _calculation_component_classes__WEBPACK_IMPORTED_MODULE_4__.ALGORITHM_CALCULATION_STATUS.CALCULATING;
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.combineLatest)([(0,rxjs__WEBPACK_IMPORTED_MODULE_9__.of)(wrapper), new src_app_solvers_start_left_bottom__WEBPACK_IMPORTED_MODULE_2__.StartLeftBottomSolver(this._dataService, wrapper.solutionDescription).solve().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.catchError)((errorCode) => {
                            return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)({
                                wrapper: wrapper,
                                errorCode: errorCode
                            });
                        }))]);
                case src_app_globals__WEBPACK_IMPORTED_MODULE_0__.ALGORITHMS.SUPER_FLO:
                    wrapper.status = _calculation_component_classes__WEBPACK_IMPORTED_MODULE_4__.ALGORITHM_CALCULATION_STATUS.CALCULATING;
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.combineLatest)([(0,rxjs__WEBPACK_IMPORTED_MODULE_9__.of)(wrapper), new src_app_solvers_super_flo__WEBPACK_IMPORTED_MODULE_3__.SuperFloSolver(this._dataService, wrapper.solutionDescription).solve().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.catchError)((errorCode) => {
                            return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)({
                                wrapper: wrapper,
                                errorCode: errorCode
                            });
                        }))]);
                default:
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throwError)({
                        wrapper: wrapper,
                        errorCode: _calculation_component_classes__WEBPACK_IMPORTED_MODULE_4__.CALCULATION_ERROR.ALGORITHM_NOT_IMPLEMENTED
                    });
            }
        })).subscribe(this._calculationCallback);
    }
    visualizeSolution(solution) {
        this._dataService.setCurrentSolution(solution);
        this._router.navigate(['/visualizer']);
    }
    _setUp() {
        for (let algorithm of src_app_globals__WEBPACK_IMPORTED_MODULE_0__.algorithms) {
            this.algorithms.push({
                'algorithm': algorithm,
                'errors': [],
                'status': _calculation_component_classes__WEBPACK_IMPORTED_MODULE_4__.ALGORITHM_CALCULATION_STATUS.UNCHECKED,
                'solutionDescription': algorithm.title,
                'solution': null,
                'available': algorithm.code === src_app_globals__WEBPACK_IMPORTED_MODULE_0__.ALGORITHMS.AI_SUPPORTED_SOLVER ? false : true
            });
        }
        this._dataService
            .solutions$
            .subscribe((solutions) => {
            for (let algorithm of this.algorithms) {
                algorithm.solution = null;
                algorithm.status = _calculation_component_classes__WEBPACK_IMPORTED_MODULE_4__.ALGORITHM_CALCULATION_STATUS.UNCHECKED;
            }
            for (let solution of solutions) {
                let wrapper = this.algorithms.find(x => x.algorithm.title === solution.algorithm);
                if (wrapper) {
                    wrapper.status = _calculation_component_classes__WEBPACK_IMPORTED_MODULE_4__.ALGORITHM_CALCULATION_STATUS.CALCULATED;
                    wrapper.solution = solution;
                }
            }
        });
    }
}
CalculationComponentService.ɵfac = function CalculationComponentService_Factory(t) { return new (t || CalculationComponentService)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](src_app_services_data_service__WEBPACK_IMPORTED_MODULE_5__.DataService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.Router)); };
CalculationComponentService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjectable"]({ token: CalculationComponentService, factory: CalculationComponentService.ɵfac });


/***/ }),

/***/ 83386:
/*!**********************************************************************!*\
  !*** ./src/app/components/main/calculation/calculation.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CalculationComponent": () => (/* binding */ CalculationComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 59151);
/* harmony import */ var src_app_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/animations */ 54000);
/* harmony import */ var _dialog_api_call_configurator_dialog_api_call_configurator_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dialog/api-call-configurator-dialog/api-call-configurator-dialog.component */ 6665);
/* harmony import */ var _dialog_no_solution_dialog_no_solution_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dialog/no-solution-dialog/no-solution-dialog.component */ 69735);
/* harmony import */ var _calculation_component_classes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./calculation-component.classes */ 4908);
/* harmony import */ var _calculation_component_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./calculation-component.service */ 50391);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/dialog */ 31484);
/* harmony import */ var src_lib_automation_services_configure_api_call_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/lib/automation/services/configure-api-call.service */ 31129);
/* harmony import */ var src_app_services_data_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/data.service */ 52468);
/* harmony import */ var _lib_automation_components_api_configuration_preview_api_configuration_preview_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../lib/automation/components/api-configuration-preview/api-configuration-preview.component */ 62701);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ 75074);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/input */ 68562);
/* harmony import */ var _pipes_pretty_length_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../pipes/pretty-length.pipe */ 1399);
/* harmony import */ var _pipes_calculation_error_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../pipes/calculation-error.pipe */ 14045);


















function CalculationComponent_div_13_span_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, " preparing ... ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}

function CalculationComponent_div_13_span_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, " calculating ... ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}

function CalculationComponent_div_13_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const wrapper_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" calculated ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](2, 1, wrapper_r1.solution.calculated, "dd.MM.yyyy HH:mm"), " ");
  }
}

function CalculationComponent_div_13_span_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, " error ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}

function CalculationComponent_div_13_span_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, " not calculated yet ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}

function CalculationComponent_div_13_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "prettyLength");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const wrapper_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" length: ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 1, wrapper_r1.solution.container.length), " ");
  }
}

function CalculationComponent_div_13_ng_container_22_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "calculationError");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const error_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 1, error_r13), " ");
  }
}

function CalculationComponent_div_13_ng_container_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, CalculationComponent_div_13_ng_container_22_div_1_Template, 3, 3, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const wrapper_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", wrapper_r1.errors);
  }
}

const _c0 = function (a0) {
  return {
    "disabled": a0
  };
};

function CalculationComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 9)(1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 5)(6, "mat-form-field", 10)(7, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](8, "solution description");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "input", 11, 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("keyup", function CalculationComponent_div_13_Template_input_keyup_9_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r16);
      const wrapper_r1 = restoredCtx.$implicit;

      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](10);

      return wrapper_r1.solutionDescription = _r2.value;
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](11, "div", 13)(12, "div", 14)(13, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](14, "state: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](15, 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](16, CalculationComponent_div_13_span_16_Template, 2, 0, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](17, CalculationComponent_div_13_span_17_Template, 2, 0, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](18, CalculationComponent_div_13_span_18_Template, 3, 4, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](19, CalculationComponent_div_13_span_19_Template, 2, 0, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](20, CalculationComponent_div_13_span_20_Template, 2, 0, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](21, CalculationComponent_div_13_div_21_Template, 3, 3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](22, CalculationComponent_div_13_ng_container_22_Template, 2, 1, "ng-container", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](23, "div", 6)(24, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function CalculationComponent_div_13_Template_div_click_24_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r16);
      const wrapper_r1 = restoredCtx.$implicit;
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return ctx_r17.calculationComponentService.calculateAlgorithm(wrapper_r1);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](25, " calculate ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](26, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function CalculationComponent_div_13_Template_div_click_26_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r16);
      const wrapper_r1 = restoredCtx.$implicit;
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return ctx_r18.calculationComponentService.visualizeSolution(wrapper_r1.solution);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](27, " visualize ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
  }

  if (rf & 2) {
    const wrapper_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("unavailable", !wrapper_r1.available);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", wrapper_r1.algorithm.title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", wrapper_r1.algorithm.description, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", wrapper_r1.solutionDescription);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngSwitch", wrapper_r1.status);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngSwitchCase", ctx_r0.ALGORITHM_CALCULATION_STATUS.PREPARE_CALCULATION);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngSwitchCase", ctx_r0.ALGORITHM_CALCULATION_STATUS.CALCULATING);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngSwitchCase", ctx_r0.ALGORITHM_CALCULATION_STATUS.CALCULATED);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngSwitchCase", ctx_r0.ALGORITHM_CALCULATION_STATUS.ERROR);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", wrapper_r1.status === ctx_r0.ALGORITHM_CALCULATION_STATUS.CALCULATED);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", wrapper_r1.status === ctx_r0.ALGORITHM_CALCULATION_STATUS.ERROR);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](13, _c0, wrapper_r1.status !== ctx_r0.ALGORITHM_CALCULATION_STATUS.CALCULATED));
  }
}

class CalculationComponent {
  constructor(calculationComponentService, _matDialog, configureApiCallService, _dataService, _dialog, _viewContainerRef) {
    this.calculationComponentService = calculationComponentService;
    this._matDialog = _matDialog;
    this.configureApiCallService = configureApiCallService;
    this._dataService = _dataService;
    this._dialog = _dialog;
    this._viewContainerRef = _viewContainerRef;
    this.ALGORITHM_CALCULATION_STATUS = _calculation_component_classes__WEBPACK_IMPORTED_MODULE_3__.ALGORITHM_CALCULATION_STATUS;
    this._subscriptions = [];
  }

  configureAPICall() {
    this._matDialog.open(_dialog_api_call_configurator_dialog_api_call_configurator_dialog_component__WEBPACK_IMPORTED_MODULE_1__.ApiCallConfiguratorDialogComponent, {
      panelClass: 'no-padding-dialog'
    });
  }

  ngOnDestroy() {
    for (let sub of this._subscriptions) sub.unsubscribe();

    this._subscriptions = [];
  }

  ngOnInit() {
    this._subscriptions.push(...[this._dataService.orders$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.filter)(orders => orders.length === 0 ? true : false)).subscribe(() => this.showNoSolutionDialog())]);
  }

  showNoSolutionDialog() {
    this._dialog.open(_dialog_no_solution_dialog_no_solution_dialog_component__WEBPACK_IMPORTED_MODULE_2__.NoSolutionDialogComponent, {
      panelClass: 'no-padding-dialog',
      disableClose: true,
      viewContainerRef: this._viewContainerRef
    });
  }

}

CalculationComponent.ɵfac = function CalculationComponent_Factory(t) {
  return new (t || CalculationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_calculation_component_service__WEBPACK_IMPORTED_MODULE_4__.CalculationComponentService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_lib_automation_services_configure_api_call_service__WEBPACK_IMPORTED_MODULE_5__.ConfigureApiCallService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_services_data_service__WEBPACK_IMPORTED_MODULE_6__.DataService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewContainerRef));
};

CalculationComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: CalculationComponent,
  selectors: [["app-calculation"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵProvidersFeature"]([_calculation_component_service__WEBPACK_IMPORTED_MODULE_4__.CalculationComponentService])],
  decls: 14,
  vars: 7,
  consts: [[1, "body"], [1, "content"], [1, "algorithm-overview", 3, "click"], [1, "headline"], [1, "description"], [1, "algorithm-content"], [1, "footer-button-wrapper"], [1, "control", "primary", 3, "ngClass"], ["class", "algorithm-overview", 3, "unavailable", 4, "ngFor", "ngForOf"], [1, "algorithm-overview"], [1, "width"], ["type", "text", "matInput", "", 3, "value", "keyup"], ["input", ""], [1, "progress-status"], [1, "progress-status-label"], [1, "status"], [3, "ngSwitch"], [4, "ngSwitchCase"], [4, "ngSwitchDefault"], [4, "ngIf"], [1, "control", "primary", 3, "click"], [1, "control", "accent-2", 3, "ngClass", "click"], ["class", "calculation-error", 4, "ngFor", "ngForOf"], [1, "calculation-error"]],
  template: function CalculationComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function CalculationComponent_Template_div_click_2_listener() {
        return ctx.configureAPICall();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, " connect own service ");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6, " Configure a custom data flow and import data using interfaces such as data uploads or API calls. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](7, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](8, "app-api-configuration-preview");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "div", 6)(10, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](11, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](12, " send data ");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](13, CalculationComponent_div_13_Template, 28, 15, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    }

    if (rf & 2) {
      let tmp_0_0;
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("@show", undefined);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](5, _c0, (tmp_0_0 = (tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](11, 3, ctx.configureApiCallService.configurationValid$)) == null ? null : tmp_0_0.invalid) !== null && tmp_0_0 !== undefined ? tmp_0_0 : true));
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx.calculationComponentService.algorithms);
    }
  },
  directives: [_lib_automation_components_api_configuration_preview_api_configuration_preview_component__WEBPACK_IMPORTED_MODULE_7__.ApiConfigurationPreviewComponent, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_15__.MatInput, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgSwitch, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgSwitchCase, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgSwitchDefault, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_13__.DatePipe, _pipes_pretty_length_pipe__WEBPACK_IMPORTED_MODULE_8__.PrettyLengthPipe, _pipes_calculation_error_pipe__WEBPACK_IMPORTED_MODULE_9__.CalculationErrorPipe],
  styles: [".body[_ngcontent-%COMP%] {\n    overflow-y: auto;\n    height: -webkit-fill-available;\n}\n\n.content[_ngcontent-%COMP%] {\n    margin: 1rem;\n    display: grid;\n    grid-template-columns: 1fr;\n    grid-column-gap: .5rem;\n    grid-row-gap: .5rem;\n}\n\n.algorithm-overview[_ngcontent-%COMP%] {\n    background-color: white;\n    height: 100%;\n    border-radius: 4px;\n    overflow: hidden;\n    display: flex;\n    flex-direction: column;\n    min-height: 300px;\n    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);\n}\n\n.algorithm-overview.unavailable[_ngcontent-%COMP%] {\n    opacity: .6;\n    pointer-events: none;\n}\n\n.algorithm-overview[_ngcontent-%COMP%]   .headline[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n    padding: 2rem 2rem 0.5rem 2rem;\n    background-color: #ffffff;\n    color: #363636;\n}\n\n.algorithm-overview[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%] {\n    padding: 0px 2rem 1rem 2rem;\n    color: #444444;\n    font-weight: 100;\n}\n\n.algorithm-content[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    padding: 0px 2rem;\n    margin-bottom: 2rem;\n    height: 100%;\n}\n\n.footer-button-wrapper[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    flex-wrap: wrap;\n}\n\n.footer-button-wrapper[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n    margin-right: .2rem;\n}\n\n.progress-status[_ngcontent-%COMP%] {\n    flex: 1;\n    padding: 1rem;\n    align-items: center;\n    justify-content: center;\n    display: flex;\n    flex-direction: column;\n}\n\n.calculation-error[_ngcontent-%COMP%] {\n    margin-top: 0.2rem;\n    background-color: #ffd2d2;\n    color: #b01010;\n    padding: 0.4rem 0.5rem;\n    width: 100%;\n    border-radius: 2px;\n}\n\n.width[_ngcontent-%COMP%] {\n    width: 100%;\n}\n\n@media screen and (min-width: 900px) {\n    .content[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr 1fr;\n    }\n}\n\n@media screen and (min-width: 1200px) {\n    .content[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr 1fr 1fr;\n    }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGN1bGF0aW9uLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxnQkFBZ0I7SUFDaEIsOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksWUFBWTtJQUNaLGFBQWE7SUFDYiwwQkFBMEI7SUFDMUIsc0JBQXNCO0lBQ3RCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2QixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGlCQUFpQjtJQUNqQixpSEFBaUg7QUFDckg7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsb0JBQW9CO0FBQ3hCOztBQUVBO0lBQ0ksaUJBQWlCO0lBQ2pCLDhCQUE4QjtJQUM5Qix5QkFBeUI7SUFDekIsY0FBYztBQUNsQjs7QUFFQTtJQUNJLDJCQUEyQjtJQUMzQixjQUFjO0lBQ2QsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixpQkFBaUI7SUFDakIsbUJBQW1CO0lBQ25CLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxPQUFPO0lBQ1AsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIsYUFBYTtJQUNiLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsY0FBYztJQUNkLHNCQUFzQjtJQUN0QixXQUFXO0lBQ1gsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksV0FBVztBQUNmOztBQUVBO0lBQ0k7UUFDSSw4QkFBOEI7SUFDbEM7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksa0NBQWtDO0lBQ3RDO0FBQ0oiLCJmaWxlIjoiY2FsY3VsYXRpb24uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ib2R5IHtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIGhlaWdodDogLXdlYmtpdC1maWxsLWF2YWlsYWJsZTtcbn1cblxuLmNvbnRlbnQge1xuICAgIG1hcmdpbjogMXJlbTtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICAgIGdyaWQtY29sdW1uLWdhcDogLjVyZW07XG4gICAgZ3JpZC1yb3ctZ2FwOiAuNXJlbTtcbn1cblxuLmFsZ29yaXRobS1vdmVydmlldyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBtaW4taGVpZ2h0OiAzMDBweDtcbiAgICBib3gtc2hhZG93OiAwcHggM3B4IDFweCAtMnB4IHJnYigwIDAgMCAvIDIwJSksIDBweCAycHggMnB4IDBweCByZ2IoMCAwIDAgLyAxNCUpLCAwcHggMXB4IDVweCAwcHggcmdiKDAgMCAwIC8gMTIlKTtcbn1cblxuLmFsZ29yaXRobS1vdmVydmlldy51bmF2YWlsYWJsZSB7XG4gICAgb3BhY2l0eTogLjY7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cbi5hbGdvcml0aG0tb3ZlcnZpZXcgLmhlYWRsaW5lIHtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICBwYWRkaW5nOiAycmVtIDJyZW0gMC41cmVtIDJyZW07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgICBjb2xvcjogIzM2MzYzNjtcbn1cblxuLmFsZ29yaXRobS1vdmVydmlldyAuZGVzY3JpcHRpb24ge1xuICAgIHBhZGRpbmc6IDBweCAycmVtIDFyZW0gMnJlbTtcbiAgICBjb2xvcjogIzQ0NDQ0NDtcbiAgICBmb250LXdlaWdodDogMTAwO1xufVxuXG4uYWxnb3JpdGhtLWNvbnRlbnQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBwYWRkaW5nOiAwcHggMnJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xuICAgIGhlaWdodDogMTAwJTtcbn1cblxuLmZvb3Rlci1idXR0b24td3JhcHBlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLmZvb3Rlci1idXR0b24td3JhcHBlciA+ICoge1xuICAgIG1hcmdpbi1yaWdodDogLjJyZW07XG59XG5cbi5wcm9ncmVzcy1zdGF0dXMge1xuICAgIGZsZXg6IDE7XG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmNhbGN1bGF0aW9uLWVycm9yIHtcbiAgICBtYXJnaW4tdG9wOiAwLjJyZW07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZDJkMjtcbiAgICBjb2xvcjogI2IwMTAxMDtcbiAgICBwYWRkaW5nOiAwLjRyZW0gMC41cmVtO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbn1cblxuLndpZHRoIHtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogOTAwcHgpIHtcbiAgICAuY29udGVudCB7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcbiAgICB9XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEyMDBweCkge1xuICAgIC5jb250ZW50IHtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcbiAgICB9XG59Il19 */"],
  data: {
    animation: [src_app_animations__WEBPACK_IMPORTED_MODULE_0__.showAnimation]
  }
});

/***/ }),

/***/ 12624:
/*!********************************************************************!*\
  !*** ./src/app/components/main/orders/orders-component.service.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OrdersComponentService": () => (/* binding */ OrdersComponentService)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 53298);
/* harmony import */ var src_app_classes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/classes */ 65444);
/* harmony import */ var src_app_globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/globals */ 37503);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_services_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/data.service */ 52468);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/snack-bar */ 10930);








class OrdersComponentService {
    constructor(_formBuilder, _dataService, _snackBar) {
        this._formBuilder = _formBuilder;
        this._dataService = _dataService;
        this._snackBar = _snackBar;
        this._subscriptions = [];
        this._setUp();
    }
    addOrder() {
        let order = new src_app_classes__WEBPACK_IMPORTED_MODULE_0__.Order();
        order.orderId = Math.max(...this.ordersControl.value.map(x => x.orderId), 0) + 1;
        order.quantity = 1;
        this.ordersControl.push(this._formBuilder.group(order));
        this.ordersControl.markAsDirty();
    }
    dispose() {
        for (let sub of this._subscriptions)
            sub.unsubscribe();
        this._subscriptions = [];
    }
    normalizeOrderIds() {
        let index = 1;
        let controls = this.ordersControl.controls;
        controls.sort((a, b) => (0,src_app_globals__WEBPACK_IMPORTED_MODULE_1__.compare)(a.value.orderId, b.value.orderId, true)).forEach(control => {
            control.controls[(0,src_app_globals__WEBPACK_IMPORTED_MODULE_1__.nameOf)('orderId')].setValue(index);
            index++;
        });
    }
    removeOrder(control) {
        let index = this.ordersControl.controls.findIndex(x => x === control);
        if (index > -1) {
            this.ordersControl.removeAt(index);
            this.ordersControl.markAsDirty();
            this.normalizeOrderIds();
        }
    }
    takeOrders() {
        let orders = this.ordersControl.value;
        this._dataService.setOrders(orders);
        this.ordersControl.markAsPristine();
        this._snackBar.open(`Die ${orders.length} Bestellungen wurden zwischengespeichert.`, 'Ok', { duration: 2000 });
    }
    _setUp() {
        this.formGroup = this._formBuilder.group({
            orders: this._formBuilder.array([]),
            containerHeight: null,
            containerWidth: null,
            unit: 'mm'
        });
        this._subscriptions.push(...[
            this._dataService.containerHeight$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.distinctUntilChanged)()).subscribe((height) => this.formGroup.controls['containerHeight'].setValue(height)),
            this._dataService.containerWidth$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.distinctUntilChanged)()).subscribe((width) => this.formGroup.controls['containerWidth'].setValue(width)),
            this._dataService.unit$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.distinctUntilChanged)()).subscribe((unit) => this.formGroup.controls['unit'].setValue(unit)),
            this.formGroup.controls['containerHeight'].valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.distinctUntilChanged)()).subscribe((value) => this._dataService.setContainerHeight(value)),
            this.formGroup.controls['containerWidth'].valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.distinctUntilChanged)()).subscribe((value) => this._dataService.setContainerWidth(value)),
            this.formGroup.controls['unit'].valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.distinctUntilChanged)()).subscribe((value) => this._dataService.setUnit(value)),
            this._dataService.orders$.subscribe((orders) => {
                this.ordersControl.clear();
                for (let order of orders) {
                    let group = this._formBuilder.group(order);
                    [(0,src_app_globals__WEBPACK_IMPORTED_MODULE_1__.nameOf)('height'), (0,src_app_globals__WEBPACK_IMPORTED_MODULE_1__.nameOf)('length'), (0,src_app_globals__WEBPACK_IMPORTED_MODULE_1__.nameOf)('width')].forEach(x => group.controls[x].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required));
                    this.ordersControl.push(group);
                }
            })
        ]);
    }
    get ordersControl() {
        return this.formGroup.controls['orders'];
    }
}
OrdersComponentService.ɵfac = function OrdersComponentService_Factory(t) { return new (t || OrdersComponentService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](src_app_services_data_service__WEBPACK_IMPORTED_MODULE_2__.DataService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_6__.MatSnackBar)); };
OrdersComponentService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: OrdersComponentService, factory: OrdersComponentService.ɵfac });


/***/ }),

/***/ 20056:
/*!************************************************************!*\
  !*** ./src/app/components/main/orders/orders.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OrdersComponent": () => (/* binding */ OrdersComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 86942);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 59151);
/* harmony import */ var src_app_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/animations */ 54000);
/* harmony import */ var _orders_component_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./orders-component.service */ 12624);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_services_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/data.service */ 52468);
/* harmony import */ var src_app_services_csv_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/csv.service */ 49697);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ 57822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ 68562);
/* harmony import */ var _select_select_unit_select_unit_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../select/select-unit/select-unit.component */ 811);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/table */ 85288);
/* harmony import */ var _select_select_group_select_group_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../select/select-group/select-group.component */ 4214);
/* harmony import */ var _select_select_product_select_product_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../select/select-product/select-product.component */ 61065);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/checkbox */ 44792);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/button */ 84522);
/* harmony import */ var _pipes_sorted_form_array_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../pipes/sorted-form-array.pipe */ 1662);


















function OrdersComponent_th_46_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "th", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Ord.-No.");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
function OrdersComponent_td_47_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "td", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "input", 40, 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r36 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", element_r36.value);
} }
function OrdersComponent_td_48_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "td", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r4.ordersControl.value.length, " orders ");
} }
function OrdersComponent_th_50_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "th", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "group / target");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
function OrdersComponent_td_51_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "td", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "app-select-group", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r38 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", element_r38.value);
} }
function OrdersComponent_td_52_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "td", 41);
} }
function OrdersComponent_th_54_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "th", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "name");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
function OrdersComponent_td_55_Template(rf, ctx) { if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "td", 43)(1, "app-select-product", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function OrdersComponent_td_55_Template_app_select_product_ngModelChange_1_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r41); const element_r39 = restoredCtx.$implicit; const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r40.setOrderProduct($event, element_r39.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const element_r39 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", element_r39.value.controls["description"].value);
} }
function OrdersComponent_td_56_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "td", 41);
} }
function OrdersComponent_th_58_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "th", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "count");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
function OrdersComponent_td_59_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "td", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "input", 45, 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r42 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", element_r42.value);
} }
function OrdersComponent_td_60_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "td", 41);
} }
function OrdersComponent_th_62_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "th", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "length");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
function OrdersComponent_td_63_Template(rf, ctx) { if (rf & 1) {
    const _r47 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "td", 43)(1, "input", 46, 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function OrdersComponent_td_63_Template_input_ngModelChange_1_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r47); const element_r44 = restoredCtx.$implicit; const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r46.updateProductDimension($event, element_r44.value.controls["description"].value, "length"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const element_r44 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !element_r44.value.controls["description"].value)("ngModel", element_r44.value.controls["length"].value);
} }
function OrdersComponent_td_64_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "td", 41);
} }
function OrdersComponent_th_66_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "th", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "width");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
function OrdersComponent_td_67_Template(rf, ctx) { if (rf & 1) {
    const _r51 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "td", 43)(1, "input", 46, 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function OrdersComponent_td_67_Template_input_ngModelChange_1_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r51); const element_r48 = restoredCtx.$implicit; const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r50.updateProductDimension($event, element_r48.value.controls["description"].value, "width"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const element_r48 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !element_r48.value.controls["description"].value)("ngModel", element_r48.value.controls["width"].value);
} }
function OrdersComponent_td_68_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "td", 41);
} }
function OrdersComponent_th_70_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "th", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "height");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
function OrdersComponent_td_71_Template(rf, ctx) { if (rf & 1) {
    const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "td", 43)(1, "input", 46, 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function OrdersComponent_td_71_Template_input_ngModelChange_1_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r55); const element_r52 = restoredCtx.$implicit; const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r54.updateProductDimension($event, element_r52.value.controls["description"].value, "height"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const element_r52 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !element_r52.value.controls["description"].value)("ngModel", element_r52.value.controls["height"].value);
} }
function OrdersComponent_td_72_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "td", 41);
} }
function OrdersComponent_th_74_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "th", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "turnable");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
function OrdersComponent_td_75_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "td", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "mat-checkbox", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r56 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", element_r56.value);
} }
function OrdersComponent_td_76_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "td", 41);
} }
function OrdersComponent_th_78_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "th", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "stackable");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
function OrdersComponent_td_79_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "td", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "mat-checkbox", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r57 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", element_r57.value);
} }
function OrdersComponent_td_80_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "td", 41);
} }
function OrdersComponent_th_82_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "th", 38);
} }
function OrdersComponent_td_83_Template(rf, ctx) { if (rf & 1) {
    const _r60 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "td", 43)(1, "button", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function OrdersComponent_td_83_Template_button_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r60); const element_r58 = restoredCtx.$implicit; const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r59.ordersComponentService.removeOrder(element_r58.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "delete_forever");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
} }
function OrdersComponent_td_84_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "td", 41);
} }
function OrdersComponent_tr_85_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "tr", 50);
} }
function OrdersComponent_tr_86_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "tr", 51);
} }
function OrdersComponent_tr_87_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "tr", 52);
} }
const _c0 = function (a0) { return { "disabled": a0 }; };
class OrdersComponent {
    constructor(dataService, csvService, ordersComponentService) {
        this.dataService = dataService;
        this.csvService = csvService;
        this.ordersComponentService = ordersComponentService;
        this.columns = ['order', 'quantity', 'group', 'description', 'length', 'width', 'height', 'turningAllowed', 'stackingAllowed', 'controls'];
        this.active = 'order';
        this.direction = 'asc';
        this._subscriptions = [];
    }
    ngOnDestroy() {
        if (this.ordersComponentService.formGroup.dirty)
            this.ordersComponentService.takeOrders();
        for (let sub of this._subscriptions)
            sub.unsubscribe();
        this._subscriptions = [];
        this.ordersComponentService.dispose();
    }
    ngOnInit() {
    }
    orderCollectionToCSV() {
        this.ordersComponentService.takeOrders();
        this.csvService.downloadOrderCollectionToCSV();
    }
    setOrderProduct(product, formGroup) {
        if (typeof product !== 'string')
            return;
        this.dataService.products$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)((products) => products.find(x => x.description === product)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.filter)(x => x ? true : false))
            .subscribe((product) => {
            formGroup.controls['description'].setValue(product.description);
            formGroup.controls['height'].setValue(product.height);
            formGroup.controls['width'].setValue(product.width);
            formGroup.controls['length'].setValue(product.length);
        });
    }
    updateProductDimension(value, product, dimension) {
        if (typeof product !== 'string' || typeof value !== 'number')
            return;
        this.dataService.products$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(x => x.find(y => y.description === product)))
            .subscribe((product) => {
            product[dimension] = value;
            this.ordersControl.controls.filter(x => x.value.description === product.description).forEach((x) => {
                x.controls[dimension].setValue(value);
            });
        });
    }
    get ordersControl() {
        return this.ordersComponentService.formGroup.controls['orders'];
    }
}
OrdersComponent.ɵfac = function OrdersComponent_Factory(t) { return new (t || OrdersComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_services_data_service__WEBPACK_IMPORTED_MODULE_2__.DataService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_services_csv_service__WEBPACK_IMPORTED_MODULE_3__.CsvService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_orders_component_service__WEBPACK_IMPORTED_MODULE_1__.OrdersComponentService)); };
OrdersComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: OrdersComponent, selectors: [["app-orders"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵProvidersFeature"]([_orders_component_service__WEBPACK_IMPORTED_MODULE_1__.OrdersComponentService])], decls: 90, vars: 16, consts: [[1, "body", "main-component-body"], [1, "headline", "main-component-headline"], [1, "control-row"], [1, "option", 3, "click"], [1, "icon"], [1, "text"], [1, "option"], [3, "formGroup"], [1, "container-wrapper"], [1, "container-wrapper-headline"], [1, "input-wrapper"], ["autocomplete", "off", "formControlName", "containerHeight", "placeholder", "H\u00F6he", "matInput", "", "type", "number"], ["ref", ""], ["autocomplete", "off", "formControlName", "containerWidth", "placeholder", "Breite", "matInput", "", "type", "number"], ["formControlName", "unit"], [1, "spacer"], [1, "control", "primary", 3, "ngClass", "click"], [1, "content"], ["mat-table", "", 1, "smgr-table", "unsparing", "striped", 3, "dataSource"], ["matColumnDef", "order"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 3, "formGroup", 4, "matCellDef"], ["mat-footer-cell", "", "class", "footer-cell", 4, "matFooterCellDef"], ["matColumnDef", "group"], ["matColumnDef", "description"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "quantity"], ["matColumnDef", "length"], ["matColumnDef", "width"], ["matColumnDef", "height"], ["matColumnDef", "turningAllowed"], ["matColumnDef", "stackingAllowed"], ["matColumnDef", "controls"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", "class", "smgr-table-body-row", 4, "matRowDef", "matRowDefColumns"], ["mat-footer-row", "", 4, "matFooterRowDef", "matFooterRowDefSticky"], ["type", "file", "accept", "text/csv", 1, "file-upload", 2, "display", "none", 3, "input"], ["input", ""], ["mat-header-cell", ""], ["mat-cell", "", 3, "formGroup"], ["autocomplete", "off", "formControlName", "orderId", "matInput", "", "type", "number"], ["mat-footer-cell", "", 1, "footer-cell"], ["formControlName", "group"], ["mat-cell", ""], [3, "ngModel", "ngModelChange"], ["autocomplete", "off", "formControlName", "quantity", "matInput", "", "type", "number"], ["autocomplete", "off", "matInput", "", "type", "number", 3, "disabled", "ngModel", "ngModelChange"], ["formControlName", "turningAllowed"], ["formControlName", "stackingAllowed"], ["color", "warn", "mat-icon-button", "", 3, "click"], ["mat-header-row", ""], ["mat-row", "", 1, "smgr-table-body-row"], ["mat-footer-row", ""]], template: function OrdersComponent_Template(rf, ctx) { if (rf & 1) {
        const _r63 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, " Orders ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 2)(4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function OrdersComponent_Template_div_click_4_listener() { return ctx.ordersComponentService.addOrder(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6, "add");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8, " create ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "div", 6)(10, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](11, "adb");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](13, " assist ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function OrdersComponent_Template_div_click_14_listener() { return ctx.ordersComponentService.normalizeOrderIds(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](15, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](16, "format_list_numbered");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](18, " norm ID ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function OrdersComponent_Template_div_click_19_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r63); const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](89); return _r35.click(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](21, "upload");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](22, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](23, " import ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](24, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function OrdersComponent_Template_div_click_24_listener() { return ctx.orderCollectionToCSV(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](25, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](26, "download");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](27, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](28, " export ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](29, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](30, "div", 8)(31, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](32, " container ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](33, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](34, "input", 11, 12)(36, "input", 13, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](38, "app-select-unit", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](39, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](40, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function OrdersComponent_Template_div_click_40_listener() { return ctx.ordersComponentService.takeOrders(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](41, " confirm ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](42, "div", 17)(43, "table", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](44, "sortedFormArray");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](45, 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](46, OrdersComponent_th_46_Template, 2, 0, "th", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](47, OrdersComponent_td_47_Template, 3, 1, "td", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](48, OrdersComponent_td_48_Template, 2, 1, "td", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](49, 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](50, OrdersComponent_th_50_Template, 2, 0, "th", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](51, OrdersComponent_td_51_Template, 2, 1, "td", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](52, OrdersComponent_td_52_Template, 1, 0, "td", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](53, 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](54, OrdersComponent_th_54_Template, 2, 0, "th", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](55, OrdersComponent_td_55_Template, 2, 1, "td", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](56, OrdersComponent_td_56_Template, 1, 0, "td", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](57, 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](58, OrdersComponent_th_58_Template, 2, 0, "th", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](59, OrdersComponent_td_59_Template, 3, 1, "td", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](60, OrdersComponent_td_60_Template, 1, 0, "td", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](61, 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](62, OrdersComponent_th_62_Template, 2, 0, "th", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](63, OrdersComponent_td_63_Template, 3, 2, "td", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](64, OrdersComponent_td_64_Template, 1, 0, "td", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](65, 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](66, OrdersComponent_th_66_Template, 2, 0, "th", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](67, OrdersComponent_td_67_Template, 3, 2, "td", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](68, OrdersComponent_td_68_Template, 1, 0, "td", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](69, 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](70, OrdersComponent_th_70_Template, 2, 0, "th", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](71, OrdersComponent_td_71_Template, 3, 2, "td", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](72, OrdersComponent_td_72_Template, 1, 0, "td", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](73, 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](74, OrdersComponent_th_74_Template, 2, 0, "th", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](75, OrdersComponent_td_75_Template, 2, 1, "td", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](76, OrdersComponent_td_76_Template, 1, 0, "td", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](77, 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](78, OrdersComponent_th_78_Template, 2, 0, "th", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](79, OrdersComponent_td_79_Template, 2, 1, "td", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](80, OrdersComponent_td_80_Template, 1, 0, "td", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](81, 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](82, OrdersComponent_th_82_Template, 1, 0, "th", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](83, OrdersComponent_td_83_Template, 4, 0, "td", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](84, OrdersComponent_td_84_Template, 1, 0, "td", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](85, OrdersComponent_tr_85_Template, 1, 0, "tr", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](86, OrdersComponent_tr_86_Template, 1, 0, "tr", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](87, OrdersComponent_tr_87_Template, 1, 0, "tr", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](88, "input", 36, 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("input", function OrdersComponent_Template_input_input_88_listener($event) { return ctx.csvService.uploadCSVToOrderCollection($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("@show", undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](29);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", ctx.ordersComponentService.formGroup);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](14, _c0, ctx.ordersComponentService.formGroup.pristine));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("dataSource", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind4"](44, 9, ctx.ordersControl.controls, ctx.active, ctx.direction, ctx.ordersControl.value.length));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](42);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("matHeaderRowDef", ctx.columns)("matHeaderRowDefSticky", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("matRowDefColumns", ctx.columns);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("matFooterRowDef", ctx.columns)("matFooterRowDefSticky", true);
    } }, directives: [_angular_material_icon__WEBPACK_IMPORTED_MODULE_11__.MatIcon, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.DefaultValueAccessor, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormControlName, _select_select_unit_select_unit_component__WEBPACK_IMPORTED_MODULE_4__.SelectUnitComponent, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgClass, _angular_material_table__WEBPACK_IMPORTED_MODULE_15__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_15__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_15__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_15__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_15__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_15__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_15__.MatFooterCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_15__.MatFooterCell, _select_select_group_select_group_component__WEBPACK_IMPORTED_MODULE_5__.SelectGroupComponent, _select_select_product_select_product_component__WEBPACK_IMPORTED_MODULE_6__.SelectProductComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgModel, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_16__.MatCheckbox, _angular_material_button__WEBPACK_IMPORTED_MODULE_17__.MatButton, _angular_material_table__WEBPACK_IMPORTED_MODULE_15__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_15__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_15__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_15__.MatRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_15__.MatFooterRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_15__.MatFooterRow], pipes: [_pipes_sorted_form_array_pipe__WEBPACK_IMPORTED_MODULE_7__.SortedFormArrayPipe], styles: [".body[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    background-color: white;\n}\n\n.headline[_ngcontent-%COMP%] {\n    padding: 2rem;\n    background-color: #ffffff;\n    color: #464646;\n}\n\n.control-row[_ngcontent-%COMP%] {\n    display: flex;\n    padding: 0px 2rem;\n    background-color: white;\n    align-items: flex-start;\n}\n\n.control-row[_ngcontent-%COMP%]    > .option[_ngcontent-%COMP%] {\n    width: 60px;\n    height: 60px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    -webkit-user-select: none;\n            user-select: none;\n    border-radius: 3px;\n    margin-bottom: .3rem;\n}\n\n.control-row[_ngcontent-%COMP%]    > .option.disabled[_ngcontent-%COMP%] {\n    opacity: .5;\n    cursor: not-allowed;\n}\n\n.control-row[_ngcontent-%COMP%]    > .option.enabled[_ngcontent-%COMP%] {\n    background-color: #dcffdd;\n    color: white !important;\n    box-shadow: 0 0 4px #848484;\n}\n\n.control-row[_ngcontent-%COMP%]    > .option[_ngcontent-%COMP%]:hover {\n    background-color: #f1f1f1;\n}\n\n.control-row[_ngcontent-%COMP%]    > .option[_ngcontent-%COMP%]    > .icon[_ngcontent-%COMP%] {\n    color: #3a3a3a;\n}\n\n.control-row[_ngcontent-%COMP%]    > .option[_ngcontent-%COMP%]    > .text[_ngcontent-%COMP%] {\n    font-size: .6rem;\n    color: #464646;\n    font-weight: 500;\n}\n\n.content[_ngcontent-%COMP%] {\n    flex: 1;\n    display: flex;\n    overflow-y: auto;\n    margin-right: 0.5rem;\n    padding-right: 0.5rem;\n}\n\n.container-wrapper[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    padding: 0.2rem 0.4rem;\n    margin-bottom: 1rem;\n}\n\n.container-wrapper[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%] {\n    display: flex;\n}\n\n.container-wrapper[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    width: 5rem;\n    margin-right: .2rem;\n    padding: .2rem;\n    flex: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVycy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0Qix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxhQUFhO0lBQ2IseUJBQXlCO0lBQ3pCLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsaUJBQWlCO0lBQ2pCLHVCQUF1QjtJQUN2Qix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLHVCQUF1QjtJQUN2QixlQUFlO0lBQ2YseUJBQWlCO1lBQWpCLGlCQUFpQjtJQUNqQixrQkFBa0I7SUFDbEIsb0JBQW9CO0FBQ3hCOztBQUVBO0lBQ0ksV0FBVztJQUNYLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLHlCQUF5QjtJQUN6Qix1QkFBdUI7SUFDdkIsMkJBQTJCO0FBQy9COztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksT0FBTztJQUNQLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsb0JBQW9CO0lBQ3BCLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsc0JBQXNCO0lBQ3RCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLGNBQWM7SUFDZCxPQUFPO0FBQ1giLCJmaWxlIjoib3JkZXJzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYm9keSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuXG4uaGVhZGxpbmUge1xuICAgIHBhZGRpbmc6IDJyZW07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgICBjb2xvcjogIzQ2NDY0Njtcbn1cblxuLmNvbnRyb2wtcm93IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHBhZGRpbmc6IDBweCAycmVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xufVxuXG4uY29udHJvbC1yb3cgPiAub3B0aW9uIHtcbiAgICB3aWR0aDogNjBweDtcbiAgICBoZWlnaHQ6IDYwcHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICBtYXJnaW4tYm90dG9tOiAuM3JlbTtcbn1cblxuLmNvbnRyb2wtcm93ID4gLm9wdGlvbi5kaXNhYmxlZCB7XG4gICAgb3BhY2l0eTogLjU7XG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLmNvbnRyb2wtcm93ID4gLm9wdGlvbi5lbmFibGVkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGNmZmRkO1xuICAgIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xuICAgIGJveC1zaGFkb3c6IDAgMCA0cHggIzg0ODQ4NDtcbn1cblxuLmNvbnRyb2wtcm93ID4gLm9wdGlvbjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YxZjFmMTtcbn1cblxuLmNvbnRyb2wtcm93ID4gLm9wdGlvbiA+IC5pY29uIHtcbiAgICBjb2xvcjogIzNhM2EzYTtcbn1cblxuLmNvbnRyb2wtcm93ID4gLm9wdGlvbiA+IC50ZXh0IHtcbiAgICBmb250LXNpemU6IC42cmVtO1xuICAgIGNvbG9yOiAjNDY0NjQ2O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5jb250ZW50IHtcbiAgICBmbGV4OiAxO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcbiAgICBwYWRkaW5nLXJpZ2h0OiAwLjVyZW07XG59XG5cbi5jb250YWluZXItd3JhcHBlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHBhZGRpbmc6IDAuMnJlbSAwLjRyZW07XG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuLmNvbnRhaW5lci13cmFwcGVyIC5pbnB1dC13cmFwcGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xufVxuXG4uY29udGFpbmVyLXdyYXBwZXIgLmlucHV0LXdyYXBwZXIgaW5wdXQge1xuICAgIHdpZHRoOiA1cmVtO1xuICAgIG1hcmdpbi1yaWdodDogLjJyZW07XG4gICAgcGFkZGluZzogLjJyZW07XG4gICAgZmxleDogMTtcbn1cbiJdfQ== */"], data: { animation: [src_app_animations__WEBPACK_IMPORTED_MODULE_0__.showAnimation] } });


/***/ }),

/***/ 7078:
/*!****************************************************************************!*\
  !*** ./src/app/components/main/visualizer/visualizer-component-service.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VisualizerComponentService": () => (/* binding */ VisualizerComponentService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 61555);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 84505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 19193);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 92218);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 80823);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 86942);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 83910);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 59151);
/* harmony import */ var src_app_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/globals */ 37503);
/* harmony import */ var src_app_services_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/data.service */ 52468);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ 92973);
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ 41100);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 22560);








class VisualizerComponentService {
    constructor(_dataService) {
        this._dataService = _dataService;
        this.scene = new three__WEBPACK_IMPORTED_MODULE_3__.Scene();
        this.renderer = new three__WEBPACK_IMPORTED_MODULE_3__.WebGLRenderer({ antialias: true });
        this.camera = null;
        this.controls = null;
        this.gridHelper = null;
        this.ray = new three__WEBPACK_IMPORTED_MODULE_3__.Raycaster();
        this._container = new rxjs__WEBPACK_IMPORTED_MODULE_4__.ReplaySubject(1);
        this._visualizerWrapper = new rxjs__WEBPACK_IMPORTED_MODULE_4__.ReplaySubject(1);
        this._hoverIntersections = new rxjs__WEBPACK_IMPORTED_MODULE_4__.ReplaySubject(1);
        this._hoveredElement = new rxjs__WEBPACK_IMPORTED_MODULE_5__.BehaviorSubject(null);
        this._selectedElement = new rxjs__WEBPACK_IMPORTED_MODULE_5__.BehaviorSubject(null);
        this.visualizerWrapper$ = this._visualizerWrapper.asObservable();
        this.container$ = this._container.asObservable();
        this.hoverIntersections$ = this._hoverIntersections.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.debounceTime)(5));
        this.hoveredElement$ = this._hoveredElement.asObservable();
        this.hoveredGood$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.combineLatest)([this.container$, this.hoveredElement$]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.map)(([container, element]) => {
            return element ? container.goods.find(x => x.id === element.goodId) : null;
        }));
        this.selectedElement$ = this._selectedElement.asObservable();
        this.selectedGood$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.combineLatest)([this.container$, this.selectedElement$]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.map)(([container, element]) => {
            return element ? container.goods.find(x => x.id === element.goodId) : null;
        }));
        this._sceneBodyId = (0,src_app_globals__WEBPACK_IMPORTED_MODULE_0__.generateGuid)();
        this._resized = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
        this.resized$ = this._resized.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.debounceTime)(100));
        this._meshes = [];
        this._subscriptions = [];
        this.triggerResizeEvent = () => this._resized.next();
        this._setUp();
    }
    addContainerToScene(container, groups) {
        this.clearScene();
        this._addUnloadingArrowToScene(container.height, container.length);
        this._addBaseGridToScene(container.height, container.length);
        this._addContainerToScene(src_app_services_data_service__WEBPACK_IMPORTED_MODULE_1__.DataService.getContainerDimension(container));
        this._container.next(container);
        this._addElementToScene(src_app_services_data_service__WEBPACK_IMPORTED_MODULE_1__.DataService.getContainerDimension(container), 'Container', 'bordered', null, null, null, null);
        for (var good of container.goods) {
            let group = groups.find(x => x.id === good.group);
            this._addElementToScene(src_app_services_data_service__WEBPACK_IMPORTED_MODULE_1__.DataService.getGoodDimension(good), `${good.desc}`, 'good', good.sequenceNr, good.id, group, src_app_services_data_service__WEBPACK_IMPORTED_MODULE_1__.DataService.getContainerDimension(container));
        }
    }
    animateStep(step, keepPreviousGoods = false, keepPreviousUnusedSpaces = false) {
        this._dataService.currentContainer$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.take)(1)).subscribe((container) => {
            this.clearScene(keepPreviousGoods, keepPreviousUnusedSpaces, [step.usedDimension?.guid ?? null].filter(x => x != null));
            this._addUnloadingArrowToScene(container.height, container.length);
            this._addBaseGridToScene(container.height, container.length);
            this._addContainerToScene(src_app_services_data_service__WEBPACK_IMPORTED_MODULE_1__.DataService.getContainerDimension(container));
            if (step.dimension)
                this._addElementToScene(step.dimension, null, 'good', step.sequenceNumber, null, null, src_app_services_data_service__WEBPACK_IMPORTED_MODULE_1__.DataService.getContainerDimension(container));
            for (let unusedDimension of step.unusedDimensions) {
                this._addElementToScene(unusedDimension, null, unusedDimension.length === Infinity ? 'infiniteSpace' : 'unusedSpace', step.sequenceNumber, null, null, src_app_services_data_service__WEBPACK_IMPORTED_MODULE_1__.DataService.getContainerDimension(container), unusedDimension.guid);
            }
        });
    }
    clearScene(keepPreviousGoods = false, keepPreviousUnusedSpaces = false, removeDimensionsAnyway = []) {
        let remove = this.scene.children.filter(child => removeDimensionsAnyway.indexOf(child.userData.dimensionGuid) > -1 || !((keepPreviousGoods && child.userData.type === 'good')
            || (keepPreviousUnusedSpaces && (child.userData.type === 'infiniteSpace' || child.userData.type === 'unusedSpace'))));
        for (let child of remove)
            this.scene.remove(child);
    }
    dispose() {
        for (let sub of this._subscriptions)
            sub.unsubscribe();
        this._subscriptions = [];
    }
    highlightGood(good) {
        let meshes = this.scene.children.filter(x => x instanceof three__WEBPACK_IMPORTED_MODULE_3__.Mesh);
        meshes.forEach(x => {
            let meshWrapper = this._meshes.find(y => y.mesh === x);
            x.material.color.set(meshWrapper ? meshWrapper.goodId === good.id ? 'white' : meshWrapper.groupColor : null);
        });
    }
    highlightGoods(goods) {
        let goodIds = goods.map(x => x.id);
        let meshes = this.scene.children.filter(x => x instanceof three__WEBPACK_IMPORTED_MODULE_3__.Mesh);
        meshes.forEach(x => {
            let meshWrapper = this._meshes.find(y => y.mesh === x);
            x.material.color.set(meshWrapper ? goodIds.indexOf(meshWrapper.goodId) > -1 ? 'white' : meshWrapper.groupColor : null);
        });
    }
    keydown(event) {
        let updateProjection = false;
        let updateControls = false;
        switch (event.key) {
            case 'w':
                this.controls.target.set(this.controls.target.x, this.controls.target.y - src_app_globals__WEBPACK_IMPORTED_MODULE_0__.keyboardControlMoveStep, this.controls.target.z);
                updateControls = true;
                break;
            case 's':
                this.controls.target.set(this.controls.target.x, this.controls.target.y + src_app_globals__WEBPACK_IMPORTED_MODULE_0__.keyboardControlMoveStep, this.controls.target.z);
                updateControls = true;
                break;
            case 'a':
                this.controls.target.set(this.controls.target.x + src_app_globals__WEBPACK_IMPORTED_MODULE_0__.keyboardControlMoveStep, this.controls.target.y, this.controls.target.z);
                updateControls = true;
                break;
            case 'd':
                this.controls.target.set(this.controls.target.x - src_app_globals__WEBPACK_IMPORTED_MODULE_0__.keyboardControlMoveStep, this.controls.target.y, this.controls.target.z);
                updateControls = true;
                break;
            case 'y':
                this.controls.target.set(this.controls.target.x, this.controls.target.y, this.controls.target.z + src_app_globals__WEBPACK_IMPORTED_MODULE_0__.keyboardControlMoveStep);
                updateControls = true;
                break;
            case 'x':
                this.controls.target.set(this.controls.target.x, this.controls.target.y, this.controls.target.z - src_app_globals__WEBPACK_IMPORTED_MODULE_0__.keyboardControlMoveStep);
                updateControls = true;
                break;
        }
        if (updateProjection) {
            this.camera.updateProjectionMatrix();
            this.controls.update();
        }
        if (updateControls)
            this.controls.update();
    }
    mouseclick(event) {
        if (event.target.id === this._sceneBodyId) {
            this.visualizerWrapper$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.take)(1)).subscribe(wrapper => {
                let pointedElement = this._getPointedElement(event, wrapper);
                this._selectedElement.next(pointedElement ? this._meshes.find(x => x.mesh === pointedElement.object) : null);
            });
        }
    }
    mousemove(event) {
        if (event.target.id === this._sceneBodyId)
            this._hoverIntersections.next(event);
    }
    render() {
        requestAnimationFrame(() => this.render());
        this.renderer.render(this.scene, this.camera);
    }
    reRenderCurrentContainer() {
        (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.combineLatest)([this._dataService.currentContainer$, this._dataService.currentGroups$]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.take)(1))
            .subscribe(([container, groups]) => this.addContainerToScene(container, groups));
    }
    selectGood(good) {
        let wrapper = this._meshes.find(x => x.goodId === good.id);
        if (wrapper)
            this._selectedElement.next(wrapper);
    }
    setSceneDimensions(width, height, preventCameraPositionReset = false) {
        if (!this.camera || !preventCameraPositionReset) {
            this.camera = new three__WEBPACK_IMPORTED_MODULE_3__.PerspectiveCamera(20, width / height, 1, 10000000);
            this.camera.position.set(12000, 5000, 10000);
        }
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.controls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_2__.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.controls.dampingFactor = 0.25;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 5000;
        this.controls.maxDistance = 50000;
        this.controls.rotateSpeed = 1;
        this.controls.update();
        this.render();
    }
    setVisualizerWrapper(ref) {
        this._visualizerWrapper.next(ref);
        this.setSceneDimensions(ref.nativeElement.clientWidth, ref.nativeElement.clientHeight);
        ref.nativeElement.append(this.renderer.domElement);
    }
    updateGroupColors() {
        this._dataService.currentGroups$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.take)(1)).subscribe((groups) => {
            this._meshes.forEach(x => {
                let group = groups.find(y => y.id === x.groupId);
                x.groupColor = group?.color ?? null;
                x.mesh.material.color.set(x.groupColor);
            });
        });
    }
    _addBaseGridToScene(containerHeight, containerLength) {
        var gridHelper = new three__WEBPACK_IMPORTED_MODULE_3__.GridHelper(1.5 * containerLength, 15);
        gridHelper.position.set(0, (containerHeight / -2), 0);
        this.scene.add(gridHelper);
    }
    _addContainerToScene(dimension) {
        this._addElementToScene(dimension, 'Container', 'bordered', null, null, null, null);
    }
    _addElementToScene(dimension, preview, type, sequenceNumber = null, goodId = null, group = null, parentDimension = null, dimensionGuid = null) {
        var length = dimension.length;
        if (!length)
            length = (parentDimension.length - dimension.z); // rotation
        var mesh;
        var edges;
        switch (type) {
            case "good":
                var color = group && group.color ? group.color : "rgb(200, 200, 200)";
                var groupId = group && group.id ? group.id : null;
                var geometry = new three__WEBPACK_IMPORTED_MODULE_3__.BoxGeometry(dimension.width, dimension.height, length, 4, 4, 4); // rotation
                var material = new three__WEBPACK_IMPORTED_MODULE_3__.MeshBasicMaterial({ color: color });
                mesh = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(geometry, material);
                mesh.userData = { type: type };
                edges = new three__WEBPACK_IMPORTED_MODULE_3__.LineSegments(new three__WEBPACK_IMPORTED_MODULE_3__.EdgesGeometry(mesh.geometry), new three__WEBPACK_IMPORTED_MODULE_3__.LineBasicMaterial({ color: src_app_globals__WEBPACK_IMPORTED_MODULE_0__.defaultGoodEdgeColor, linewidth: 1 }));
                edges.userData = { type: type, dimensionGuid: dimensionGuid };
                var meshWrapper = {
                    preview: preview,
                    groupColor: color,
                    groupId: groupId,
                    seqNr: sequenceNumber,
                    goodId: goodId,
                    mesh: mesh,
                    edges: edges
                };
                this._meshes.push(meshWrapper);
                meshWrapper.mesh.add(edges);
                break;
            default:
                let edgeColor = type === 'infiniteSpace' ? 'orange' : type === 'unusedSpace' ? 'red' : 'black';
                var geometry = new three__WEBPACK_IMPORTED_MODULE_3__.BoxBufferGeometry(dimension.width, dimension.height, dimension.length === Infinity ? src_app_globals__WEBPACK_IMPORTED_MODULE_0__.infinityReplacement : dimension.length);
                edges = new three__WEBPACK_IMPORTED_MODULE_3__.LineSegments(new three__WEBPACK_IMPORTED_MODULE_3__.EdgesGeometry(geometry), new three__WEBPACK_IMPORTED_MODULE_3__.LineBasicMaterial({ color: edgeColor, linewidth: 1 }));
                edges.userData = { type: type, dimensionGuid: dimensionGuid };
                if (type === 'infiniteSpace')
                    console.log(edges);
                break;
        }
        var x = parentDimension ? dimension.x - (parentDimension.width / 2) + (dimension.width / 2) : dimension.x;
        var y = parentDimension ? dimension.y - (parentDimension.height / 2) + (dimension.height / 2) : dimension.y;
        var z = parentDimension ? dimension.z - (parentDimension.length / 2) + ((dimension.length === Infinity ? src_app_globals__WEBPACK_IMPORTED_MODULE_0__.infinityReplacement : dimension.length) / 2) : dimension.z;
        if (mesh) {
            mesh.position.x = x;
            mesh.position.y = y;
            mesh.position.z = z;
            this.scene.add(mesh);
        }
        if (edges != null) {
            edges.position.set(x, y, z);
            this.scene.add(edges);
        }
    }
    _addUnloadingArrowToScene(containerHeight, containerLength) {
        var from = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, (containerHeight / -2), (containerLength / 2));
        var to = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, (containerHeight / -2), (containerLength / 2) + 1000);
        var direction = to.clone().sub(from);
        var length = direction.length();
        var arrowHelper = new three__WEBPACK_IMPORTED_MODULE_3__.ArrowHelper(direction.normalize(), from, length, "red");
        this.scene.add(arrowHelper);
    }
    _getPointedElement(event, wrapper, meshes = null) {
        if (!Array.isArray(meshes))
            meshes = this.scene.children.filter(x => x instanceof three__WEBPACK_IMPORTED_MODULE_3__.Mesh);
        let x = ((event.clientX - wrapper.nativeElement.offsetParent.offsetLeft - wrapper.nativeElement.offsetLeft) / event.target.offsetWidth) * 2 - 1;
        let y = -((event.clientY - event.target.offsetTop) / event.target.offsetHeight) * 2 + 1;
        this.ray.setFromCamera({ x: x, y: y }, this.camera);
        const intersects = this.ray.intersectObjects(meshes);
        var found = null;
        intersects.forEach(function (object) {
            if (object.object instanceof three__WEBPACK_IMPORTED_MODULE_3__.Mesh && (found == null || found.distance > object.distance))
                found = object;
        });
        return found;
    }
    _highlightIntersections(event, wrapper) {
        let meshes = this.scene.children.filter(x => x instanceof three__WEBPACK_IMPORTED_MODULE_3__.Mesh);
        meshes.forEach(x => {
            let meshWrapper = this._meshes.find(y => y.mesh === x);
            x.material.color.set(meshWrapper ? meshWrapper.groupColor : null);
        });
        let found = this._getPointedElement(event, wrapper, meshes);
        if (found != null)
            found.object.material.color.set("white");
        this._hoveredElement.next(found && found.object ? this._meshes.find(x => x.mesh === found.object) : null);
    }
    _setUp() {
        this.scene.background = new three__WEBPACK_IMPORTED_MODULE_3__.Color('rgb(238,238,238)');
        this.renderer.domElement.id = this._sceneBodyId;
        this._subscriptions.push(...[
            (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.combineLatest)([this.hoverIntersections$, this.visualizerWrapper$]).subscribe(([event, wrapper]) => {
                this._highlightIntersections(event, wrapper);
            }),
            this._selectedElement.subscribe(element => {
                for (let mesh of this._meshes) {
                    if (mesh && mesh.edges) {
                        let color = mesh === element ? src_app_globals__WEBPACK_IMPORTED_MODULE_0__.selectedGoodEdgeColor : src_app_globals__WEBPACK_IMPORTED_MODULE_0__.defaultGoodEdgeColor;
                        mesh.edges.material.color = new three__WEBPACK_IMPORTED_MODULE_3__.Color(color);
                    }
                }
            }),
            this._dataService.currentSolution$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.filter)(x => x ? true : false)).subscribe((solution) => {
                this.addContainerToScene(solution.container, solution.groups);
            })
        ]);
    }
}
VisualizerComponentService.ɵfac = function VisualizerComponentService_Factory(t) { return new (t || VisualizerComponentService)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](src_app_services_data_service__WEBPACK_IMPORTED_MODULE_1__.DataService)); };
VisualizerComponentService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjectable"]({ token: VisualizerComponentService, factory: VisualizerComponentService.ɵfac });


/***/ }),

/***/ 84:
/*!********************************************************************!*\
  !*** ./src/app/components/main/visualizer/visualizer.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VisualizerComponent": () => (/* binding */ VisualizerComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 84505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 59095);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 83910);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 59151);
/* harmony import */ var src_app_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/animations */ 54000);
/* harmony import */ var src_app_globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/globals */ 37503);
/* harmony import */ var _dialog_no_solution_dialog_no_solution_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dialog/no-solution-dialog/no-solution-dialog.component */ 69735);
/* harmony import */ var _visualizer_component_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./visualizer-component-service */ 7078);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_services_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/data.service */ 52468);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/dialog */ 31484);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _solution_preview_solution_preview_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../solution-preview/solution-preview.component */ 98067);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ 84522);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 57822);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/expansion */ 17591);
/* harmony import */ var _good_preview_good_preview_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../good-preview/good-preview.component */ 28142);
















const _c0 = ["visualizerWrapper"];

function VisualizerComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "app-solution-preview");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}

function VisualizerComponent_div_9_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](2, 1, ctx_r5.visualizerComponentService.hoveredElement$).preview, " ");
  }
}

function VisualizerComponent_div_9_span_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵstyleProp"]("color", ctx_r6.selectedGoodEdgeColor);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](2, 3, ctx_r6.visualizerComponentService.selectedElement$).preview, " ");
  }
}

function VisualizerComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 8)(1, "mat-expansion-panel")(2, "mat-expansion-panel-header")(3, "mat-panel-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](4, VisualizerComponent_div_9_span_4_Template, 3, 3, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](5, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "mat-panel-description");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7, " Hervorgehobenes Element ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "app-good-preview", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](9, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "mat-expansion-panel", 11)(11, "mat-expansion-panel-header")(12, "mat-panel-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](13, VisualizerComponent_div_9_span_13_Template, 3, 5, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](14, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](15, "mat-panel-description");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](16, " Gew\u00E4hltes Element ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](17, "app-good-preview", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](18, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](12);

    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](5, 6, ctx_r2.visualizerComponentService.hoveredElement$))("ngIfElse", _r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("good", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](9, 8, ctx_r2.visualizerComponentService.hoveredGood$));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](14, 10, ctx_r2.visualizerComponentService.selectedElement$))("ngIfElse", _r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("good", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](18, 12, ctx_r2.visualizerComponentService.selectedGood$));
  }
}

function VisualizerComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "Kein Element");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}

class VisualizerComponent {
  constructor(visualizerComponentService, _dataService, _dialog, _viewContainerRef) {
    this.visualizerComponentService = visualizerComponentService;
    this._dataService = _dataService;
    this._dialog = _dialog;
    this._viewContainerRef = _viewContainerRef;
    this._menuVisible = new rxjs__WEBPACK_IMPORTED_MODULE_8__.BehaviorSubject(true);
    this.menuVisible$ = this._menuVisible.asObservable();
    this._displayDetails = new rxjs__WEBPACK_IMPORTED_MODULE_8__.BehaviorSubject(true);
    this.displayDetails$ = this._displayDetails.asObservable();
    this._subscriptions = [];

    this.toggleMenu = () => this._menuVisible.next(!this._menuVisible.value);

    this.onKeydown = event => this.visualizerComponentService.keydown(event);

    this.selectedGoodEdgeColor = src_app_globals__WEBPACK_IMPORTED_MODULE_1__.selectedGoodEdgeColor;
  }

  set visualizerWrapperRef(ref) {
    this.visualizerComponentService.setVisualizerWrapper(ref);
  }

  ngAfterViewInit() {
    this.validateClient();
  }

  ngOnDestroy() {
    for (let sub of this._subscriptions) sub.unsubscribe();

    this._subscriptions = [];
    this.visualizerComponentService.dispose();
  }

  ngOnInit() {
    this._subscriptions.push(...[this.visualizerComponentService.resized$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.switchMap)(() => this.visualizerComponentService.visualizerWrapper$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.take)(1)))).subscribe(ref => {
      this.visualizerComponentService.setSceneDimensions(ref.nativeElement.clientWidth, ref.nativeElement.clientHeight, true);
    }), this._dataService.currentSolution$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.filter)(solution => solution === null ? true : false)).subscribe(() => this.showNoSolutionDialog()), this.menuVisible$.subscribe(() => this.visualizerComponentService.triggerResizeEvent())]);
  }

  showNoSolutionDialog() {
    this._dialog.open(_dialog_no_solution_dialog_no_solution_dialog_component__WEBPACK_IMPORTED_MODULE_2__.NoSolutionDialogComponent, {
      panelClass: 'no-padding-dialog',
      disableClose: true,
      viewContainerRef: this._viewContainerRef
    });
  }

  onResize(event) {
    this.visualizerComponentService.triggerResizeEvent();
    this.validateClient();
  }

  validateClient() {
    this._displayDetails.next(window.innerWidth >= 1000);

    this._menuVisible.next(window.innerWidth >= 1000);
  }

}

VisualizerComponent.ɵfac = function VisualizerComponent_Factory(t) {
  return new (t || VisualizerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_visualizer_component_service__WEBPACK_IMPORTED_MODULE_3__.VisualizerComponentService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_services_data_service__WEBPACK_IMPORTED_MODULE_4__.DataService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewContainerRef));
};

VisualizerComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: VisualizerComponent,
  selectors: [["app-visualizer"]],
  viewQuery: function VisualizerComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c0, 5);
    }

    if (rf & 2) {
      let _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.visualizerWrapperRef = _t.first);
    }
  },
  hostBindings: function VisualizerComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("resize", function VisualizerComponent_resize_HostBindingHandler($event) {
        return ctx.onResize($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresolveWindow"])("keypress", function VisualizerComponent_keypress_HostBindingHandler($event) {
        return ctx.onKeydown($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresolveDocument"]);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵProvidersFeature"]([_visualizer_component_service__WEBPACK_IMPORTED_MODULE_3__.VisualizerComponentService])],
  decls: 13,
  vars: 10,
  consts: [[1, "body", "main-component-body"], ["class", "solution-wrapper", 4, "ngIf"], [1, "visualizer-wrapper", 3, "mousemove", "click"], ["visualizerWrapper", ""], ["mat-icon-button", "", 1, "menu-toggler", 3, "click"], ["class", "information-wrapper", 4, "ngIf"], ["noElement", ""], [1, "solution-wrapper"], [1, "information-wrapper"], [4, "ngIf", "ngIfElse"], [3, "good"], ["expanded", "true"], [3, "color", 4, "ngIf", "ngIfElse"], [1, "no-element-hint"]],
  template: function VisualizerComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, VisualizerComponent_div_1_Template, 2, 0, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "div", 2, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("mousemove", function VisualizerComponent_Template_div_mousemove_3_listener($event) {
        return ctx.visualizerComponentService.mousemove($event);
      })("click", function VisualizerComponent_Template_div_click_3_listener($event) {
        return ctx.visualizerComponentService.mouseclick($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function VisualizerComponent_Template_button_click_5_listener() {
        return ctx.toggleMenu();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](8, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](9, VisualizerComponent_div_9_Template, 19, 14, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](10, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](11, VisualizerComponent_ng_template_11_Template, 2, 0, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](2, 4, ctx.menuVisible$));
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("@show", undefined);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](8, 6, ctx.menuVisible$) ? "chevron_left" : "chevron_right");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](10, 8, ctx.displayDetails$));
    }
  },
  directives: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _solution_preview_solution_preview_component__WEBPACK_IMPORTED_MODULE_5__.SolutionPreviewComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_16__.MatExpansionPanel, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_16__.MatExpansionPanelHeader, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_16__.MatExpansionPanelTitle, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_16__.MatExpansionPanelDescription, _good_preview_good_preview_component__WEBPACK_IMPORTED_MODULE_6__.GoodPreviewComponent],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.AsyncPipe],
  styles: [".body[_ngcontent-%COMP%] {\n    display: flex;\n}\n\n.solution-wrapper[_ngcontent-%COMP%] {\n    flex: 1;\n    max-width: 400px;\n    box-shadow: 0 0 4px #848484;\n    z-index: 1;\n}\n\n.visualizer-wrapper[_ngcontent-%COMP%] {\n    height: -webkit-fill-available;\n    width: -webkit-fill-available;\n    flex: 1;\n    overflow: hidden;\n    position: relative;\n}\n\n.menu-toggler[_ngcontent-%COMP%] {\n    position: absolute;\n    left: .5rem;\n    top: .5rem;\n    z-index: 1;\n    background-color: white;\n    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);\n}\n\n.information-wrapper[_ngcontent-%COMP%] {\n    right: 1rem;\n    bottom: 1rem;\n    position: absolute;\n    width: 400px;\n}\n\n.information-wrapper[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n    margin-bottom: .5rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpc3VhbGl6ZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxPQUFPO0lBQ1AsZ0JBQWdCO0lBQ2hCLDJCQUEyQjtJQUMzQixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSw4QkFBOEI7SUFDOUIsNkJBQTZCO0lBQzdCLE9BQU87SUFDUCxnQkFBZ0I7SUFDaEIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFdBQVc7SUFDWCxVQUFVO0lBQ1YsVUFBVTtJQUNWLHVCQUF1QjtJQUN2QixpSEFBaUg7QUFDckg7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksb0JBQW9CO0FBQ3hCIiwiZmlsZSI6InZpc3VhbGl6ZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ib2R5IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xufVxuXG4uc29sdXRpb24td3JhcHBlciB7XG4gICAgZmxleDogMTtcbiAgICBtYXgtd2lkdGg6IDQwMHB4O1xuICAgIGJveC1zaGFkb3c6IDAgMCA0cHggIzg0ODQ4NDtcbiAgICB6LWluZGV4OiAxO1xufVxuXG4udmlzdWFsaXplci13cmFwcGVyIHtcbiAgICBoZWlnaHQ6IC13ZWJraXQtZmlsbC1hdmFpbGFibGU7XG4gICAgd2lkdGg6IC13ZWJraXQtZmlsbC1hdmFpbGFibGU7XG4gICAgZmxleDogMTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLm1lbnUtdG9nZ2xlciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IC41cmVtO1xuICAgIHRvcDogLjVyZW07XG4gICAgei1pbmRleDogMTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICBib3gtc2hhZG93OiAwcHggM3B4IDFweCAtMnB4IHJnYigwIDAgMCAvIDIwJSksIDBweCAycHggMnB4IDBweCByZ2IoMCAwIDAgLyAxNCUpLCAwcHggMXB4IDVweCAwcHggcmdiKDAgMCAwIC8gMTIlKTtcbn1cblxuLmluZm9ybWF0aW9uLXdyYXBwZXIge1xuICAgIHJpZ2h0OiAxcmVtO1xuICAgIGJvdHRvbTogMXJlbTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IDQwMHB4O1xufVxuXG4uaW5mb3JtYXRpb24td3JhcHBlciA+ICoge1xuICAgIG1hcmdpbi1ib3R0b206IC41cmVtO1xufVxuXG4iXX0= */"],
  data: {
    animation: [src_app_animations__WEBPACK_IMPORTED_MODULE_0__.showAnimation]
  }
});

/***/ }),

/***/ 33252:
/*!*******************************************************!*\
  !*** ./src/app/components/navbar/navbar.component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavbarComponent": () => (/* binding */ NavbarComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 84505);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var src_app_services_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/data.service */ 52468);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 57822);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);






class NavbarComponent {
  constructor(router, dataService) {
    this.router = router;
    this.dataService = dataService;
    this._limitedHeight = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(false);
    this.limitedHeight$ = this._limitedHeight.asObservable();
  }

  ngOnInit() {}

  onResize(event) {
    this.validateClient();
  }

  validateClient() {
    this._limitedHeight.next(window.innerHeight <= 500);
  }

}

NavbarComponent.ɵfac = function NavbarComponent_Factory(t) {
  return new (t || NavbarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_data_service__WEBPACK_IMPORTED_MODULE_0__.DataService));
};

NavbarComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: NavbarComponent,
  selectors: [["app-navbar"]],
  hostBindings: function NavbarComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("resize", function NavbarComponent_resize_HostBindingHandler($event) {
        return ctx.onResize($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresolveWindow"]);
    }
  },
  decls: 40,
  vars: 20,
  consts: [[1, "body"], [1, "option-wrapper", "disabled"], ["routerLink", "route-planning", 1, "option"], [1, "icon"], [1, "text"], [1, "option-wrapper"], ["routerLink", "data-pipeline-designer", 1, "option"], ["routerLink", "orders", 1, "option"], ["routerLink", "calculation", 1, "option"], ["routerLink", "visualizer", 1, "option"], [1, "spacer"], ["routerLink", "about", 1, "option"]],
  template: function NavbarComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 1)(3, "div", 2)(4, "mat-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "map");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "routing");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 5)(9, "div", 6)(10, "mat-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "hub");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "pipeline");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 5)(15, "div", 7)(16, "mat-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "web_stories");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "orders");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "div", 5)(21, "div", 8)(22, "mat-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, "file_upload");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, "calculate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](27, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "div", 9)(29, "mat-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, "view_in_ar");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](32, "visualization");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](33, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "div", 5)(35, "div", 11)(36, "mat-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](37, "help");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](38, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](39, "about");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("limited-height", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 16, ctx.limitedHeight$));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("active", ctx.router.url === "/route-planning");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("active", ctx.router.url === "/data-pipeline-designer");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("active", ctx.router.url === "/orders");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("active", ctx.router.url === "/calculation");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("disabled", !_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](27, 18, ctx.dataService.currentSolutionAvailable$));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("active", ctx.router.url === "/visualizer");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("active", ctx.router.url === "/about");
    }
  },
  directives: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIcon],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.AsyncPipe],
  styles: [".body[_ngcontent-%COMP%] {\n    box-shadow: 0 0 4px #848484;\n    z-index: 2;\n    position: relative;\n    height: 100%;\n    overflow: hidden;\n    background-color: #3a3a3a;\n    color: white;\n    display: flex;\n    flex-direction: column;\n}\n\n.option-wrapper[_ngcontent-%COMP%] {\n    overflow: hidden;\n}\n\n.option-wrapper.disabled[_ngcontent-%COMP%] {\n    opacity: .2;\n    pointer-events: none;\n}\n\n.option[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    height: 80px;\n    width: 80px;\n    cursor: pointer;\n    transition: all .2s;\n    overflow: hidden;\n    -webkit-user-select: none;\n            user-select: none;\n}\n\n.option.active[_ngcontent-%COMP%] {\n    background: linear-gradient(135deg, #0078d4, #0078d4bd, #0078d4);\n}\n\n.option[_ngcontent-%COMP%]:hover {\n    background-color: rgba(255, 255, 255, 0.1);\n    transform: scale(1.05);\n}\n\n.option.active[_ngcontent-%COMP%]:hover {\n    background-color: #00a791;\n}\n\n.option[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n    height: auto;\n    width: auto;\n    color: #f6f6f6;\n}\n\n.option[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%] {\n    font-size: .6rem;\n    font-weight: 100;\n}\n\n@media screen and (max-height: 500px) {\n\n    .option[_ngcontent-%COMP%] {\n        width: 40px;\n        height: 40px;\n    }\n\n\n    .option[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n        font-size: 1rem;\n    }\n\n    .option[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%] {\n        display: none;\n    }\n\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmJhci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksMkJBQTJCO0lBQzNCLFVBQVU7SUFDVixrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQix5QkFBeUI7SUFDekIsWUFBWTtJQUNaLGFBQWE7SUFDYixzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsb0JBQW9CO0FBQ3hCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsdUJBQXVCO0lBQ3ZCLFlBQVk7SUFDWixXQUFXO0lBQ1gsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIseUJBQWlCO1lBQWpCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGdFQUFnRTtBQUNwRTs7QUFFQTtJQUNJLDBDQUEwQztJQUMxQyxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsWUFBWTtJQUNaLFdBQVc7SUFDWCxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGdCQUFnQjtBQUNwQjs7QUFFQTs7SUFFSTtRQUNJLFdBQVc7UUFDWCxZQUFZO0lBQ2hCOzs7SUFHQTtRQUNJLGVBQWU7SUFDbkI7O0lBRUE7UUFDSSxhQUFhO0lBQ2pCOztBQUVKIiwiZmlsZSI6Im5hdmJhci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJvZHkge1xuICAgIGJveC1zaGFkb3c6IDAgMCA0cHggIzg0ODQ4NDtcbiAgICB6LWluZGV4OiAyO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2EzYTNhO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5vcHRpb24td3JhcHBlciB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLm9wdGlvbi13cmFwcGVyLmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAuMjtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLm9wdGlvbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgaGVpZ2h0OiA4MHB4O1xuICAgIHdpZHRoOiA4MHB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB0cmFuc2l0aW9uOiBhbGwgLjJzO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG59XG5cbi5vcHRpb24uYWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMDA3OGQ0LCAjMDA3OGQ0YmQsICMwMDc4ZDQpO1xufVxuXG4ub3B0aW9uOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcbn1cblxuLm9wdGlvbi5hY3RpdmU6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMGE3OTE7XG59XG5cbi5vcHRpb24gLmljb24ge1xuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgIGhlaWdodDogYXV0bztcbiAgICB3aWR0aDogYXV0bztcbiAgICBjb2xvcjogI2Y2ZjZmNjtcbn1cblxuLm9wdGlvbiAudGV4dCB7XG4gICAgZm9udC1zaXplOiAuNnJlbTtcbiAgICBmb250LXdlaWdodDogMTAwO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LWhlaWdodDogNTAwcHgpIHtcblxuICAgIC5vcHRpb24ge1xuICAgICAgICB3aWR0aDogNDBweDtcbiAgICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgIH1cblxuXG4gICAgLm9wdGlvbiAuaWNvbiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICB9XG5cbiAgICAub3B0aW9uIC50ZXh0IHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG5cbn0iXX0= */"]
});

/***/ }),

/***/ 4214:
/*!**************************************************************************!*\
  !*** ./src/app/components/select/select-group/select-group.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectGroupComponent": () => (/* binding */ SelectGroupComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var src_app_services_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/data.service */ 52468);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ 75074);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/select */ 57371);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/core */ 59121);










function SelectGroupComponent_mat_option_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const group_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", group_r1._Id);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", group_r1._Desc, " ");
  }
}

class SelectGroupComponent {
  constructor(dataService) {
    this.dataService = dataService;
    this.valueControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl();
    this._subscriptions = [];

    this.onTouched = () => {};

    this.registerOnTouched = fn => this.onTouched = fn;

    this.writeValue = val => this.valueControl.patchValue(val);
  }

  addGroup(event) {
    event.stopPropagation();
    this.dataService.addGroup({
      desc: event.target.value
    });
    event.target.value = null;
  }

  ngOnDestroy() {
    for (let sub of this._subscriptions) sub.unsubscribe();

    this._subscriptions = [];
  }

  ngOnInit() {}

  registerOnChange(fn) {
    this._subscriptions.push(this.valueControl.valueChanges.subscribe(fn));
  }

  setDisabledState(isDisabled) {
    isDisabled ? this.valueControl.disable() : this.valueControl.enable();
  }

}

SelectGroupComponent.ɵfac = function SelectGroupComponent_Factory(t) {
  return new (t || SelectGroupComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_data_service__WEBPACK_IMPORTED_MODULE_0__.DataService));
};

SelectGroupComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: SelectGroupComponent,
  selectors: [["app-select-group"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([{
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NG_VALUE_ACCESSOR,
    useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(() => SelectGroupComponent),
    multi: true
  }])],
  decls: 8,
  vars: 4,
  consts: [[1, "body"], [1, "label"], [3, "formControl"], [3, "value", 4, "ngFor", "ngForOf"], [1, "smgr-manual-select-add-input-option"], ["type", "text", "placeholder", "Weiteres Ziel angeben", 1, "smgr-manual-select-add-input", 3, "click", "keydown", "keydown.enter"], [3, "value"]],
  template: function SelectGroupComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "mat-label", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Ziel w\u00E4hlen");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-select", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, SelectGroupComponent_mat_option_4_Template, 2, 2, "mat-option", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "mat-option", 4)(7, "input", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SelectGroupComponent_Template_input_click_7_listener($event) {
        return $event.stopPropagation();
      })("keydown", function SelectGroupComponent_Template_input_keydown_7_listener($event) {
        return $event.stopPropagation();
      })("keydown.enter", function SelectGroupComponent_Template_input_keydown_enter_7_listener($event) {
        return ctx.addGroup($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx.valueControl);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 2, ctx.dataService.groups$));
    }
  },
  directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_4__.MatSelect, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlDirective, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_material_core__WEBPACK_IMPORTED_MODULE_6__.MatOption],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.AsyncPipe],
  styles: [".body[_ngcontent-%COMP%] {\n    width: 150px;\n}\n\n.label[_ngcontent-%COMP%] {\n    font-size: .8rem;\n    font-weight: 500;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdC1ncm91cC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixnQkFBZ0I7QUFDcEIiLCJmaWxlIjoic2VsZWN0LWdyb3VwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYm9keSB7XG4gICAgd2lkdGg6IDE1MHB4O1xufVxuXG4ubGFiZWwge1xuICAgIGZvbnQtc2l6ZTogLjhyZW07XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cbiJdfQ== */"]
});

/***/ }),

/***/ 61065:
/*!******************************************************************************!*\
  !*** ./src/app/components/select/select-product/select-product.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectProductComponent": () => (/* binding */ SelectProductComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var src_app_services_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/data.service */ 52468);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ 75074);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/select */ 57371);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/core */ 59121);










function SelectProductComponent_mat_option_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const product_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", product_r1.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", product_r1.description, " ");
  }
}

class SelectProductComponent {
  constructor(dataService) {
    this.dataService = dataService;
    this.valueControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl();
    this._subscriptions = [];

    this.onTouched = () => {};

    this.registerOnTouched = fn => this.onTouched = fn;

    this.writeValue = val => this.valueControl.patchValue(val);
  }

  addProduct(event) {
    event.stopPropagation();
    this.dataService.addProduct({
      'description': event.target.value,
      'height': 0,
      'length': 0,
      'width': 0
    });
    event.target.value = null;
  }

  ngOnDestroy() {
    for (let sub of this._subscriptions) sub.unsubscribe();

    this._subscriptions = [];
  }

  ngOnInit() {}

  registerOnChange(fn) {
    this._subscriptions.push(this.valueControl.valueChanges.subscribe(fn));
  }

  setDisabledState(isDisabled) {
    isDisabled ? this.valueControl.disable() : this.valueControl.enable();
  }

}

SelectProductComponent.ɵfac = function SelectProductComponent_Factory(t) {
  return new (t || SelectProductComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_data_service__WEBPACK_IMPORTED_MODULE_0__.DataService));
};

SelectProductComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: SelectProductComponent,
  selectors: [["app-select-product"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([{
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NG_VALUE_ACCESSOR,
    useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(() => SelectProductComponent),
    multi: true
  }])],
  decls: 8,
  vars: 4,
  consts: [[1, "body"], [1, "label"], [3, "formControl"], [3, "value", 4, "ngFor", "ngForOf"], [1, "smgr-manual-select-add-input-option"], ["type", "text", "placeholder", "Weiteres Produkt angeben", 1, "smgr-manual-select-add-input", 3, "click", "keydown", "keydown.enter"], [3, "value"]],
  template: function SelectProductComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "mat-label", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Produkt w\u00E4hlen");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-select", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, SelectProductComponent_mat_option_4_Template, 2, 2, "mat-option", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "mat-option", 4)(7, "input", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SelectProductComponent_Template_input_click_7_listener($event) {
        return $event.stopPropagation();
      })("keydown", function SelectProductComponent_Template_input_keydown_7_listener($event) {
        return $event.stopPropagation();
      })("keydown.enter", function SelectProductComponent_Template_input_keydown_enter_7_listener($event) {
        return ctx.addProduct($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx.valueControl);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 2, ctx.dataService.products$));
    }
  },
  directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_4__.MatSelect, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlDirective, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_material_core__WEBPACK_IMPORTED_MODULE_6__.MatOption],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.AsyncPipe],
  styles: [".body[_ngcontent-%COMP%] {\n    width: 150px;\n}\n\n.label[_ngcontent-%COMP%] {\n    font-size: .8rem;\n    font-weight: 500;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdC1wcm9kdWN0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGdCQUFnQjtBQUNwQiIsImZpbGUiOiJzZWxlY3QtcHJvZHVjdC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJvZHkge1xuICAgIHdpZHRoOiAxNTBweDtcbn1cblxuLmxhYmVsIHtcbiAgICBmb250LXNpemU6IC44cmVtO1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG4iXX0= */"]
});

/***/ }),

/***/ 811:
/*!************************************************************************!*\
  !*** ./src/app/components/select/select-unit/select-unit.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectUnitComponent": () => (/* binding */ SelectUnitComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var src_app_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/globals */ 37503);
/* harmony import */ var src_app_services_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/data.service */ 52468);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ 75074);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/select */ 57371);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/core */ 59121);










function SelectUnitComponent_mat_option_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-option", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const unit_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", unit_r1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", unit_r1, " ");
} }
class SelectUnitComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.valueControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl();
        this.units = src_app_globals__WEBPACK_IMPORTED_MODULE_0__.nextUnitSize.map(x => x.unit);
        this._subscriptions = [];
        this.onTouched = () => { };
        this.registerOnTouched = (fn) => this.onTouched = fn;
        this.writeValue = (val) => this.valueControl.patchValue(val);
    }
    ngOnDestroy() {
        for (let sub of this._subscriptions)
            sub.unsubscribe();
        this._subscriptions = [];
    }
    ngOnInit() {
    }
    registerOnChange(fn) {
        this._subscriptions.push(this.valueControl.valueChanges.subscribe(fn));
    }
    setDisabledState(isDisabled) {
        isDisabled ? this.valueControl.disable() : this.valueControl.enable();
    }
}
SelectUnitComponent.ɵfac = function SelectUnitComponent_Factory(t) { return new (t || SelectUnitComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_data_service__WEBPACK_IMPORTED_MODULE_1__.DataService)); };
SelectUnitComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: SelectUnitComponent, selectors: [["app-select-unit"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵProvidersFeature"]([
            {
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NG_VALUE_ACCESSOR,
                useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(() => SelectUnitComponent),
                multi: true
            }
        ])], decls: 5, vars: 2, consts: [[1, "body"], [1, "label"], [3, "formControl"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"]], template: function SelectUnitComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "mat-label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "unit");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "mat-select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, SelectUnitComponent_mat_option_4_Template, 2, 2, "mat-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formControl", ctx.valueControl);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.units);
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_5__.MatSelect, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlDirective, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_material_core__WEBPACK_IMPORTED_MODULE_7__.MatOption], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZWxlY3QtdW5pdC5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 17357:
/*!***************************************************************************************!*\
  !*** ./src/app/components/solution-animation/solution-animation-component.service.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SolutionAnimationComponentService": () => (/* binding */ SolutionAnimationComponentService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 84505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 19193);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 45398);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 86942);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 83910);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 59151);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 88759);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 59095);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 85921);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _main_visualizer_visualizer_component_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main/visualizer/visualizer-component-service */ 7078);
/* harmony import */ var src_app_services_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/data.service */ 52468);





class SolutionAnimationComponentService {
    constructor(_visualizerComponentService, _dataService) {
        this._visualizerComponentService = _visualizerComponentService;
        this._dataService = _dataService;
        this._animationRunning = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(false);
        this._stepIndex = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(0);
        this._animationSpeed = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(2);
        this.animationRunning$ = this._animationRunning.asObservable();
        this.animationSpeed$ = this._animationSpeed.asObservable();
        this.stepIndex$ = this._stepIndex.asObservable();
        this.currentStep$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.combineLatest)([this._dataService.currentSteps$, this.stepIndex$]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(([steps, index]) => steps[index]));
    }
    setAnimationSpeed(value) {
        if (value > 0 && value < 60)
            this._animationSpeed.next(value);
    }
    startAnimation() {
        this._dataService.currentSteps$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.filter)((steps) => steps?.length > 0), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.tap)((steps) => {
            this._visualizerComponentService.clearScene();
            this._animationRunning.next(true);
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.switchMap)((steps) => (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.timer)(0, this._animationSpeed.value * 1000)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.takeUntil)(this._animationRunning.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.filter)(x => x === false))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)((index) => {
            if (typeof steps[index] === 'undefined') {
                this._animationRunning.next(false);
                return null;
            }
            this._stepIndex.next(index);
            return steps[index];
        }))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.filter)((step) => step ? true : false)).subscribe((step) => this._visualizerComponentService.animateStep(step, false, true));
    }
    stopAnimation() {
        this._animationRunning.next(false);
    }
}
SolutionAnimationComponentService.ɵfac = function SolutionAnimationComponentService_Factory(t) { return new (t || SolutionAnimationComponentService)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_main_visualizer_visualizer_component_service__WEBPACK_IMPORTED_MODULE_0__.VisualizerComponentService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](src_app_services_data_service__WEBPACK_IMPORTED_MODULE_1__.DataService)); };
SolutionAnimationComponentService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjectable"]({ token: SolutionAnimationComponentService, factory: SolutionAnimationComponentService.ɵfac });


/***/ }),

/***/ 76774:
/*!*******************************************************************************!*\
  !*** ./src/app/components/solution-animation/solution-animation.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SolutionAnimationComponent": () => (/* binding */ SolutionAnimationComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 83910);
/* harmony import */ var _solution_animation_component_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./solution-animation-component.service */ 17357);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_services_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/data.service */ 52468);
/* harmony import */ var _main_visualizer_visualizer_component_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../main/visualizer/visualizer-component-service */ 7078);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 84522);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 57822);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ 68562);











function SolutionAnimationComponent_ng_container_1_div_22_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const message_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", message_r6, " ");
  }
}

function SolutionAnimationComponent_ng_container_1_div_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("mouseenter", function SolutionAnimationComponent_ng_container_1_div_22_Template_div_mouseenter_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8);
      const step_r4 = restoredCtx.$implicit;
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return ctx_r7.visualizerComponentService.animateStep(step_r4);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, SolutionAnimationComponent_ng_container_1_div_22_div_4_Template, 2, 1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const step_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", step_r4.sequenceNumber + 1, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", step_r4.messages);
  }
}

function SolutionAnimationComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 4)(5, "button", 5)(6, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "fast_rewind");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SolutionAnimationComponent_ng_container_1_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return ctx_r9.solutionAnimationComponentService.startAnimation();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](9, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "play_arrow");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SolutionAnimationComponent_ng_container_1_Template_button_click_12_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return ctx_r11.solutionAnimationComponentService.stopAnimation();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](13, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "pause");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "input", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("input", function SolutionAnimationComponent_ng_container_1_Template_input_input_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return ctx_r12.solutionAnimationComponentService.setAnimationSpeed($event.value);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](17, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "button", 5)(19, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, "fast_forward");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("mouseleave", function SolutionAnimationComponent_ng_container_1_Template_div_mouseleave_21_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return ctx_r13.mouseleave();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](22, SolutionAnimationComponent_ng_container_1_div_22_Template, 5, 2, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](23, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" L\u00F6sung in ", (tmp_0_0 = (tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](3, 5, ctx_r0.dataService.currentSteps$)) == null ? null : tmp_0_0.length) !== null && tmp_0_0 !== undefined ? tmp_0_0 : 0, " Schritten berechnet ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](9, 7, ctx_r0.solutionAnimationComponentService.animationRunning$));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", !_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](13, 9, ctx_r0.solutionAnimationComponentService.animationRunning$));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](17, 11, ctx_r0.solutionAnimationComponentService.animationSpeed$));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](23, 13, ctx_r0.dataService.currentSteps$));
  }
}

function SolutionAnimationComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Keine Berechnungsschritte verf\u00FCgbar ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}

class SolutionAnimationComponent {
  constructor(dataService, visualizerComponentService, solutionAnimationComponentService) {
    this.dataService = dataService;
    this.visualizerComponentService = visualizerComponentService;
    this.solutionAnimationComponentService = solutionAnimationComponentService;
    this._subscriptions = [];
  }

  mouseleave() {
    this.solutionAnimationComponentService.animationRunning$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.take)(1)).subscribe(animationRunning => {
      if (!animationRunning) this.visualizerComponentService.reRenderCurrentContainer();
    });
  }

  ngOnDestroy() {
    for (let sub of this._subscriptions) sub.unsubscribe();

    this._subscriptions = [];
  }

  ngOnInit() {}

}

SolutionAnimationComponent.ɵfac = function SolutionAnimationComponent_Factory(t) {
  return new (t || SolutionAnimationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_data_service__WEBPACK_IMPORTED_MODULE_1__.DataService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_main_visualizer_visualizer_component_service__WEBPACK_IMPORTED_MODULE_2__.VisualizerComponentService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_solution_animation_component_service__WEBPACK_IMPORTED_MODULE_0__.SolutionAnimationComponentService));
};

SolutionAnimationComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: SolutionAnimationComponent,
  selectors: [["app-solution-animation"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([_solution_animation_component_service__WEBPACK_IMPORTED_MODULE_0__.SolutionAnimationComponentService])],
  decls: 5,
  vars: 4,
  consts: [[1, "body"], [4, "ngIf", "ngIfElse"], ["noCalculationStepsAvailable", ""], [1, "headline"], [1, "control-wrapper"], ["mat-icon-button", ""], ["mat-icon-button", "", 3, "disabled", "click"], ["type", "number", "matInput", "", "min", "1", "max", "60", 3, "value", "input"], [1, "step-overview", 3, "mouseleave"], ["class", "step-wrapper", 3, "mouseenter", 4, "ngFor", "ngForOf"], [1, "step-wrapper", 3, "mouseenter"], [1, "sequence-number"], [1, "message-wrapper"], ["class", "message", 4, "ngFor", "ngForOf"], [1, "message"], [1, "no-content-available"]],
  template: function SolutionAnimationComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, SolutionAnimationComponent_ng_container_1_Template, 24, 15, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, SolutionAnimationComponent_ng_template_3_Template, 2, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
    }

    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](4);

      let tmp_0_0;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ((tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 2, ctx.dataService.currentSteps$)) == null ? null : tmp_0_0.length) > 0)("ngIfElse", _r1);
    }
  },
  directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInput, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.AsyncPipe],
  styles: [".step-overview[_ngcontent-%COMP%] {\n    max-height: 200px;\n    overflow-y: auto;\n}\n\n.headline[_ngcontent-%COMP%] {\n    padding: 0.5rem;\n    font-weight: 700;\n}\n\n.step-wrapper[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    border-top: 1px solid lightgray;\n    cursor: pointer;\n}\n\n.step-wrapper[_ngcontent-%COMP%]:nth-child(odd) {\n    background-color: #f8f8f8;\n}\n\n.step-wrapper[_ngcontent-%COMP%]:hover {\n    background-color: rgb(255, 249, 231);\n}\n\n.sequence-number[_ngcontent-%COMP%] {\n    padding: 0px 0.5rem 0px 1rem;\n    font-weight: 700;\n}\n\n.message-wrapper[_ngcontent-%COMP%] {\n    padding: .5rem;\n    flex: 1;\n}\n\n.message[_ngcontent-%COMP%]:not(:last-child) {\n    margin-bottom: .2rem;\n}\n\n.control-wrapper[_ngcontent-%COMP%] {\n    display: flex;\n}\n\n.control-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    flex: 1;\n    max-width: 3rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvbHV0aW9uLWFuaW1hdGlvbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksaUJBQWlCO0lBQ2pCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGVBQWU7SUFDZixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLCtCQUErQjtJQUMvQixlQUFlO0FBQ25COztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksNEJBQTRCO0lBQzVCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGNBQWM7SUFDZCxPQUFPO0FBQ1g7O0FBRUE7SUFDSSxvQkFBb0I7QUFDeEI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksT0FBTztJQUNQLGVBQWU7QUFDbkIiLCJmaWxlIjoic29sdXRpb24tYW5pbWF0aW9uLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc3RlcC1vdmVydmlldyB7XG4gICAgbWF4LWhlaWdodDogMjAwcHg7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuLmhlYWRsaW5lIHtcbiAgICBwYWRkaW5nOiAwLjVyZW07XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLnN0ZXAtd3JhcHBlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uc3RlcC13cmFwcGVyOm50aC1jaGlsZChvZGQpIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOGY4O1xufVxuXG4uc3RlcC13cmFwcGVyOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAyNDksIDIzMSk7XG59XG5cbi5zZXF1ZW5jZS1udW1iZXIge1xuICAgIHBhZGRpbmc6IDBweCAwLjVyZW0gMHB4IDFyZW07XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLm1lc3NhZ2Utd3JhcHBlciB7XG4gICAgcGFkZGluZzogLjVyZW07XG4gICAgZmxleDogMTtcbn1cblxuLm1lc3NhZ2U6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgbWFyZ2luLWJvdHRvbTogLjJyZW07XG59XG5cbi5jb250cm9sLXdyYXBwZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5jb250cm9sLXdyYXBwZXIgaW5wdXQge1xuICAgIGZsZXg6IDE7XG4gICAgbWF4LXdpZHRoOiAzcmVtO1xufVxuIl19 */"]
});

/***/ }),

/***/ 25942:
/*!***********************************************************************************!*\
  !*** ./src/app/components/solution-preview/solution-preview-component.service.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SolutionPreviewComponentService": () => (/* binding */ SolutionPreviewComponentService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 19193);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 59151);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 86942);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 83910);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_services_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/data.service */ 52468);




class SolutionPreviewComponentService {
    constructor(dataService) {
        this.dataService = dataService;
        this.groups$ = this.dataService.currentSolution$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(x => x ? true : false), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(x => x.groups));
        this.goods$ = this.dataService.currentSolution$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(x => x ? true : false), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(x => x.container.goods));
    }
    nextSolution() {
        (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.combineLatest)([this.dataService.solutions$, this.dataService.currentSolution$]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.take)(1)).subscribe({
            next: ([solutions, currentSolution]) => {
                let index = solutions.indexOf(currentSolution);
                index = index === solutions.length - 1 ? 0 : index + 1;
                this.dataService.setCurrentSolution(solutions[index]);
            }
        });
    }
}
SolutionPreviewComponentService.ɵfac = function SolutionPreviewComponentService_Factory(t) { return new (t || SolutionPreviewComponentService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](src_app_services_data_service__WEBPACK_IMPORTED_MODULE_0__.DataService)); };
SolutionPreviewComponentService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: SolutionPreviewComponentService, factory: SolutionPreviewComponentService.ɵfac });


/***/ }),

/***/ 98067:
/*!***************************************************************************!*\
  !*** ./src/app/components/solution-preview/solution-preview.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SolutionPreviewComponent": () => (/* binding */ SolutionPreviewComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 59151);
/* harmony import */ var src_app_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/animations */ 54000);
/* harmony import */ var src_app_interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/interfaces */ 43780);
/* harmony import */ var _solution_preview_component_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./solution-preview-component.service */ 25942);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_services_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/data.service */ 52468);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/expansion */ 17591);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 84522);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/tooltip */ 6896);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 57822);
/* harmony import */ var _container_preview_container_preview_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../container-preview/container-preview.component */ 13599);
/* harmony import */ var _goods_panel_goods_panel_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../goods-panel/goods-panel.component */ 44611);
/* harmony import */ var _groups_panel_groups_panel_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../groups-panel/groups-panel.component */ 50982);
/* harmony import */ var _solution_animation_solution_animation_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../solution-animation/solution-animation.component */ 76774);
/* harmony import */ var _solution_validation_solution_validation_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../solution-validation/solution-validation.component */ 23846);


















function SolutionPreviewComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", "Berechnet: " + _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](2, 1, ctx_r0.calculated, "dd.MM.yyyy HH:mm") + " Uhr", " ");
  }
}

function SolutionPreviewComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", "Algorithmus: " + ctx_r1.algorithm, " ");
  }
}

class SolutionPreviewComponent {
  constructor(solutionPreviewComponentService, dataService) {
    this.solutionPreviewComponentService = solutionPreviewComponentService;
    this.dataService = dataService;
    this.headline = null;
    this.calculated = null;
    this.algorithm = null;
    this.container = null;
    this._subscriptions = [];

    this.downloadSolution = () => this.dataService.downloadCurrentSolution();
  }

  ngOnInit() {
    this._subscriptions.push(...[this.dataService.currentSolution$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.filter)(x => x ? true : false)).subscribe(solution => {
      this.headline = solution.description;
      this.calculated = solution.calculated;
      this.algorithm = solution.algorithm;
      this.container = solution.container;
    })]);
  }

  ngOnDestroy() {
    for (let sub of this._subscriptions) sub.unsubscribe();

    this._subscriptions = [];
  }

}

SolutionPreviewComponent.ɵfac = function SolutionPreviewComponent_Factory(t) {
  return new (t || SolutionPreviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_solution_preview_component_service__WEBPACK_IMPORTED_MODULE_2__.SolutionPreviewComponentService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_services_data_service__WEBPACK_IMPORTED_MODULE_3__.DataService));
};

SolutionPreviewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
  type: SolutionPreviewComponent,
  selectors: [["app-solution-preview"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵProvidersFeature"]([_solution_preview_component_service__WEBPACK_IMPORTED_MODULE_2__.SolutionPreviewComponentService, {
    provide: src_app_interfaces__WEBPACK_IMPORTED_MODULE_1__.GOODS_PROVIDER,
    useExisting: _solution_preview_component_service__WEBPACK_IMPORTED_MODULE_2__.SolutionPreviewComponentService
  }, {
    provide: src_app_interfaces__WEBPACK_IMPORTED_MODULE_1__.GROUPS_PROVIDER,
    useExisting: _solution_preview_component_service__WEBPACK_IMPORTED_MODULE_2__.SolutionPreviewComponentService
  }])],
  decls: 57,
  vars: 12,
  consts: [[1, "body"], [1, "panel-wrapper"], [1, "general-wrapper"], ["expanded", "true"], [1, "expansion-panel-headline"], [1, "general-inner"], [1, "metadata-wrapper"], [1, "metadata"], ["class", "calculated", 4, "ngIf"], ["class", "algorithm", 4, "ngIf"], [1, "next-solution-wrapper"], ["mat-icon-button", "", "matTooltip", "N\u00E4chste L\u00F6sung anzeigen", 3, "disabled", "click"], [1, "container-wrapper"], [3, "container"], [1, "goods-wrapper"], [1, "groups-wrapper"], [1, "animation-wrapper"], [1, "validator-wrapper"], [1, "footer"], [1, "control", "accent-2", 3, "click"], [1, "calculated"], [1, "algorithm"]],
  template: function SolutionPreviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "mat-expansion-panel", 3)(4, "mat-expansion-panel-header")(5, "mat-panel-title", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "mat-panel-description");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](8, " \u00DCbersicht ");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "div", 5)(10, "div", 6)(11, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](12, SolutionPreviewComponent_div_12_Template, 3, 4, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](13, SolutionPreviewComponent_div_13_Template, 2, 1, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "div", 10)(15, "button", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function SolutionPreviewComponent_Template_button_click_15_listener() {
        return ctx.solutionPreviewComponentService.nextSolution();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](16, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](18, "chevron_right");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](19, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](20, "app-container-preview", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](21, "div", 14)(22, "mat-expansion-panel")(23, "mat-expansion-panel-header")(24, "mat-panel-title", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](25, " G\u00FCter ");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](26, "mat-panel-description");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](27, " Einger\u00E4umte G\u00FCter ");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](28, "app-goods-panel");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](29, "div", 15)(30, "mat-expansion-panel")(31, "mat-expansion-panel-header")(32, "mat-panel-title", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](33, " Gruppen ");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](34, "mat-panel-description");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](35, " Vorgesehene Gruppen ");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](36, "app-groups-panel");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](37, "div", 16)(38, "mat-expansion-panel")(39, "mat-expansion-panel-header")(40, "mat-panel-title", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](41, " Animation ");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](42, "mat-panel-description");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](43, " Vorgehen animieren ");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](44, "app-solution-animation");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](45, "div", 17)(46, "mat-expansion-panel")(47, "mat-expansion-panel-header")(48, "mat-panel-title", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](49, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](50, " Validator ");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](51, "mat-panel-description");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](52, " L\u00F6sungsvalidierung ");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](53, "app-solution-validation");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](54, "div", 18)(55, "div", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function SolutionPreviewComponent_Template_div_click_55_listener() {
        return ctx.downloadSolution();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](56, " download ");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    }

    if (rf & 2) {
      let tmp_5_0;
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("@show", undefined);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", ctx.headline ? ctx.headline : "L\u00F6sung", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.calculated);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.algorithm);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("disabled", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](16, 8, ctx.dataService.solutions$).length < 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("container", ctx.container);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](28);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("error", ((tmp_5_0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](49, 10, ctx.dataService.currentSolutionValidation$)) == null ? null : tmp_5_0.length) > 0);
    }
  },
  directives: [_angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__.MatExpansionPanel, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__.MatExpansionPanelHeader, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__.MatExpansionPanelTitle, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__.MatExpansionPanelDescription, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButton, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__.MatTooltip, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _container_preview_container_preview_component__WEBPACK_IMPORTED_MODULE_4__.ContainerPreviewComponent, _goods_panel_goods_panel_component__WEBPACK_IMPORTED_MODULE_5__.GoodsPanelComponent, _groups_panel_groups_panel_component__WEBPACK_IMPORTED_MODULE_6__.GroupsPanelComponent, _solution_animation_solution_animation_component__WEBPACK_IMPORTED_MODULE_7__.SolutionAnimationComponent, _solution_validation_solution_validation_component__WEBPACK_IMPORTED_MODULE_8__.SolutionValidationComponent],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.DatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_12__.AsyncPipe],
  styles: [".body[_ngcontent-%COMP%] {\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    overflow-y: scroll;\n    background-color: #fbfbfb;\n    padding-bottom: 2rem;\n}\n\n.metadata-wrapper[_ngcontent-%COMP%] {\n    display: flex;\n}\n\n.metadata-wrapper[_ngcontent-%COMP%]   .metadata[_ngcontent-%COMP%] {\n    flex: 1;\n}\n\n.panel-wrapper[_ngcontent-%COMP%] {\n    flex: 1;\n    padding: 2rem 1rem;\n}\n\n.headline[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n}\n\n.goods-wrapper[_ngcontent-%COMP%], .groups-wrapper[_ngcontent-%COMP%], .validator-wrapper[_ngcontent-%COMP%], .animation-wrapper[_ngcontent-%COMP%] {\n    margin-top: 1rem;\n}\n\n.expansion-panel-headline[_ngcontent-%COMP%] {\n    font-weight: 500;\n    font-size: 1.2rem;\n}\n\n.expansion-panel-headline.error[_ngcontent-%COMP%] {\n    color: red;\n}\n\n.container-wrapper[_ngcontent-%COMP%] {\n    margin-top: 1rem;\n}\n\n.footer[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    flex-direction: column;\n    margin-bottom: 2rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvbHV0aW9uLXByZXZpZXcuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFlBQVk7SUFDWixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsb0JBQW9CO0FBQ3hCOztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtJQUNJLE9BQU87QUFDWDs7QUFFQTtJQUNJLE9BQU87SUFDUCxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksVUFBVTtBQUNkOztBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixzQkFBc0I7SUFDdEIsbUJBQW1CO0FBQ3ZCIiwiZmlsZSI6InNvbHV0aW9uLXByZXZpZXcuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ib2R5IHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmJmYmZiO1xuICAgIHBhZGRpbmctYm90dG9tOiAycmVtO1xufVxuXG4ubWV0YWRhdGEtd3JhcHBlciB7XG4gICAgZGlzcGxheTogZmxleDtcbn1cblxuLm1ldGFkYXRhLXdyYXBwZXIgLm1ldGFkYXRhIHtcbiAgICBmbGV4OiAxO1xufVxuXG4ucGFuZWwtd3JhcHBlciB7XG4gICAgZmxleDogMTtcbiAgICBwYWRkaW5nOiAycmVtIDFyZW07XG59XG5cbi5oZWFkbGluZSB7XG4gICAgZm9udC1zaXplOiAxLjVyZW07XG59XG5cbi5nb29kcy13cmFwcGVyLCAuZ3JvdXBzLXdyYXBwZXIsIC52YWxpZGF0b3Itd3JhcHBlciwgLmFuaW1hdGlvbi13cmFwcGVyIHtcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xufVxuXG4uZXhwYW5zaW9uLXBhbmVsLWhlYWRsaW5lIHtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xufVxuXG4uZXhwYW5zaW9uLXBhbmVsLWhlYWRsaW5lLmVycm9yIHtcbiAgICBjb2xvcjogcmVkO1xufVxuXG4uY29udGFpbmVyLXdyYXBwZXIge1xuICAgIG1hcmdpbi10b3A6IDFyZW07XG59XG5cbi5mb290ZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIG1hcmdpbi1ib3R0b206IDJyZW07XG59XG4iXX0= */"],
  data: {
    animation: [src_app_animations__WEBPACK_IMPORTED_MODULE_0__.showAnimation]
  }
});

/***/ }),

/***/ 23846:
/*!*********************************************************************************!*\
  !*** ./src/app/components/solution-validation/solution-validation.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SolutionValidationComponent": () => (/* binding */ SolutionValidationComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_services_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/data.service */ 52468);
/* harmony import */ var _main_visualizer_visualizer_component_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../main/visualizer/visualizer-component-service */ 7078);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 84522);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 57822);
/* harmony import */ var _pipes_solution_validation_error_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pipes/solution-validation-error.pipe */ 57293);








function SolutionValidationComponent_ng_container_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 4)(1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "solutionValidationError");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 6)(5, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("mouseenter", function SolutionValidationComponent_ng_container_1_div_1_Template_button_mouseenter_5_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6);
      const error_r4 = restoredCtx.$implicit;
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return ctx_r5.hoverError(error_r4);
    })("mouseleave", function SolutionValidationComponent_ng_container_1_div_1_Template_button_mouseleave_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return ctx_r7.mouseleave();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "search");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
  }

  if (rf & 2) {
    const error_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](3, 1, error_r4.error), " ");
  }
}

const _c0 = function () {
  return [];
};

function SolutionValidationComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, SolutionValidationComponent_ng_container_1_div_1_Template, 8, 3, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", (tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 1, ctx_r0.dataService.currentSolutionValidation$)) !== null && tmp_0_0 !== undefined ? tmp_0_0 : _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](3, _c0));
  }
}

function SolutionValidationComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Diese L\u00F6sung ist zul\u00E4ssig ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}

class SolutionValidationComponent {
  constructor(dataService, _visualizerComponentService) {
    this.dataService = dataService;
    this._visualizerComponentService = _visualizerComponentService;

    this.mouseleave = () => this._visualizerComponentService.reRenderCurrentContainer();
  }

  hoverError(error) {
    if (Array.isArray(error.effectedGoods)) this._visualizerComponentService.highlightGoods(error.effectedGoods);
  }

  ngOnInit() {}

}

SolutionValidationComponent.ɵfac = function SolutionValidationComponent_Factory(t) {
  return new (t || SolutionValidationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_data_service__WEBPACK_IMPORTED_MODULE_0__.DataService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_main_visualizer_visualizer_component_service__WEBPACK_IMPORTED_MODULE_1__.VisualizerComponentService));
};

SolutionValidationComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: SolutionValidationComponent,
  selectors: [["app-solution-validation"]],
  decls: 5,
  vars: 4,
  consts: [[1, "body"], [4, "ngIf", "ngIfElse"], ["noValidationErrors", ""], ["class", "error-wrapper", 4, "ngFor", "ngForOf"], [1, "error-wrapper"], [1, "error-title"], [1, "control"], ["color", "warn", "mat-icon-button", "", 3, "mouseenter", "mouseleave"], [1, "no-content-available"]],
  template: function SolutionValidationComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, SolutionValidationComponent_ng_container_1_Template, 3, 4, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, SolutionValidationComponent_ng_template_3_Template, 2, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
    }

    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](4);

      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 2, ctx.dataService.currentSolutionValidation$).length > 0)("ngIfElse", _r1);
    }
  },
  directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.AsyncPipe, _pipes_solution_validation_error_pipe__WEBPACK_IMPORTED_MODULE_2__.SolutionValidationErrorPipe],
  styles: [".error-wrapper[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n    background-color: #ffeaea;\n    padding: 0.5rem;\n    border-radius: 2px;\n    color: #980808;\n    font-size: .8rem;\n    line-height: 1.2rem;\n    display: flex;\n    align-items: center;\n}\n\n.error-wrapper[_ngcontent-%COMP%]    > .error-title[_ngcontent-%COMP%] {\n    margin-right: .5rem;\n    flex: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvbHV0aW9uLXZhbGlkYXRpb24uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLG1CQUFtQjtJQUNuQix5QkFBeUI7SUFDekIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2IsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLE9BQU87QUFDWCIsImZpbGUiOiJzb2x1dGlvbi12YWxpZGF0aW9uLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZXJyb3Itd3JhcHBlciB7XG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlYWVhO1xuICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgY29sb3I6ICM5ODA4MDg7XG4gICAgZm9udC1zaXplOiAuOHJlbTtcbiAgICBsaW5lLWhlaWdodDogMS4ycmVtO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmVycm9yLXdyYXBwZXIgPiAuZXJyb3ItdGl0bGUge1xuICAgIG1hcmdpbi1yaWdodDogLjVyZW07XG4gICAgZmxleDogMTtcbn1cbiJdfQ== */"]
});

/***/ }),

/***/ 37503:
/*!****************************!*\
  !*** ./src/app/globals.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ALGORITHMS": () => (/* binding */ ALGORITHMS),
/* harmony export */   "MinimizationFunction": () => (/* binding */ MinimizationFunction),
/* harmony export */   "SOLUTION_ERROR": () => (/* binding */ SOLUTION_ERROR),
/* harmony export */   "algorithms": () => (/* binding */ algorithms),
/* harmony export */   "compare": () => (/* binding */ compare),
/* harmony export */   "defaultGoodEdgeColor": () => (/* binding */ defaultGoodEdgeColor),
/* harmony export */   "generateGuid": () => (/* binding */ generateGuid),
/* harmony export */   "infinityReplacement": () => (/* binding */ infinityReplacement),
/* harmony export */   "keyboardControlMoveStep": () => (/* binding */ keyboardControlMoveStep),
/* harmony export */   "nameOf": () => (/* binding */ nameOf),
/* harmony export */   "nextUnitSize": () => (/* binding */ nextUnitSize),
/* harmony export */   "selectedGoodEdgeColor": () => (/* binding */ selectedGoodEdgeColor)
/* harmony export */ });
function generateGuid() {
    return 'axxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
var ALGORITHMS;
(function (ALGORITHMS) {
    ALGORITHMS[ALGORITHMS["ALL_IN_ONE_ROW"] = 0] = "ALL_IN_ONE_ROW";
    ALGORITHMS[ALGORITHMS["START_LEFT_BOTTOM"] = 1] = "START_LEFT_BOTTOM";
    ALGORITHMS[ALGORITHMS["SUPER_FLO"] = 2] = "SUPER_FLO";
    ALGORITHMS[ALGORITHMS["AI_SUPPORTED_SOLVER"] = 3] = "AI_SUPPORTED_SOLVER";
})(ALGORITHMS || (ALGORITHMS = {}));
var SOLUTION_ERROR;
(function (SOLUTION_ERROR) {
    SOLUTION_ERROR[SOLUTION_ERROR["NO_SOLUTION"] = 0] = "NO_SOLUTION";
    SOLUTION_ERROR[SOLUTION_ERROR["NO_CONTAINER"] = 1] = "NO_CONTAINER";
    SOLUTION_ERROR[SOLUTION_ERROR["GOOD_BEFORE_CONTAINER_X"] = 2] = "GOOD_BEFORE_CONTAINER_X";
    SOLUTION_ERROR[SOLUTION_ERROR["GOOD_OUT_OF_CONTAINER_X"] = 3] = "GOOD_OUT_OF_CONTAINER_X";
    SOLUTION_ERROR[SOLUTION_ERROR["GOOD_BEFORE_CONTAINER_Y"] = 4] = "GOOD_BEFORE_CONTAINER_Y";
    SOLUTION_ERROR[SOLUTION_ERROR["GOOD_OUT_OF_CONTAINER_Y"] = 5] = "GOOD_OUT_OF_CONTAINER_Y";
    SOLUTION_ERROR[SOLUTION_ERROR["GOOD_BEFORE_CONTAINER_Z"] = 6] = "GOOD_BEFORE_CONTAINER_Z";
    SOLUTION_ERROR[SOLUTION_ERROR["GOOD_OUT_OF_CONTAINER_Z"] = 7] = "GOOD_OUT_OF_CONTAINER_Z";
    SOLUTION_ERROR[SOLUTION_ERROR["GOOD_OVERLAP"] = 8] = "GOOD_OVERLAP";
})(SOLUTION_ERROR || (SOLUTION_ERROR = {}));
const algorithms = [
    {
        title: 'All In One Row',
        description: 'That algorithm takes all orders and puts each good in front of the previous one.',
        code: ALGORITHMS.ALL_IN_ONE_ROW
    },
    {
        title: 'Start Left Bottom',
        description: 'Dieser Algorithmus sortiert alle Güter entsprechend der vorgegebenen Sortierung, schiebt die Güter möglichst weit hinter und ermöglicht das Stapeln',
        code: ALGORITHMS.START_LEFT_BOTTOM
    },
    {
        title: 'Super-Flo',
        description: 'Dieser Algorithmus berechnet Lösungen mit Hilfe von zwischengespeicherten Räumen. Diese werden entsprechend definierter Minimierungsfunktionen für das Einräumen ausgewählt und anschließend in Teilfreiräume zerlegt.',
        code: ALGORITHMS.SUPER_FLO
    },
    {
        title: 'AI Supported Solver',
        description: 'Dieser Algorithmus berechnet Lösungen mit Hilfe von heuristischen und AI-basierten Ansätzen.',
        code: ALGORITHMS.AI_SUPPORTED_SOLVER
    }
];
function compare(a, b, isAsc = true) {
    if (!a)
        a = '';
    if (!b)
        b = '';
    if (typeof (a) === 'string')
        a = a.trim().toLocaleLowerCase();
    if (typeof (b) === 'string')
        b = b.trim().toLocaleLowerCase();
    let result = (a < b ? -1 : a > b ? 1 : 0) * (isAsc ? 1 : -1);
    return result;
}
const nameOf = (name) => name;
const nextUnitSize = [
    { unit: 'mm', next: 10, threshold: 1000 },
    { unit: 'cm', next: 10, threshold: 1000 },
    { unit: 'dm', next: 10, threshold: 1000 },
    { unit: 'm', next: 1000, threshold: 1000 },
    { unit: 'km', next: null, threshold: null },
];
const defaultGoodEdgeColor = '#2a2a2a';
const selectedGoodEdgeColor = '#ff7e00';
const keyboardControlMoveStep = 500;
var MinimizationFunction;
(function (MinimizationFunction) {
    MinimizationFunction[MinimizationFunction["MIN_X"] = 0] = "MIN_X";
    MinimizationFunction[MinimizationFunction["MIN_Y"] = 1] = "MIN_Y";
    MinimizationFunction[MinimizationFunction["MIN_Z"] = 2] = "MIN_Z";
    MinimizationFunction[MinimizationFunction["MIN_VOLUME"] = 3] = "MIN_VOLUME";
})(MinimizationFunction || (MinimizationFunction = {}));
const infinityReplacement = 100;


/***/ }),

/***/ 43780:
/*!*******************************!*\
  !*** ./src/app/interfaces.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GOODS_PROVIDER": () => (/* binding */ GOODS_PROVIDER),
/* harmony export */   "GROUPS_PROVIDER": () => (/* binding */ GROUPS_PROVIDER)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 22560);

const GOODS_PROVIDER = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('GOODS_PROVIDER');
const GROUPS_PROVIDER = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('GROUPS_PROVIDER');


/***/ }),

/***/ 14045:
/*!*************************************************!*\
  !*** ./src/app/pipes/calculation-error.pipe.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CalculationErrorPipe": () => (/* binding */ CalculationErrorPipe)
/* harmony export */ });
/* harmony import */ var _components_main_calculation_calculation_component_classes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/main/calculation/calculation-component.classes */ 4908);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);


class CalculationErrorPipe {
    transform(code) {
        switch (code) {
            case _components_main_calculation_calculation_component_classes__WEBPACK_IMPORTED_MODULE_0__.CALCULATION_ERROR.CONTAINER_NOT_READY:
                return 'Der Container ist nicht bereit für die Berechnung: es müssen Höhe und Breite angegeben werden und größer als 0 sein.';
            case _components_main_calculation_calculation_component_classes__WEBPACK_IMPORTED_MODULE_0__.CALCULATION_ERROR.ALGORITHM_NOT_IMPLEMENTED:
                return 'Der Algorithmus ist momentan nicht verfügbar.';
            default:
                return `Unbekannter Fehler (Code: ${code})`;
        }
    }
}
CalculationErrorPipe.ɵfac = function CalculationErrorPipe_Factory(t) { return new (t || CalculationErrorPipe)(); };
CalculationErrorPipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({ name: "calculationError", type: CalculationErrorPipe, pure: true });


/***/ }),

/***/ 1399:
/*!*********************************************!*\
  !*** ./src/app/pipes/pretty-length.pipe.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrettyLengthPipe": () => (/* binding */ PrettyLengthPipe)
/* harmony export */ });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ 37503);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/data.service */ 52468);



class PrettyLengthPipe {
    constructor(_dataService) {
        this._dataService = _dataService;
    }
    transform(value) {
        let converted = value;
        let unit = this._dataService.unit;
        let index = _globals__WEBPACK_IMPORTED_MODULE_0__.nextUnitSize.findIndex(x => x.unit === unit);
        while (converted > _globals__WEBPACK_IMPORTED_MODULE_0__.nextUnitSize[index].threshold) {
            converted = converted / _globals__WEBPACK_IMPORTED_MODULE_0__.nextUnitSize[index].next;
            index++;
            unit = _globals__WEBPACK_IMPORTED_MODULE_0__.nextUnitSize[index].unit;
        }
        return `${converted.toFixed(2)} ${unit}`;
    }
}
PrettyLengthPipe.ɵfac = function PrettyLengthPipe_Factory(t) { return new (t || PrettyLengthPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_data_service__WEBPACK_IMPORTED_MODULE_1__.DataService, 16)); };
PrettyLengthPipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefinePipe"]({ name: "prettyLength", type: PrettyLengthPipe, pure: true });


/***/ }),

/***/ 51285:
/*!*********************************************!*\
  !*** ./src/app/pipes/pretty-volume.pipe.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrettyVolumePipe": () => (/* binding */ PrettyVolumePipe)
/* harmony export */ });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ 37503);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/data.service */ 52468);



class PrettyVolumePipe {
    constructor(_dataService) {
        this._dataService = _dataService;
    }
    transform(value, prettify = true) {
        let unit = this._dataService.unit;
        if (!prettify)
            return `${value} ${unit}³`;
        let converted = value;
        let index = _globals__WEBPACK_IMPORTED_MODULE_0__.nextUnitSize.findIndex(x => x.unit === unit);
        while (converted > _globals__WEBPACK_IMPORTED_MODULE_0__.nextUnitSize[index].threshold) {
            converted = converted / (Math.pow(_globals__WEBPACK_IMPORTED_MODULE_0__.nextUnitSize[index].next, 3));
            index++;
            unit = _globals__WEBPACK_IMPORTED_MODULE_0__.nextUnitSize[index].unit;
        }
        return `${converted.toFixed(2)} ${unit}³`;
    }
}
PrettyVolumePipe.ɵfac = function PrettyVolumePipe_Factory(t) { return new (t || PrettyVolumePipe)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_data_service__WEBPACK_IMPORTED_MODULE_1__.DataService, 16)); };
PrettyVolumePipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefinePipe"]({ name: "prettyVolume", type: PrettyVolumePipe, pure: true });


/***/ }),

/***/ 57293:
/*!*********************************************************!*\
  !*** ./src/app/pipes/solution-validation-error.pipe.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SolutionValidationErrorPipe": () => (/* binding */ SolutionValidationErrorPipe)
/* harmony export */ });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ 37503);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);


class SolutionValidationErrorPipe {
    transform(errorCode) {
        switch (errorCode) {
            case _globals__WEBPACK_IMPORTED_MODULE_0__.SOLUTION_ERROR.NO_SOLUTION:
                return 'Keine Lösung';
            case _globals__WEBPACK_IMPORTED_MODULE_0__.SOLUTION_ERROR.NO_CONTAINER:
                return 'Lösung ohne Container';
            case _globals__WEBPACK_IMPORTED_MODULE_0__.SOLUTION_ERROR.GOOD_BEFORE_CONTAINER_X:
                return 'Lösung enthält Güter, welche neben dem Container beginnen';
            case _globals__WEBPACK_IMPORTED_MODULE_0__.SOLUTION_ERROR.GOOD_OUT_OF_CONTAINER_X:
                return 'Lösung enthält Güter, welche über die Breite des Containers hinausragen';
            case _globals__WEBPACK_IMPORTED_MODULE_0__.SOLUTION_ERROR.GOOD_BEFORE_CONTAINER_Y:
                return 'Lösung enthält Güter, welche unter dem Container beginnen';
            case _globals__WEBPACK_IMPORTED_MODULE_0__.SOLUTION_ERROR.GOOD_OUT_OF_CONTAINER_Y:
                return 'Lösung enthält Güter, welche über die Höhe des Containers hinausragen';
            case _globals__WEBPACK_IMPORTED_MODULE_0__.SOLUTION_ERROR.GOOD_BEFORE_CONTAINER_Z:
                return 'Lösung enthält Güter, welche hinter dem Container beginnen';
            case _globals__WEBPACK_IMPORTED_MODULE_0__.SOLUTION_ERROR.GOOD_OUT_OF_CONTAINER_Z:
                return 'Lösung enthält Güter, welche über die Länge des Containers hinausragen';
            case _globals__WEBPACK_IMPORTED_MODULE_0__.SOLUTION_ERROR.GOOD_OVERLAP:
                return 'Gut überlappt sich mit einem anderen Gut';
        }
    }
}
SolutionValidationErrorPipe.ɵfac = function SolutionValidationErrorPipe_Factory(t) { return new (t || SolutionValidationErrorPipe)(); };
SolutionValidationErrorPipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({ name: "solutionValidationError", type: SolutionValidationErrorPipe, pure: true });


/***/ }),

/***/ 1662:
/*!*************************************************!*\
  !*** ./src/app/pipes/sorted-form-array.pipe.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SortedFormArrayPipe": () => (/* binding */ SortedFormArrayPipe)
/* harmony export */ });
/* harmony import */ var src_app_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/globals */ 37503);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);


class SortedFormArrayPipe {
    transform(value, active, direction, counter) {
        let output = [];
        var index = 0;
        let sequence = value
            .map((value, index) => { return { index: index, value: value.value[active] }; })
            .sort((a, b) => (0,src_app_globals__WEBPACK_IMPORTED_MODULE_0__.compare)(a.value, b.value, direction === 'asc'));
        for (let entry of sequence) {
            output.push({ key: index, value: value[entry.index] });
            index++;
        }
        return output;
    }
}
SortedFormArrayPipe.ɵfac = function SortedFormArrayPipe_Factory(t) { return new (t || SortedFormArrayPipe)(); };
SortedFormArrayPipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({ name: "sortedFormArray", type: SortedFormArrayPipe, pure: true });


/***/ }),

/***/ 49697:
/*!*****************************************!*\
  !*** ./src/app/services/csv.service.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CsvService": () => (/* binding */ CsvService)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 56908);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 19193);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 92218);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 83910);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 59151);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 59095);
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes */ 65444);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../globals */ 37503);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data.service */ 52468);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ 58987);








class CsvService {
    constructor(_dataService, _httpClient) {
        this._dataService = _dataService;
        this._httpClient = _httpClient;
        this.headers = ['Order', 'Description', 'Quantity', 'Length', 'Width', 'Height', 'TurningAllowed', 'StackingAllowed', 'Group', 'GroupName'];
        this.headerOrderMap = {
            'Order': (0,_globals__WEBPACK_IMPORTED_MODULE_2__.nameOf)('orderId'),
            'Description': (0,_globals__WEBPACK_IMPORTED_MODULE_2__.nameOf)('description'),
            'Quantity': (0,_globals__WEBPACK_IMPORTED_MODULE_2__.nameOf)('quantity'),
            'Length': (0,_globals__WEBPACK_IMPORTED_MODULE_2__.nameOf)('length'),
            'Width': (0,_globals__WEBPACK_IMPORTED_MODULE_2__.nameOf)('width'),
            'Height': (0,_globals__WEBPACK_IMPORTED_MODULE_2__.nameOf)('height'),
            'TurningAllowed': (0,_globals__WEBPACK_IMPORTED_MODULE_2__.nameOf)('turningAllowed'),
            'StackingAllowed': (0,_globals__WEBPACK_IMPORTED_MODULE_2__.nameOf)('stackingAllowed'),
            'Group': (0,_globals__WEBPACK_IMPORTED_MODULE_2__.nameOf)('group'),
            'GroupName': (order) => this._dataService.groups.find(x => x.id === order.group)?.desc
        };
    }
    downloadOrderCollectionToCSV() {
        this._dataService.containerValid$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.filter)(x => x ? true : false), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.switchMap)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.combineLatest)([this._dataService.containerHeight$, this._dataService.containerWidth$, this._dataService.unit$, this._dataService.orders$]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.take)(1))))
            .subscribe(([height, width, unit, orders]) => {
            let colCount = this.headers.length;
            let csv = ['', '', this.headers.join(',')];
            for (let i = 0; i < colCount; i++) {
                csv[0] += i === 0 ? 'ContainerWidth' : i === 1 ? 'ContainerHeight' : i === 2 ? 'Unit' : '';
                csv[1] += i === 0 ? width : i === 1 ? height : i === 2 ? unit : '';
                if (i < (colCount - 1)) {
                    csv[0] += ',';
                    csv[1] += ',';
                }
            }
            for (let order of orders)
                csv.push(this.headers.map(x => {
                    if (typeof this.headerOrderMap[x] === 'string')
                        return order[this.headerOrderMap[x]];
                    else if (typeof this.headerOrderMap[x] === 'function')
                        return this.headerOrderMap[x](order);
                    return '';
                }).join(','));
            let final = csv.join('\n');
            var element = document.createElement('a');
            element.setAttribute('href', `data:text/csv;charset=UTF-8,${encodeURIComponent(final)}`);
            element.setAttribute('download', `orders_${moment__WEBPACK_IMPORTED_MODULE_0__().format('YYYY_MM_DD_HH_mm')}.csv`);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        });
    }
    uploadCSVToOrderCollection(event) {
        let files = event.target.files;
        if (files.length === 0)
            return;
        this._fileToString(files[0]).subscribe((result) => this._importCSVToOrderCollection(result));
    }
    uploadDefaultOrders() {
        let subject = new rxjs__WEBPACK_IMPORTED_MODULE_8__.Subject();
        this._httpClient.get('./assets/exampleOrders.csv', {
            responseType: 'text'
        }).subscribe((csv) => {
            this._importCSVToOrderCollection(csv);
            subject.next(csv);
            subject.complete();
        }, (error) => subject.error(error));
        return subject.asObservable();
    }
    _fileToString(file) {
        let subject = new rxjs__WEBPACK_IMPORTED_MODULE_8__.Subject();
        var reader = new FileReader();
        reader.onload = () => {
            subject.next(reader.result);
            subject.complete();
        };
        reader.readAsText(file);
        return subject.asObservable();
    }
    _importCSVToOrderCollection(csvString) {
        try {
            let rows = csvString.split('\n');
            let containerRow = rows[1].split(',');
            this._dataService.setContainerWidth(parseFloat(containerRow[0]));
            this._dataService.setContainerHeight(parseFloat(containerRow[1]));
            this._dataService.setUnit(containerRow[2] ?? 'mm');
            let properties = [];
            for (let column of rows[2].split(','))
                properties.push(this.headerOrderMap[column]);
            let orders = [];
            let groups = [];
            for (let row of rows.splice(3)) {
                let order = new _classes__WEBPACK_IMPORTED_MODULE_1__.Order();
                properties.filter(x => typeof x === 'string').forEach((property, index) => {
                    let converted = row.split(',')[index];
                    if ([(0,_globals__WEBPACK_IMPORTED_MODULE_2__.nameOf)('height'), (0,_globals__WEBPACK_IMPORTED_MODULE_2__.nameOf)('width'), (0,_globals__WEBPACK_IMPORTED_MODULE_2__.nameOf)('length'), (0,_globals__WEBPACK_IMPORTED_MODULE_2__.nameOf)('orderId'), (0,_globals__WEBPACK_IMPORTED_MODULE_2__.nameOf)('quantity')].indexOf(property) > -1)
                        converted = parseFloat(converted);
                    else if ((0,_globals__WEBPACK_IMPORTED_MODULE_2__.nameOf)('group') === property) {
                        converted = parseInt(converted);
                        if (groups.findIndex(x => x.id === converted) === -1) {
                            groups.push({
                                id: converted,
                                color: null,
                                desc: row.split(',')[rows[2].split(',').indexOf('GroupName')]
                            });
                        }
                    }
                    else if ([(0,_globals__WEBPACK_IMPORTED_MODULE_2__.nameOf)('stackingAllowed'), (0,_globals__WEBPACK_IMPORTED_MODULE_2__.nameOf)('turningAllowed')].indexOf(property) > -1)
                        converted = converted === 'true';
                    order[property] = converted;
                });
                orders.push(order);
            }
            this._dataService.addGroups(groups);
            this._dataService.addProducts(orders.filter((x, index) => orders.findIndex(y => y.description === x.description) === index).map(x => {
                return {
                    description: x.description,
                    height: x.height,
                    length: x.length,
                    width: x.width
                };
            }));
            this._dataService.setOrders(orders);
        }
        catch (e) {
            console.error(e);
        }
    }
}
CsvService.ɵfac = function CsvService_Factory(t) { return new (t || CsvService)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_data_service__WEBPACK_IMPORTED_MODULE_3__.DataService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClient)); };
CsvService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjectable"]({ token: CsvService, factory: CsvService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 52468:
/*!******************************************!*\
  !*** ./src/app/services/data.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataService": () => (/* binding */ DataService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 84505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 19193);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 92218);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 53298);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 86942);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 59151);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 83910);
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes */ 65444);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../globals */ 37503);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _solution_validation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./solution-validation.service */ 50156);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ 58987);







class DataService {
    constructor(_solutionValidationService, _httpClient) {
        this._solutionValidationService = _solutionValidationService;
        this._httpClient = _httpClient;
        this._currentSolution = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(null);
        this.currentSolution$ = this._currentSolution.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)());
        this.currentSolutionValidation$ = this.currentSolution$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(solution => this._solutionValidationService.validateSolution(solution)));
        this.currentContainer$ = this.currentSolution$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(x => x.container));
        this.currentGroups$ = this._currentSolution.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(x => x.groups));
        this.currentSolutionAvailable$ = this._currentSolution.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(x => x ? true : false));
        this.currentSteps$ = this.currentSolution$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.filter)(x => x ? true : false), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((solution) => solution.steps));
        this._groups = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject([]);
        this.groups$ = this._groups.asObservable();
        this.ascSortedGroups$ = this.groups$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((groups) => groups.sort((a, b) => (0,_globals__WEBPACK_IMPORTED_MODULE_1__.compare)(a.id, b.id, true))));
        this.descSortedGroups$ = this.groups$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((groups) => groups.sort((a, b) => (0,_globals__WEBPACK_IMPORTED_MODULE_1__.compare)(a.id, b.id, false))));
        this._orders = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject([]);
        this.orders$ = this._orders.asObservable();
        this._containerWidth = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(null);
        this._containerHeight = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(null);
        this.containerWidth$ = this._containerWidth.asObservable();
        this.containerHeight$ = this._containerHeight.asObservable();
        this.containerValid$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.combineLatest)([this.containerHeight$, this.containerWidth$]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(([height, width]) => typeof height === 'number' && typeof width === 'number' && height > 0 && width > 0));
        this._products = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject([]);
        this.products$ = this._products.asObservable();
        this._solutions = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject([]);
        this.solutions$ = this._solutions.asObservable();
        this._unit = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject('mm');
        this.unit$ = this._unit.asObservable();
        this.addProduct = (product) => this._products.next([...this._products.value, product]);
        this.addProducts = (products) => this._products.next([...this._products.value, ...products]);
        this.setContainerHeight = (height) => this._containerHeight.next(height);
        this.setContainerWidth = (width) => this._containerWidth.next(width);
        this.setUnit = (unit) => this._unit.next(unit);
        this._setUp();
    }
    get groups() {
        return this._groups.value;
    }
    get unit() {
        return this._unit.value;
    }
    addGroup(group) {
        let existing = this._groups.value;
        if (existing.findIndex(x => x.desc === group.desc) > -1)
            return;
        if (typeof group.id !== 'number' || existing.findIndex(x => x.id === group.id) > -1)
            group.id = Math.max(...existing.map(x => x.id), 0) + 1;
        this._groups.next([...existing, group]);
    }
    addGroups(groups) {
        let existing = this._groups.value;
        groups = groups.filter(x => existing.findIndex(y => y.desc === x.desc) === -1);
        for (let group of groups) {
            if (typeof group.id !== 'number' || existing.findIndex(x => x.id === group.id) > -1)
                group.id = Math.max(...existing.map(x => x.id), 0) + 1;
        }
        this._groups.next([...existing, ...groups]);
    }
    downloadCurrentSolution() {
        this._currentSolution.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.take)(1)).subscribe((solution) => {
            var sJson = JSON.stringify(solution);
            var element = document.createElement('a');
            element.setAttribute('href', `data:text/json;charset=UTF-8,${encodeURIComponent(sJson)}`);
            element.setAttribute('download', `${solution.description}.json`);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        });
    }
    getSolutionByAlgorithm(algorithm) {
        return this._solutions.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(x => x.find(y => y.algorithm === algorithm)));
    }
    loadDefaultSolution() {
        let subject = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
        this._httpClient.get('./assets/exampleSolution.json')
            .subscribe((solution) => {
            this.setCurrentSolution(solution);
            subject.next(solution);
            subject.complete();
        }, (error) => subject.error(error));
        return subject.asObservable();
    }
    setCurrentSolution(solution) {
        if (this._solutions.value.findIndex(x => x.id === solution.id) === -1)
            this._solutions.next([...this._solutions.value, solution]);
        this._currentSolution.next(solution);
        this.addGroups(solution.groups);
    }
    setOrders(orders) {
        this._orders.next(orders);
    }
    static getContainerDimension(container) {
        let dimension = new _classes__WEBPACK_IMPORTED_MODULE_0__.Dimension(container.width, container.height, container.length);
        dimension.x = 0;
        dimension.y = 0;
        dimension.z = 0;
        return dimension;
    }
    static getGoodDimension(good) {
        let dimension = new _classes__WEBPACK_IMPORTED_MODULE_0__.Dimension(good.width, good.height, good.length);
        dimension.x = good.x;
        dimension.y = good.y;
        dimension.z = good.z;
        return dimension;
    }
    _setUp() {
        this.orders$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)()).subscribe((orders) => {
            this._solutions.next([]);
            this._currentSolution.next(null);
        });
    }
}
DataService.ɵfac = function DataService_Factory(t) { return new (t || DataService)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_solution_validation_service__WEBPACK_IMPORTED_MODULE_2__.SolutionValidationService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClient)); };
DataService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjectable"]({ token: DataService, factory: DataService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 50156:
/*!*********************************************************!*\
  !*** ./src/app/services/solution-validation.service.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SolutionValidationService": () => (/* binding */ SolutionValidationService)
/* harmony export */ });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ 37503);
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data.service */ 52468);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);



class SolutionValidationService {
    constructor() { }
    validateSolution(solution) {
        if (solution === null)
            return [{ error: _globals__WEBPACK_IMPORTED_MODULE_0__.SOLUTION_ERROR.NO_SOLUTION, effectedGoods: [] }];
        if (solution.container === null)
            return [{ error: _globals__WEBPACK_IMPORTED_MODULE_0__.SOLUTION_ERROR.NO_CONTAINER, effectedGoods: [] }];
        let output = [];
        let goodsXError1 = solution.container.goods.filter(x => x.x < 0);
        if (goodsXError1.length > 0)
            output.push({ error: _globals__WEBPACK_IMPORTED_MODULE_0__.SOLUTION_ERROR.GOOD_BEFORE_CONTAINER_X, effectedGoods: goodsXError1 });
        let goodsXError2 = solution.container.goods.filter(x => (x.x + x.width) > solution.container.width);
        if (goodsXError2.length > 0)
            output.push({ error: _globals__WEBPACK_IMPORTED_MODULE_0__.SOLUTION_ERROR.GOOD_OUT_OF_CONTAINER_X, effectedGoods: goodsXError2 });
        let goodsYError1 = solution.container.goods.filter(x => x.y < 0);
        if (goodsYError1.length > 0)
            output.push({ error: _globals__WEBPACK_IMPORTED_MODULE_0__.SOLUTION_ERROR.GOOD_BEFORE_CONTAINER_Y, effectedGoods: goodsYError1 });
        let goodsYError2 = solution.container.goods.filter(x => (x.y + x.height) > solution.container.height);
        if (goodsYError2.length > 0)
            output.push({ error: _globals__WEBPACK_IMPORTED_MODULE_0__.SOLUTION_ERROR.GOOD_OUT_OF_CONTAINER_Y, effectedGoods: goodsYError2 });
        let goodsZError1 = solution.container.goods.filter(x => x.z < 0);
        if (goodsZError1.length > 0)
            output.push({ error: _globals__WEBPACK_IMPORTED_MODULE_0__.SOLUTION_ERROR.GOOD_BEFORE_CONTAINER_Z, effectedGoods: goodsZError1 });
        let goodsZError2 = solution.container.goods.filter(x => (x.z + x.length) > solution.container.length);
        if (goodsZError2.length > 0)
            output.push({ error: _globals__WEBPACK_IMPORTED_MODULE_0__.SOLUTION_ERROR.GOOD_OUT_OF_CONTAINER_Z, effectedGoods: goodsZError2 });
        let dimensions = solution.container.goods.map(x => {
            return { good: x, dimension: _data_service__WEBPACK_IMPORTED_MODULE_1__.DataService.getGoodDimension(x) };
        });
        for (let wrapper of dimensions) {
            let overlappingSet = this._cubeIsInAnotherCube(wrapper.dimension, Object.values(dimensions).map(x => x.dimension).filter(x => wrapper.dimension !== x));
            if (overlappingSet.length > 0) {
                output.push({ error: _globals__WEBPACK_IMPORTED_MODULE_0__.SOLUTION_ERROR.GOOD_OVERLAP, effectedGoods: [wrapper.good, ...(overlappingSet.map(x => (dimensions.find(y => y.dimension === x)).good))] });
            }
        }
        return output;
    }
    _cubeIsInAnotherCube(cube, cubeSet) {
        return cubeSet.filter(x => this._cubeIsInCube(cube, x));
    }
    _cubeIsInCube(cube1, cube2) {
        let c1 = (cube1.x + cube1.width) <= cube2.x;
        let c2 = (cube2.x + cube2.width) <= cube1.x;
        let c3 = (cube1.y + cube1.height) <= cube2.y;
        let c4 = (cube2.y + cube2.height) <= cube1.y;
        let c5 = (cube1.z + cube1.length) <= cube2.z;
        let c6 = (cube2.z + cube2.length) <= cube1.z;
        return !c1 && !c2 && !c3 && !c4 && !c5 && !c6;
    }
}
SolutionValidationService.ɵfac = function SolutionValidationService_Factory(t) { return new (t || SolutionValidationService)(); };
SolutionValidationService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: SolutionValidationService, factory: SolutionValidationService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 11106:
/*!*******************************************!*\
  !*** ./src/app/solvers/all-in-one-row.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AllInOneRowSolver": () => (/* binding */ AllInOneRowSolver)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 66587);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 61555);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 19193);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 59095);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 83910);
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes */ 65444);
/* harmony import */ var _components_main_calculation_calculation_component_classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/main/calculation/calculation-component.classes */ 4908);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../globals */ 37503);
/* harmony import */ var _solver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./solver */ 78132);






class AllInOneRowSolver extends _solver__WEBPACK_IMPORTED_MODULE_3__.Solver {
    constructor(_dataService, _description = 'All In One Row') {
        super();
        this._dataService = _dataService;
        this._description = _description;
    }
    solve() {
        return this._dataService.containerValid$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.switchMap)((valid) => {
            if (!valid)
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(_components_main_calculation_calculation_component_classes__WEBPACK_IMPORTED_MODULE_1__.CALCULATION_ERROR.CONTAINER_NOT_READY);
            let subject = new rxjs__WEBPACK_IMPORTED_MODULE_6__.ReplaySubject(1);
            (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.combineLatest)([this._dataService.orders$, this._dataService.containerHeight$, this._dataService.containerWidth$, this._dataService.descSortedGroups$])
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.take)(1))
                .subscribe(([orders, height, width, groups]) => {
                let solution = new _classes__WEBPACK_IMPORTED_MODULE_0__.Solution((0,_globals__WEBPACK_IMPORTED_MODULE_2__.generateGuid)(), this._description);
                solution.container = new _classes__WEBPACK_IMPORTED_MODULE_0__.Container(height, width, 0);
                let currentPosition = { x: 0, y: 0, z: 0 };
                let sequenceNumber = 0;
                for (let group of groups) {
                    for (let order of orders.filter(x => x.group === group.id)) {
                        for (let i = 0; i < order.quantity; i++) {
                            let good = new _classes__WEBPACK_IMPORTED_MODULE_0__.Good(sequenceNumber + 1, currentPosition.x, currentPosition.y, currentPosition.z, sequenceNumber, order.description);
                            good.setOrderDimensions(order);
                            solution.container.goods.push(good);
                            sequenceNumber++;
                            currentPosition.z += order.length;
                            solution.container.length += order.length;
                        }
                    }
                }
                solution.groups = groups;
                this._dataService.setCurrentSolution(solution);
                subject.next(solution);
                subject.complete();
            });
            return subject.asObservable();
        }));
    }
}


/***/ }),

/***/ 78132:
/*!***********************************!*\
  !*** ./src/app/solvers/solver.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Solver": () => (/* binding */ Solver)
/* harmony export */ });
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes */ 65444);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../globals */ 37503);


class Solver {
    constructor() {
        this._minimizationFunctions = {};
        this._minimizationFunctions[_globals__WEBPACK_IMPORTED_MODULE_1__.MinimizationFunction.MIN_VOLUME] = (space) => space.height * space.length * space.width;
        this._minimizationFunctions[_globals__WEBPACK_IMPORTED_MODULE_1__.MinimizationFunction.MIN_X] = (space) => space.x;
        this._minimizationFunctions[_globals__WEBPACK_IMPORTED_MODULE_1__.MinimizationFunction.MIN_Y] = (space) => space.y;
        this._minimizationFunctions[_globals__WEBPACK_IMPORTED_MODULE_1__.MinimizationFunction.MIN_Z] = (space) => space.z;
    }
    canPlaceOrderIntoSpace(order, space) {
        return {
            notTurned: space.width >= order.width && space.length >= order.length && space.height >= order.height,
            turned: space.width >= order.length && space.length >= order.width && space.height >= order.height,
        };
    }
    combineSpaces(unusedDimensions) {
        let x = Math.min(...unusedDimensions.map(x => x.x));
        let y = Math.min(...unusedDimensions.map(x => x.y));
        let z = Math.min(...unusedDimensions.map(x => x.z));
        let r = Math.max(...unusedDimensions.map(x => x.r));
        let t = Math.max(...unusedDimensions.map(x => x.t));
        let f = Math.max(...unusedDimensions.map(x => x.f));
        let dimension = new _classes__WEBPACK_IMPORTED_MODULE_0__.UnusedDimension(r - x, t - y, f - z, null, null); // TODO
        dimension.setPosition(x, y, z);
        return dimension;
    }
    getBestUnusedDimensionsForMinimizationFunction(unusedDimensions, minimizationFunction) {
        if (unusedDimensions.length === 0)
            return null;
        if (unusedDimensions.length === 1)
            return unusedDimensions[0];
        return unusedDimensions.reduce((prev, curr) => {
            return this._minimizationFunctions[minimizationFunction](prev) < this._minimizationFunctions[minimizationFunction](curr) ? prev : curr;
        });
    }
    getCombinableSpacePairs(unusedDimensions, returnFirstOnly = false) {
        let output = [];
        for (let unusedDimension of unusedDimensions) {
            let result = [unusedDimension, ...unusedDimensions.filter((x) => x === unusedDimension ? false : this._unusedDimensionsShare4Points(unusedDimension, x))];
            if (result.length > 1) {
                output.push(result);
                if (returnFirstOnly)
                    break;
            }
        }
        return output;
    }
    putOrderAndCreateUnusedDimensions(order, unusedDimension) {
        let unusedDimensions = [];
        if (order.height < unusedDimension.height) {
            let above = new _classes__WEBPACK_IMPORTED_MODULE_0__.UnusedDimension(order.width, unusedDimension.height - order.height, order.length);
            above.setPosition(unusedDimension.x, unusedDimension.y + order.height, unusedDimension.z);
            unusedDimensions.push(above);
        }
        if (order.width < unusedDimension.width) {
            let next = new _classes__WEBPACK_IMPORTED_MODULE_0__.UnusedDimension(unusedDimension.width - order.width, unusedDimension.height, order.length);
            next.setPosition(unusedDimension.x + order.width, unusedDimension.y, unusedDimension.z);
            unusedDimensions.push(next);
        }
        if (order.length < unusedDimension.length) {
            let infront = new _classes__WEBPACK_IMPORTED_MODULE_0__.UnusedDimension(unusedDimension.width, unusedDimension.height, unusedDimension.length - order.length);
            infront.setPosition(unusedDimension.x, unusedDimension.y, unusedDimension.z + order.length);
            unusedDimensions.push(infront);
        }
        return unusedDimensions;
    }
    _unusedDimensionsShare4Points(dim1, dim2) {
        let result = dim1.points.filter(p1 => dim2.points.findIndex(p2 => p1.x === p2.x && p1.y === p2.y && p1.z === p2.z) > -1);
        return result.length === 4;
    }
}


/***/ }),

/***/ 48377:
/*!**********************************************!*\
  !*** ./src/app/solvers/start-left-bottom.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StartLeftBottomSolver": () => (/* binding */ StartLeftBottomSolver)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 66587);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 61555);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 19193);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 59095);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 83910);
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes */ 65444);
/* harmony import */ var _components_main_calculation_calculation_component_classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/main/calculation/calculation-component.classes */ 4908);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../globals */ 37503);
/* harmony import */ var _solver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./solver */ 78132);






class StartLeftBottomSolver extends _solver__WEBPACK_IMPORTED_MODULE_3__.Solver {
    constructor(_dataService, _description = 'All In One Row') {
        super();
        this._dataService = _dataService;
        this._description = _description;
    }
    solve() {
        return this._dataService.containerValid$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.switchMap)((valid) => {
            if (!valid)
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(_components_main_calculation_calculation_component_classes__WEBPACK_IMPORTED_MODULE_1__.CALCULATION_ERROR.CONTAINER_NOT_READY);
            let subject = new rxjs__WEBPACK_IMPORTED_MODULE_6__.ReplaySubject(1);
            (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.combineLatest)([this._dataService.orders$, this._dataService.containerHeight$, this._dataService.containerWidth$, this._dataService.descSortedGroups$])
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.take)(1))
                .subscribe(([orders, height, width, groups]) => {
                let solution = new _classes__WEBPACK_IMPORTED_MODULE_0__.Solution((0,_globals__WEBPACK_IMPORTED_MODULE_2__.generateGuid)(), this._description);
                solution.container = new _classes__WEBPACK_IMPORTED_MODULE_0__.Container(height, width, 0);
                let sequenceNumber = 0, lastGood = null;
                for (let group of groups) {
                    let currentOrders = orders.filter(x => x.group === group.id).sort((a, b) => (0,_globals__WEBPACK_IMPORTED_MODULE_2__.compare)(a.length, b.length, false));
                    for (let order of currentOrders) {
                        for (let index = 0; index < order.quantity; index++) {
                            let position = lastGood === null ? { x: 0, y: 0, z: 0, stackedOn: null } : this._getNextPosition(solution.container, order, lastGood);
                            lastGood = new _classes__WEBPACK_IMPORTED_MODULE_0__.Good(sequenceNumber + 1, position.x, position.y, position.z, sequenceNumber, order.description);
                            lastGood.setOrderDimensions(order);
                            lastGood.stackedOnGood = position.stackedOn;
                            lastGood.turned = false;
                            solution.container.goods.push(lastGood);
                            sequenceNumber++;
                        }
                    }
                }
                solution.container.length = Math.max(...solution.container.goods.map(x => x.z + x.length), 0);
                solution.groups = groups;
                this._dataService.setCurrentSolution(solution);
                subject.next(solution);
                subject.complete();
            });
            return subject.asObservable();
        }));
    }
    _getNextPosition(container, order, lastGood) {
        if (lastGood.stackingAllowed && lastGood.length >= order.length && lastGood.width >= order.width && container.height >= lastGood.y + order.height + lastGood.height)
            return { x: lastGood.x, y: lastGood.y + lastGood.height, z: lastGood.z, stackedOn: lastGood.id };
        else {
            if (lastGood.stackedOnGood === null) {
                let space = {
                    width: container.width - lastGood.x - lastGood.width,
                    height: container.height,
                    length: lastGood.length
                };
                if (super.canPlaceOrderIntoSpace(order, space).notTurned) {
                    return { x: lastGood.x + lastGood.width, y: lastGood.y, z: lastGood.z, stackedOn: null };
                }
            }
            else {
                let underneath = container.goods.find(x => x.id === lastGood.stackedOnGood);
                while (underneath) {
                    let space = {
                        width: underneath.width - lastGood.x - lastGood.width,
                        height: container.height - underneath.y - underneath.height,
                        length: underneath.length - lastGood.z - lastGood.length
                    };
                    if (super.canPlaceOrderIntoSpace(order, space).notTurned) {
                        return { x: lastGood.x + lastGood.width, y: lastGood.y, z: lastGood.z, stackedOn: underneath.id };
                    }
                    if (typeof underneath.stackedOnGood !== 'number')
                        break;
                    underneath = container.goods.find(x => x.id === underneath.stackedOnGood);
                }
                if (underneath) {
                    let space = {
                        width: container.width - underneath.x - underneath.width,
                        height: container.height,
                        length: underneath.length
                    };
                    if (super.canPlaceOrderIntoSpace(order, space).notTurned) {
                        return { x: underneath.x + underneath.width, y: 0, z: underneath.z, stackedOn: null };
                    }
                }
            }
            return { x: 0, y: 0, z: lastGood.z + lastGood.length, stackedOn: null };
        }
    }
}


/***/ }),

/***/ 64727:
/*!**************************************!*\
  !*** ./src/app/solvers/super-flo.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SuperFloSolver": () => (/* binding */ SuperFloSolver)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 66587);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 61555);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 19193);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 59095);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 83910);
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes */ 65444);
/* harmony import */ var _components_main_calculation_calculation_component_classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/main/calculation/calculation-component.classes */ 4908);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../globals */ 37503);
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/data.service */ 52468);
/* harmony import */ var _solver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./solver */ 78132);







class SuperFloSolver extends _solver__WEBPACK_IMPORTED_MODULE_4__.Solver {
    constructor(_dataService, _description = 'SuperFlo', _minimizationFunction = _globals__WEBPACK_IMPORTED_MODULE_2__.MinimizationFunction.MIN_Z) {
        super();
        this._dataService = _dataService;
        this._description = _description;
        this._minimizationFunction = _minimizationFunction;
        this._unusedDimensions = [];
    }
    solve() {
        return this._dataService.containerValid$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)((valid) => {
            if (!valid)
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.throwError)(_components_main_calculation_calculation_component_classes__WEBPACK_IMPORTED_MODULE_1__.CALCULATION_ERROR.CONTAINER_NOT_READY);
            let subject = new rxjs__WEBPACK_IMPORTED_MODULE_7__.ReplaySubject(1);
            (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.combineLatest)([this._dataService.orders$, this._dataService.containerHeight$, this._dataService.containerWidth$, this._dataService.groups$])
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1))
                .subscribe(([orders, height, width, groups]) => {
                let solution = new _classes__WEBPACK_IMPORTED_MODULE_0__.Solution((0,_globals__WEBPACK_IMPORTED_MODULE_2__.generateGuid)(), this._description);
                solution.container = new _classes__WEBPACK_IMPORTED_MODULE_0__.Container(height, width, 0);
                this._unusedDimensions.push(solution.container.getUnusedDimension());
                let sequenceNumber = 0;
                for (let order of orders) {
                    for (let i = 0; i < order.quantity; i++) {
                        let space = this.getBestUnusedDimensionsForMinimizationFunction(this._unusedDimensions.filter(x => this.canPlaceOrderIntoSpace(order, x).notTurned), this._minimizationFunction);
                        let unusedDimensions = this.putOrderAndCreateUnusedDimensions(order, space);
                        this._unusedDimensions.push(...unusedDimensions);
                        this._unusedDimensions.splice(this._unusedDimensions.findIndex(x => x === space), 1);
                        let good = new _classes__WEBPACK_IMPORTED_MODULE_0__.Good(sequenceNumber + 1, space.x, space.y, space.z, sequenceNumber, order.description);
                        good.setOrderDimensions(order);
                        solution.steps.push({
                            sequenceNumber: sequenceNumber,
                            messages: [`put good ${good.id} into space (${space.x}/${space.y}/${space.z}) (order ${order.orderId} element ${i + 1})`],
                            unusedDimensions: unusedDimensions,
                            dimension: _services_data_service__WEBPACK_IMPORTED_MODULE_3__.DataService.getGoodDimension(good),
                            usedDimension: space
                        });
                        solution.container.goods.push(good);
                        sequenceNumber++;
                        let combinable = this.getCombinableSpacePairs(this._unusedDimensions, true);
                        while (combinable.length > 0) {
                            let combined = this.combineSpaces(combinable[0]);
                            let spaces = [...this._unusedDimensions.filter(x => combinable[0].indexOf(x) === -1), combined];
                            this._unusedDimensions = spaces;
                            solution.steps.push({
                                sequenceNumber: sequenceNumber,
                                messages: [`combined unused spaces: ${combinable[0].map(x => x.guid).join(', ')}`],
                                unusedDimensions: [combined],
                                dimension: null,
                                usedDimension: null
                            });
                            sequenceNumber++;
                            combinable = this.getCombinableSpacePairs(this._unusedDimensions, true);
                        }
                    }
                }
                solution.container.length = Math.max(...solution.container.goods.map(x => x.z + x.length), 0);
                solution.groups = groups;
                this._dataService.setCurrentSolution(solution);
                subject.next(solution);
                subject.complete();
            });
            return subject.asObservable();
        }));
    }
}


/***/ }),

/***/ 94457:
/*!****************************************!*\
  !*** ./src/config/example-solution.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    "id": "ab34762f-ccd1-4258-b3e1-69558728e6b4",
    "container": {
        "_Height": 1700,
        "_Width": 2100,
        "_Length": 3000,
        "_Goods": [
            {
                "id": 1,
                "desc": "Palette 1",
                "height": 1000,
                "group": 1,
                "width": 1050,
                "length": 1000,
                "turningAllowed": true,
                "turned": null,
                "stackingAllowed": false,
                "stackedOnGood": null,
                "x": 0,
                "y": 0,
                "z": 0,
                "sequenceNr": 0
            },
            {
                "id": 2,
                "desc": "Palette 1",
                "height": 1000,
                "group": 1,
                "width": 1050,
                "length": 1000,
                "turningAllowed": true,
                "turned": null,
                "stackingAllowed": false,
                "stackedOnGood": null,
                "x": 1050,
                "y": 0,
                "z": 0,
                "sequenceNr": 1
            },
            {
                "id": 4,
                "desc": "Palette 1",
                "height": 1000,
                "group": 1,
                "width": 1050,
                "length": 1000,
                "turningAllowed": true,
                "turned": null,
                "stackingAllowed": false,
                "stackedOnGood": null,
                "x": 0,
                "y": 0,
                "z": 1000,
                "sequenceNr": 3
            },
            {
                "id": 5,
                "desc": "Palette 1",
                "height": 1000,
                "group": 1,
                "width": 1050,
                "length": 1000,
                "turningAllowed": true,
                "turned": null,
                "stackingAllowed": false,
                "stackedOnGood": null,
                "x": 1050,
                "y": 0,
                "z": 1000,
                "sequenceNr": 4
            },
            {
                "id": 8,
                "desc": "Palette 1",
                "height": 1000,
                "group": 1,
                "width": 1050,
                "length": 1000,
                "turningAllowed": true,
                "turned": null,
                "stackingAllowed": false,
                "stackedOnGood": null,
                "x": 0,
                "y": 0,
                "z": 2000,
                "sequenceNr": 7
            },
            {
                "id": 9,
                "desc": "Palette 1",
                "height": 1000,
                "group": 1,
                "width": 1050,
                "length": 1000,
                "turningAllowed": true,
                "turned": null,
                "stackingAllowed": false,
                "stackedOnGood": null,
                "x": 1050,
                "y": 0,
                "z": 2000,
                "sequenceNr": 8
            },
            {
                "id": 12,
                "desc": "Palette 2",
                "height": 400,
                "group": 1,
                "width": 700,
                "length": 500,
                "turningAllowed": true,
                "turned": null,
                "stackingAllowed": false,
                "stackedOnGood": null,
                "x": 0,
                "y": 1000,
                "z": 0,
                "sequenceNr": 11
            },
            {
                "id": 13,
                "desc": "Palette 2",
                "height": 400,
                "group": 1,
                "width": 700,
                "length": 500,
                "turningAllowed": true,
                "turned": null,
                "stackingAllowed": false,
                "stackedOnGood": null,
                "x": 700,
                "y": 1000,
                "z": 0,
                "sequenceNr": 12
            },
            {
                "id": 15,
                "desc": "Palette 2",
                "height": 400,
                "group": 1,
                "width": 700,
                "length": 500,
                "turningAllowed": true,
                "turned": null,
                "stackingAllowed": false,
                "stackedOnGood": null,
                "x": 1400,
                "y": 1000,
                "z": 0,
                "sequenceNr": 14
            },
            {
                "id": 17,
                "desc": "Palette 2",
                "height": 400,
                "group": 1,
                "width": 700,
                "length": 500,
                "turningAllowed": true,
                "turned": null,
                "stackingAllowed": false,
                "stackedOnGood": null,
                "x": 0,
                "y": 1000,
                "z": 500,
                "sequenceNr": 16
            },
            {
                "id": 18,
                "desc": "Palette 2",
                "height": 400,
                "group": 2,
                "width": 700,
                "length": 500,
                "turningAllowed": true,
                "turned": null,
                "stackingAllowed": false,
                "stackedOnGood": null,
                "x": 700,
                "y": 1000,
                "z": 500,
                "sequenceNr": 17
            },
            {
                "id": 20,
                "desc": "Palette 2",
                "height": 400,
                "group": 2,
                "width": 700,
                "length": 500,
                "turningAllowed": true,
                "turned": null,
                "stackingAllowed": false,
                "stackedOnGood": null,
                "x": 1400,
                "y": 1000,
                "z": 500,
                "sequenceNr": 19
            },
            {
                "id": 23,
                "desc": "Palette 2",
                "height": 400,
                "group": 2,
                "width": 700,
                "length": 500,
                "turningAllowed": true,
                "turned": null,
                "stackingAllowed": false,
                "stackedOnGood": null,
                "x": 0,
                "y": 1000,
                "z": 1000,
                "sequenceNr": 22
            },
            {
                "id": 24,
                "desc": "Palette 2",
                "height": 400,
                "group": 2,
                "width": 700,
                "length": 500,
                "turningAllowed": true,
                "turned": null,
                "stackingAllowed": false,
                "stackedOnGood": null,
                "x": 700,
                "y": 1000,
                "z": 1000,
                "sequenceNr": 23
            },
            {
                "id": 26,
                "desc": "Palette 2",
                "height": 400,
                "group": 2,
                "width": 700,
                "length": 500,
                "turningAllowed": true,
                "turned": null,
                "stackingAllowed": false,
                "stackedOnGood": null,
                "x": 1400,
                "y": 1000,
                "z": 1000,
                "sequenceNr": 25
            },
            {
                "id": 29,
                "desc": "Palette 2",
                "height": 400,
                "group": 2,
                "width": 700,
                "length": 500,
                "turningAllowed": true,
                "turned": null,
                "stackingAllowed": false,
                "stackedOnGood": null,
                "x": 0,
                "y": 1000,
                "z": 1500,
                "sequenceNr": 28
            },
            {
                "id": 30,
                "desc": "Palette 2",
                "height": 400,
                "group": 2,
                "width": 700,
                "length": 500,
                "turningAllowed": true,
                "turned": null,
                "stackingAllowed": false,
                "stackedOnGood": null,
                "x": 700,
                "y": 1000,
                "z": 1500,
                "sequenceNr": 29
            },
            {
                "id": 32,
                "desc": "Palette 2",
                "height": 400,
                "group": 2,
                "width": 700,
                "length": 500,
                "turningAllowed": true,
                "turned": null,
                "stackingAllowed": false,
                "stackedOnGood": null,
                "x": 1400,
                "y": 1000,
                "z": 1500,
                "sequenceNr": 31
            },
            {
                "id": 35,
                "desc": "Palette 2",
                "height": 400,
                "group": 2,
                "width": 700,
                "length": 500,
                "turningAllowed": true,
                "turned": null,
                "stackingAllowed": false,
                "stackedOnGood": null,
                "x": 0,
                "y": 1000,
                "z": 2000,
                "sequenceNr": 34
            },
            {
                "id": 36,
                "desc": "Palette 2",
                "height": 400,
                "group": 2,
                "width": 700,
                "length": 500,
                "turningAllowed": true,
                "turned": null,
                "stackingAllowed": false,
                "stackedOnGood": null,
                "x": 700,
                "y": 1000,
                "z": 2000,
                "sequenceNr": 35
            }
        ]
    },
    "algorithm": "Super-Flo",
    "groups": [
        {
            "id": 1,
            "color": "#b71a1a",
            "desc": "Test AG"
        },
        {
            "id": 2,
            "color": "#6094e6",
            "desc": "Beispiel SE"
        }
    ],
    "steps": [
        {
            "sequenceNumber": 0,
            "messages": [
                "put good 1 into space (0/0/0) (order 1 element 1)"
            ],
            "unusedDimensions": [
                {
                    "width": 1050,
                    "height": 700,
                    "length": 1000,
                    "guid": "a05e1818-7351-4db8-8f26-bcc3a41da56f",
                    "x": 0,
                    "y": 1000,
                    "z": 0,
                    "r": 1050,
                    "t": 1700,
                    "f": 1000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 0
                        },
                        {
                            "x": 1050,
                            "y": 1000,
                            "z": 0
                        },
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 1050,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 1050,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 1050,
                            "y": 1700,
                            "z": 1000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 1050,
                    "height": 1700,
                    "length": 1000,
                    "guid": "adb1d07d-70cf-41a8-92fb-40d4e822c5b0",
                    "x": 1050,
                    "y": 0,
                    "z": 0,
                    "r": 2100,
                    "t": 1700,
                    "f": 1000,
                    "points": [
                        {
                            "x": 1050,
                            "y": 0,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 0,
                            "z": 0
                        },
                        {
                            "x": 1050,
                            "y": 0,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 0,
                            "z": 1000
                        },
                        {
                            "x": 1050,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 1050,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 2100,
                    "height": 1700,
                    "length": null,
                    "guid": "ac6457bd-7cba-4ae2-909b-d3d3b044f259",
                    "x": 0,
                    "y": 0,
                    "z": 1000,
                    "r": 2100,
                    "t": 1700,
                    "f": null,
                    "points": [
                        {
                            "x": 0,
                            "y": 0,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 0,
                            "z": 1000
                        },
                        {
                            "x": 0,
                            "y": 0,
                            "z": null
                        },
                        {
                            "x": 2100,
                            "y": 0,
                            "z": null
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": null
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": null
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": {
                "width": 1050,
                "height": 1000,
                "length": 1000,
                "guid": "af23d8f1-62c4-4272-8960-1b7cdb7cc9d2",
                "x": 0,
                "y": 0,
                "z": 0,
                "r": null,
                "t": null,
                "f": null,
                "points": []
            },
            "usedDimension": {
                "width": 2100,
                "height": 1700,
                "length": null,
                "guid": "a17964dc-064d-4a08-ba09-19f61c6588b1",
                "x": 0,
                "y": 0,
                "z": 0,
                "r": 2100,
                "t": 1700,
                "f": null,
                "points": [
                    {
                        "x": 0,
                        "y": 0,
                        "z": 0
                    },
                    {
                        "x": 2100,
                        "y": 0,
                        "z": 0
                    },
                    {
                        "x": 0,
                        "y": 0,
                        "z": null
                    },
                    {
                        "x": 2100,
                        "y": 0,
                        "z": null
                    },
                    {
                        "x": 0,
                        "y": 1700,
                        "z": 0
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 0
                    },
                    {
                        "x": 0,
                        "y": 1700,
                        "z": null
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": null
                    }
                ],
                "stackedOn": null,
                "groupRestrictedBy": null
            }
        },
        {
            "sequenceNumber": 1,
            "messages": [
                "put good 2 into space (1050/0/0) (order 1 element 2)"
            ],
            "unusedDimensions": [
                {
                    "width": 1050,
                    "height": 700,
                    "length": 1000,
                    "guid": "a7f5b1c9-bb21-4411-b7ef-04afc8ec48df",
                    "x": 1050,
                    "y": 1000,
                    "z": 0,
                    "r": 2100,
                    "t": 1700,
                    "f": 1000,
                    "points": [
                        {
                            "x": 1050,
                            "y": 1000,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 0
                        },
                        {
                            "x": 1050,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 1050,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 1050,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": {
                "width": 1050,
                "height": 1000,
                "length": 1000,
                "guid": "a5706204-3bb2-42bb-b8d1-ca3dd52026eb",
                "x": 1050,
                "y": 0,
                "z": 0,
                "r": null,
                "t": null,
                "f": null,
                "points": []
            },
            "usedDimension": {
                "width": 1050,
                "height": 1700,
                "length": 1000,
                "guid": "adb1d07d-70cf-41a8-92fb-40d4e822c5b0",
                "x": 1050,
                "y": 0,
                "z": 0,
                "r": 2100,
                "t": 1700,
                "f": 1000,
                "points": [
                    {
                        "x": 1050,
                        "y": 0,
                        "z": 0
                    },
                    {
                        "x": 2100,
                        "y": 0,
                        "z": 0
                    },
                    {
                        "x": 1050,
                        "y": 0,
                        "z": 1000
                    },
                    {
                        "x": 2100,
                        "y": 0,
                        "z": 1000
                    },
                    {
                        "x": 1050,
                        "y": 1700,
                        "z": 0
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 0
                    },
                    {
                        "x": 1050,
                        "y": 1700,
                        "z": 1000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 1000
                    }
                ],
                "stackedOn": null,
                "groupRestrictedBy": null
            }
        },
        {
            "sequenceNumber": 2,
            "messages": [
                "combined unused spaces: a05e1818-7351-4db8-8f26-bcc3a41da56f, a7f5b1c9-bb21-4411-b7ef-04afc8ec48df"
            ],
            "unusedDimensions": [
                {
                    "width": 2100,
                    "height": 700,
                    "length": 1000,
                    "guid": "a7432993-28a4-4883-bef4-1e8022715312",
                    "x": 0,
                    "y": 1000,
                    "z": 0,
                    "r": 2100,
                    "t": 1700,
                    "f": 1000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 0
                        },
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": null,
            "usedDimension": null
        },
        {
            "sequenceNumber": 3,
            "messages": [
                "put good 4 into space (0/0/1000) (order 1 element 3)"
            ],
            "unusedDimensions": [
                {
                    "width": 1050,
                    "height": 700,
                    "length": 1000,
                    "guid": "a213e4f5-825f-4570-b099-73cf47953d00",
                    "x": 0,
                    "y": 1000,
                    "z": 1000,
                    "r": 1050,
                    "t": 1700,
                    "f": 2000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 1050,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 1050,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 1050,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 1050,
                            "y": 1700,
                            "z": 2000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 1050,
                    "height": 1700,
                    "length": 1000,
                    "guid": "a4e03b6b-df8e-4fd1-8320-bf851f059082",
                    "x": 1050,
                    "y": 0,
                    "z": 1000,
                    "r": 2100,
                    "t": 1700,
                    "f": 2000,
                    "points": [
                        {
                            "x": 1050,
                            "y": 0,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 0,
                            "z": 1000
                        },
                        {
                            "x": 1050,
                            "y": 0,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 0,
                            "z": 2000
                        },
                        {
                            "x": 1050,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 1050,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 2000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 2100,
                    "height": 1700,
                    "length": null,
                    "guid": "ab235c91-6e75-436a-9d4c-98154a9c8222",
                    "x": 0,
                    "y": 0,
                    "z": 2000,
                    "r": 2100,
                    "t": 1700,
                    "f": null,
                    "points": [
                        {
                            "x": 0,
                            "y": 0,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 0,
                            "z": 2000
                        },
                        {
                            "x": 0,
                            "y": 0,
                            "z": null
                        },
                        {
                            "x": 2100,
                            "y": 0,
                            "z": null
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": null
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": null
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": {
                "width": 1050,
                "height": 1000,
                "length": 1000,
                "guid": "a8e8b05b-4f83-4af6-b8ff-69dbd623c0de",
                "x": 0,
                "y": 0,
                "z": 1000,
                "r": null,
                "t": null,
                "f": null,
                "points": []
            },
            "usedDimension": {
                "width": 2100,
                "height": 1700,
                "length": null,
                "guid": "ac6457bd-7cba-4ae2-909b-d3d3b044f259",
                "x": 0,
                "y": 0,
                "z": 1000,
                "r": 2100,
                "t": 1700,
                "f": null,
                "points": [
                    {
                        "x": 0,
                        "y": 0,
                        "z": 1000
                    },
                    {
                        "x": 2100,
                        "y": 0,
                        "z": 1000
                    },
                    {
                        "x": 0,
                        "y": 0,
                        "z": null
                    },
                    {
                        "x": 2100,
                        "y": 0,
                        "z": null
                    },
                    {
                        "x": 0,
                        "y": 1700,
                        "z": 1000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 1000
                    },
                    {
                        "x": 0,
                        "y": 1700,
                        "z": null
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": null
                    }
                ],
                "stackedOn": null,
                "groupRestrictedBy": null
            }
        },
        {
            "sequenceNumber": 4,
            "messages": [
                "put good 5 into space (1050/0/1000) (order 1 element 4)"
            ],
            "unusedDimensions": [
                {
                    "width": 1050,
                    "height": 700,
                    "length": 1000,
                    "guid": "acef3233-8c61-4c92-8e61-06ede2878a69",
                    "x": 1050,
                    "y": 1000,
                    "z": 1000,
                    "r": 2100,
                    "t": 1700,
                    "f": 2000,
                    "points": [
                        {
                            "x": 1050,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 1050,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 1050,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 1050,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 2000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": {
                "width": 1050,
                "height": 1000,
                "length": 1000,
                "guid": "a359e3bf-6e20-42ef-a342-65435c4aa2dc",
                "x": 1050,
                "y": 0,
                "z": 1000,
                "r": null,
                "t": null,
                "f": null,
                "points": []
            },
            "usedDimension": {
                "width": 1050,
                "height": 1700,
                "length": 1000,
                "guid": "a4e03b6b-df8e-4fd1-8320-bf851f059082",
                "x": 1050,
                "y": 0,
                "z": 1000,
                "r": 2100,
                "t": 1700,
                "f": 2000,
                "points": [
                    {
                        "x": 1050,
                        "y": 0,
                        "z": 1000
                    },
                    {
                        "x": 2100,
                        "y": 0,
                        "z": 1000
                    },
                    {
                        "x": 1050,
                        "y": 0,
                        "z": 2000
                    },
                    {
                        "x": 2100,
                        "y": 0,
                        "z": 2000
                    },
                    {
                        "x": 1050,
                        "y": 1700,
                        "z": 1000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 1000
                    },
                    {
                        "x": 1050,
                        "y": 1700,
                        "z": 2000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 2000
                    }
                ],
                "stackedOn": null,
                "groupRestrictedBy": null
            }
        },
        {
            "sequenceNumber": 5,
            "messages": [
                "combined unused spaces: a213e4f5-825f-4570-b099-73cf47953d00, acef3233-8c61-4c92-8e61-06ede2878a69"
            ],
            "unusedDimensions": [
                {
                    "width": 2100,
                    "height": 700,
                    "length": 1000,
                    "guid": "a56e1961-4215-489e-9a33-4a0e991db9c1",
                    "x": 0,
                    "y": 1000,
                    "z": 1000,
                    "r": 2100,
                    "t": 1700,
                    "f": 2000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 2000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": null,
            "usedDimension": null
        },
        {
            "sequenceNumber": 6,
            "messages": [
                "combined unused spaces: a7432993-28a4-4883-bef4-1e8022715312, a56e1961-4215-489e-9a33-4a0e991db9c1"
            ],
            "unusedDimensions": [
                {
                    "width": 2100,
                    "height": 700,
                    "length": 2000,
                    "guid": "a0fd9b45-47a7-4145-9817-cae7b90c76b8",
                    "x": 0,
                    "y": 1000,
                    "z": 0,
                    "r": 2100,
                    "t": 1700,
                    "f": 2000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 0
                        },
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 2000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": null,
            "usedDimension": null
        },
        {
            "sequenceNumber": 7,
            "messages": [
                "put good 8 into space (0/0/2000) (order 1 element 5)"
            ],
            "unusedDimensions": [
                {
                    "width": 1050,
                    "height": 700,
                    "length": 1000,
                    "guid": "a4b8b1d0-604a-489d-ae14-017ccc1b17d6",
                    "x": 0,
                    "y": 1000,
                    "z": 2000,
                    "r": 1050,
                    "t": 1700,
                    "f": 3000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 1050,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 3000
                        },
                        {
                            "x": 1050,
                            "y": 1000,
                            "z": 3000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 1050,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 3000
                        },
                        {
                            "x": 1050,
                            "y": 1700,
                            "z": 3000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 1050,
                    "height": 1700,
                    "length": 1000,
                    "guid": "a032ca0a-1dc2-4b64-a74b-d2430f372d47",
                    "x": 1050,
                    "y": 0,
                    "z": 2000,
                    "r": 2100,
                    "t": 1700,
                    "f": 3000,
                    "points": [
                        {
                            "x": 1050,
                            "y": 0,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 0,
                            "z": 2000
                        },
                        {
                            "x": 1050,
                            "y": 0,
                            "z": 3000
                        },
                        {
                            "x": 2100,
                            "y": 0,
                            "z": 3000
                        },
                        {
                            "x": 1050,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 1050,
                            "y": 1700,
                            "z": 3000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 3000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 2100,
                    "height": 1700,
                    "length": null,
                    "guid": "ae758e8a-4cc3-41ba-b1a1-231675dfc86d",
                    "x": 0,
                    "y": 0,
                    "z": 3000,
                    "r": 2100,
                    "t": 1700,
                    "f": null,
                    "points": [
                        {
                            "x": 0,
                            "y": 0,
                            "z": 3000
                        },
                        {
                            "x": 2100,
                            "y": 0,
                            "z": 3000
                        },
                        {
                            "x": 0,
                            "y": 0,
                            "z": null
                        },
                        {
                            "x": 2100,
                            "y": 0,
                            "z": null
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 3000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 3000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": null
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": null
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": {
                "width": 1050,
                "height": 1000,
                "length": 1000,
                "guid": "ac6afe73-0930-44b0-a6b9-14993df29397",
                "x": 0,
                "y": 0,
                "z": 2000,
                "r": null,
                "t": null,
                "f": null,
                "points": []
            },
            "usedDimension": {
                "width": 2100,
                "height": 1700,
                "length": null,
                "guid": "ab235c91-6e75-436a-9d4c-98154a9c8222",
                "x": 0,
                "y": 0,
                "z": 2000,
                "r": 2100,
                "t": 1700,
                "f": null,
                "points": [
                    {
                        "x": 0,
                        "y": 0,
                        "z": 2000
                    },
                    {
                        "x": 2100,
                        "y": 0,
                        "z": 2000
                    },
                    {
                        "x": 0,
                        "y": 0,
                        "z": null
                    },
                    {
                        "x": 2100,
                        "y": 0,
                        "z": null
                    },
                    {
                        "x": 0,
                        "y": 1700,
                        "z": 2000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 2000
                    },
                    {
                        "x": 0,
                        "y": 1700,
                        "z": null
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": null
                    }
                ],
                "stackedOn": null,
                "groupRestrictedBy": null
            }
        },
        {
            "sequenceNumber": 8,
            "messages": [
                "put good 9 into space (1050/0/2000) (order 1 element 6)"
            ],
            "unusedDimensions": [
                {
                    "width": 1050,
                    "height": 700,
                    "length": 1000,
                    "guid": "af844c2f-7f79-4591-883a-2392c8e38f1e",
                    "x": 1050,
                    "y": 1000,
                    "z": 2000,
                    "r": 2100,
                    "t": 1700,
                    "f": 3000,
                    "points": [
                        {
                            "x": 1050,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 1050,
                            "y": 1000,
                            "z": 3000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 3000
                        },
                        {
                            "x": 1050,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 1050,
                            "y": 1700,
                            "z": 3000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 3000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": {
                "width": 1050,
                "height": 1000,
                "length": 1000,
                "guid": "a9227f21-dd16-4ea0-b818-92b84d89db35",
                "x": 1050,
                "y": 0,
                "z": 2000,
                "r": null,
                "t": null,
                "f": null,
                "points": []
            },
            "usedDimension": {
                "width": 1050,
                "height": 1700,
                "length": 1000,
                "guid": "a032ca0a-1dc2-4b64-a74b-d2430f372d47",
                "x": 1050,
                "y": 0,
                "z": 2000,
                "r": 2100,
                "t": 1700,
                "f": 3000,
                "points": [
                    {
                        "x": 1050,
                        "y": 0,
                        "z": 2000
                    },
                    {
                        "x": 2100,
                        "y": 0,
                        "z": 2000
                    },
                    {
                        "x": 1050,
                        "y": 0,
                        "z": 3000
                    },
                    {
                        "x": 2100,
                        "y": 0,
                        "z": 3000
                    },
                    {
                        "x": 1050,
                        "y": 1700,
                        "z": 2000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 2000
                    },
                    {
                        "x": 1050,
                        "y": 1700,
                        "z": 3000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 3000
                    }
                ],
                "stackedOn": null,
                "groupRestrictedBy": null
            }
        },
        {
            "sequenceNumber": 9,
            "messages": [
                "combined unused spaces: a4b8b1d0-604a-489d-ae14-017ccc1b17d6, af844c2f-7f79-4591-883a-2392c8e38f1e"
            ],
            "unusedDimensions": [
                {
                    "width": 2100,
                    "height": 700,
                    "length": 1000,
                    "guid": "aee0455d-cfe5-41dc-9555-93c686f8dc0c",
                    "x": 0,
                    "y": 1000,
                    "z": 2000,
                    "r": 2100,
                    "t": 1700,
                    "f": 3000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 3000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 3000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 3000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 3000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": null,
            "usedDimension": null
        },
        {
            "sequenceNumber": 10,
            "messages": [
                "combined unused spaces: a0fd9b45-47a7-4145-9817-cae7b90c76b8, aee0455d-cfe5-41dc-9555-93c686f8dc0c"
            ],
            "unusedDimensions": [
                {
                    "width": 2100,
                    "height": 700,
                    "length": 3000,
                    "guid": "a271cced-40b6-4431-b719-e9e7e36465ed",
                    "x": 0,
                    "y": 1000,
                    "z": 0,
                    "r": 2100,
                    "t": 1700,
                    "f": 3000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 0
                        },
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 3000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 3000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 3000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 3000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": null,
            "usedDimension": null
        },
        {
            "sequenceNumber": 11,
            "messages": [
                "put good 12 into space (0/1000/0) (order 2 element 1)"
            ],
            "unusedDimensions": [
                {
                    "width": 700,
                    "height": 300,
                    "length": 500,
                    "guid": "a6083ebd-c5dd-45f9-98e9-f16ef94e8660",
                    "x": 0,
                    "y": 1400,
                    "z": 0,
                    "r": 700,
                    "t": 1700,
                    "f": 500,
                    "points": [
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 0
                        },
                        {
                            "x": 700,
                            "y": 1400,
                            "z": 0
                        },
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 500
                        },
                        {
                            "x": 700,
                            "y": 1400,
                            "z": 500
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 500
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 1400,
                    "height": 700,
                    "length": 500,
                    "guid": "af078e13-50c8-477b-a814-0cd7da3d9e82",
                    "x": 700,
                    "y": 1000,
                    "z": 0,
                    "r": 2100,
                    "t": 1700,
                    "f": 500,
                    "points": [
                        {
                            "x": 700,
                            "y": 1000,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 0
                        },
                        {
                            "x": 700,
                            "y": 1000,
                            "z": 500
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 500
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 500
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 2100,
                    "height": 700,
                    "length": 2500,
                    "guid": "aecc669b-cb1f-43a5-bf93-cf1831268cd4",
                    "x": 0,
                    "y": 1000,
                    "z": 500,
                    "r": 2100,
                    "t": 1700,
                    "f": 3000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 500
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 500
                        },
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 3000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 3000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 3000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 3000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": {
                "width": 700,
                "height": 400,
                "length": 500,
                "guid": "a6b459f6-22c8-4034-9392-5bd686068062",
                "x": 0,
                "y": 1000,
                "z": 0,
                "r": null,
                "t": null,
                "f": null,
                "points": []
            },
            "usedDimension": {
                "width": 2100,
                "height": 700,
                "length": 3000,
                "guid": "a271cced-40b6-4431-b719-e9e7e36465ed",
                "x": 0,
                "y": 1000,
                "z": 0,
                "r": 2100,
                "t": 1700,
                "f": 3000,
                "points": [
                    {
                        "x": 0,
                        "y": 1000,
                        "z": 0
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 0
                    },
                    {
                        "x": 0,
                        "y": 1000,
                        "z": 3000
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 3000
                    },
                    {
                        "x": 0,
                        "y": 1700,
                        "z": 0
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 0
                    },
                    {
                        "x": 0,
                        "y": 1700,
                        "z": 3000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 3000
                    }
                ],
                "stackedOn": null,
                "groupRestrictedBy": null
            }
        },
        {
            "sequenceNumber": 12,
            "messages": [
                "put good 13 into space (700/1000/0) (order 2 element 2)"
            ],
            "unusedDimensions": [
                {
                    "width": 700,
                    "height": 300,
                    "length": 500,
                    "guid": "acfa6d2b-94a6-447e-beb1-a540495049fc",
                    "x": 700,
                    "y": 1400,
                    "z": 0,
                    "r": 1400,
                    "t": 1700,
                    "f": 500,
                    "points": [
                        {
                            "x": 700,
                            "y": 1400,
                            "z": 0
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 0
                        },
                        {
                            "x": 700,
                            "y": 1400,
                            "z": 500
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 500
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 500
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 700,
                    "height": 700,
                    "length": 500,
                    "guid": "ad9251d0-f5a1-4bab-9ead-0d982fba3ba1",
                    "x": 1400,
                    "y": 1000,
                    "z": 0,
                    "r": 2100,
                    "t": 1700,
                    "f": 500,
                    "points": [
                        {
                            "x": 1400,
                            "y": 1000,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 0
                        },
                        {
                            "x": 1400,
                            "y": 1000,
                            "z": 500
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 500
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 500
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": {
                "width": 700,
                "height": 400,
                "length": 500,
                "guid": "aedca38c-54de-4f1d-8e6d-942b67a540da",
                "x": 700,
                "y": 1000,
                "z": 0,
                "r": null,
                "t": null,
                "f": null,
                "points": []
            },
            "usedDimension": {
                "width": 1400,
                "height": 700,
                "length": 500,
                "guid": "af078e13-50c8-477b-a814-0cd7da3d9e82",
                "x": 700,
                "y": 1000,
                "z": 0,
                "r": 2100,
                "t": 1700,
                "f": 500,
                "points": [
                    {
                        "x": 700,
                        "y": 1000,
                        "z": 0
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 0
                    },
                    {
                        "x": 700,
                        "y": 1000,
                        "z": 500
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 500
                    },
                    {
                        "x": 700,
                        "y": 1700,
                        "z": 0
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 0
                    },
                    {
                        "x": 700,
                        "y": 1700,
                        "z": 500
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 500
                    }
                ],
                "stackedOn": null,
                "groupRestrictedBy": null
            }
        },
        {
            "sequenceNumber": 13,
            "messages": [
                "combined unused spaces: a6083ebd-c5dd-45f9-98e9-f16ef94e8660, acfa6d2b-94a6-447e-beb1-a540495049fc"
            ],
            "unusedDimensions": [
                {
                    "width": 1400,
                    "height": 300,
                    "length": 500,
                    "guid": "a373236e-aa89-4ea3-8743-368035612a1d",
                    "x": 0,
                    "y": 1400,
                    "z": 0,
                    "r": 1400,
                    "t": 1700,
                    "f": 500,
                    "points": [
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 0
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 0
                        },
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 500
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 500
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 500
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": null,
            "usedDimension": null
        },
        {
            "sequenceNumber": 14,
            "messages": [
                "put good 15 into space (1400/1000/0) (order 2 element 3)"
            ],
            "unusedDimensions": [
                {
                    "width": 700,
                    "height": 300,
                    "length": 500,
                    "guid": "aabcbd33-b41b-45da-8ccd-6fabac70b894",
                    "x": 1400,
                    "y": 1400,
                    "z": 0,
                    "r": 2100,
                    "t": 1700,
                    "f": 500,
                    "points": [
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 0
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 500
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 500
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 500
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": {
                "width": 700,
                "height": 400,
                "length": 500,
                "guid": "a78c7dc0-6b51-4c43-838d-5fa4d3a49733",
                "x": 1400,
                "y": 1000,
                "z": 0,
                "r": null,
                "t": null,
                "f": null,
                "points": []
            },
            "usedDimension": {
                "width": 700,
                "height": 700,
                "length": 500,
                "guid": "ad9251d0-f5a1-4bab-9ead-0d982fba3ba1",
                "x": 1400,
                "y": 1000,
                "z": 0,
                "r": 2100,
                "t": 1700,
                "f": 500,
                "points": [
                    {
                        "x": 1400,
                        "y": 1000,
                        "z": 0
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 0
                    },
                    {
                        "x": 1400,
                        "y": 1000,
                        "z": 500
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 500
                    },
                    {
                        "x": 1400,
                        "y": 1700,
                        "z": 0
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 0
                    },
                    {
                        "x": 1400,
                        "y": 1700,
                        "z": 500
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 500
                    }
                ],
                "stackedOn": null,
                "groupRestrictedBy": null
            }
        },
        {
            "sequenceNumber": 15,
            "messages": [
                "combined unused spaces: a373236e-aa89-4ea3-8743-368035612a1d, aabcbd33-b41b-45da-8ccd-6fabac70b894"
            ],
            "unusedDimensions": [
                {
                    "width": 2100,
                    "height": 300,
                    "length": 500,
                    "guid": "a9dc165e-b26a-4129-99ff-c2cae1db7875",
                    "x": 0,
                    "y": 1400,
                    "z": 0,
                    "r": 2100,
                    "t": 1700,
                    "f": 500,
                    "points": [
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 0
                        },
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 500
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 500
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 500
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": null,
            "usedDimension": null
        },
        {
            "sequenceNumber": 16,
            "messages": [
                "put good 17 into space (0/1000/500) (order 2 element 4)"
            ],
            "unusedDimensions": [
                {
                    "width": 700,
                    "height": 300,
                    "length": 500,
                    "guid": "ac3c5c1e-a6f3-44df-a2ba-bf137b71a787",
                    "x": 0,
                    "y": 1400,
                    "z": 500,
                    "r": 700,
                    "t": 1700,
                    "f": 1000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 500
                        },
                        {
                            "x": 700,
                            "y": 1400,
                            "z": 500
                        },
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 700,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 1000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 1400,
                    "height": 700,
                    "length": 500,
                    "guid": "a09e2ba8-cdeb-4267-b607-da01974b32a8",
                    "x": 700,
                    "y": 1000,
                    "z": 500,
                    "r": 2100,
                    "t": 1700,
                    "f": 1000,
                    "points": [
                        {
                            "x": 700,
                            "y": 1000,
                            "z": 500
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 500
                        },
                        {
                            "x": 700,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 2100,
                    "height": 700,
                    "length": 2000,
                    "guid": "abb5cd55-ba02-4f17-afd3-af0f98f69d17",
                    "x": 0,
                    "y": 1000,
                    "z": 1000,
                    "r": 2100,
                    "t": 1700,
                    "f": 3000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 3000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 3000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 3000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 3000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": {
                "width": 700,
                "height": 400,
                "length": 500,
                "guid": "a68a6ef2-51b8-4fd5-94fe-89990b51fca7",
                "x": 0,
                "y": 1000,
                "z": 500,
                "r": null,
                "t": null,
                "f": null,
                "points": []
            },
            "usedDimension": {
                "width": 2100,
                "height": 700,
                "length": 2500,
                "guid": "aecc669b-cb1f-43a5-bf93-cf1831268cd4",
                "x": 0,
                "y": 1000,
                "z": 500,
                "r": 2100,
                "t": 1700,
                "f": 3000,
                "points": [
                    {
                        "x": 0,
                        "y": 1000,
                        "z": 500
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 500
                    },
                    {
                        "x": 0,
                        "y": 1000,
                        "z": 3000
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 3000
                    },
                    {
                        "x": 0,
                        "y": 1700,
                        "z": 500
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 500
                    },
                    {
                        "x": 0,
                        "y": 1700,
                        "z": 3000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 3000
                    }
                ],
                "stackedOn": null,
                "groupRestrictedBy": null
            }
        },
        {
            "sequenceNumber": 17,
            "messages": [
                "put good 18 into space (700/1000/500) (order 3 element 1)"
            ],
            "unusedDimensions": [
                {
                    "width": 700,
                    "height": 300,
                    "length": 500,
                    "guid": "a741a4ae-0aa7-4eca-8af3-976ccb8302fe",
                    "x": 700,
                    "y": 1400,
                    "z": 500,
                    "r": 1400,
                    "t": 1700,
                    "f": 1000,
                    "points": [
                        {
                            "x": 700,
                            "y": 1400,
                            "z": 500
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 500
                        },
                        {
                            "x": 700,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 1000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 700,
                    "height": 700,
                    "length": 500,
                    "guid": "a622217f-fc09-4258-8a59-0b5c3a5fb412",
                    "x": 1400,
                    "y": 1000,
                    "z": 500,
                    "r": 2100,
                    "t": 1700,
                    "f": 1000,
                    "points": [
                        {
                            "x": 1400,
                            "y": 1000,
                            "z": 500
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 500
                        },
                        {
                            "x": 1400,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": {
                "width": 700,
                "height": 400,
                "length": 500,
                "guid": "ab6c99c8-a44b-411e-b00f-6e6c6a2fc7a5",
                "x": 700,
                "y": 1000,
                "z": 500,
                "r": null,
                "t": null,
                "f": null,
                "points": []
            },
            "usedDimension": {
                "width": 1400,
                "height": 700,
                "length": 500,
                "guid": "a09e2ba8-cdeb-4267-b607-da01974b32a8",
                "x": 700,
                "y": 1000,
                "z": 500,
                "r": 2100,
                "t": 1700,
                "f": 1000,
                "points": [
                    {
                        "x": 700,
                        "y": 1000,
                        "z": 500
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 500
                    },
                    {
                        "x": 700,
                        "y": 1000,
                        "z": 1000
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 1000
                    },
                    {
                        "x": 700,
                        "y": 1700,
                        "z": 500
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 500
                    },
                    {
                        "x": 700,
                        "y": 1700,
                        "z": 1000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 1000
                    }
                ],
                "stackedOn": null,
                "groupRestrictedBy": null
            }
        },
        {
            "sequenceNumber": 18,
            "messages": [
                "combined unused spaces: ac3c5c1e-a6f3-44df-a2ba-bf137b71a787, a741a4ae-0aa7-4eca-8af3-976ccb8302fe"
            ],
            "unusedDimensions": [
                {
                    "width": 1400,
                    "height": 300,
                    "length": 500,
                    "guid": "aee3e573-e523-4f1c-9f9e-6044c9fd8c8a",
                    "x": 0,
                    "y": 1400,
                    "z": 500,
                    "r": 1400,
                    "t": 1700,
                    "f": 1000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 500
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 500
                        },
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 1000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": null,
            "usedDimension": null
        },
        {
            "sequenceNumber": 19,
            "messages": [
                "put good 20 into space (1400/1000/500) (order 3 element 2)"
            ],
            "unusedDimensions": [
                {
                    "width": 700,
                    "height": 300,
                    "length": 500,
                    "guid": "ab3ff8ab-a898-47d1-9535-361c3efff21f",
                    "x": 1400,
                    "y": 1400,
                    "z": 500,
                    "r": 2100,
                    "t": 1700,
                    "f": 1000,
                    "points": [
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 500
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 500
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": {
                "width": 700,
                "height": 400,
                "length": 500,
                "guid": "a4c5c71c-09d4-41ee-bfc5-1ecd8f68543d",
                "x": 1400,
                "y": 1000,
                "z": 500,
                "r": null,
                "t": null,
                "f": null,
                "points": []
            },
            "usedDimension": {
                "width": 700,
                "height": 700,
                "length": 500,
                "guid": "a622217f-fc09-4258-8a59-0b5c3a5fb412",
                "x": 1400,
                "y": 1000,
                "z": 500,
                "r": 2100,
                "t": 1700,
                "f": 1000,
                "points": [
                    {
                        "x": 1400,
                        "y": 1000,
                        "z": 500
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 500
                    },
                    {
                        "x": 1400,
                        "y": 1000,
                        "z": 1000
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 1000
                    },
                    {
                        "x": 1400,
                        "y": 1700,
                        "z": 500
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 500
                    },
                    {
                        "x": 1400,
                        "y": 1700,
                        "z": 1000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 1000
                    }
                ],
                "stackedOn": null,
                "groupRestrictedBy": null
            }
        },
        {
            "sequenceNumber": 20,
            "messages": [
                "combined unused spaces: aee3e573-e523-4f1c-9f9e-6044c9fd8c8a, ab3ff8ab-a898-47d1-9535-361c3efff21f"
            ],
            "unusedDimensions": [
                {
                    "width": 2100,
                    "height": 300,
                    "length": 500,
                    "guid": "a73ac71f-051e-4023-b4c0-7dfd9dae34c4",
                    "x": 0,
                    "y": 1400,
                    "z": 500,
                    "r": 2100,
                    "t": 1700,
                    "f": 1000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 500
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 500
                        },
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 500
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": null,
            "usedDimension": null
        },
        {
            "sequenceNumber": 21,
            "messages": [
                "combined unused spaces: a9dc165e-b26a-4129-99ff-c2cae1db7875, a73ac71f-051e-4023-b4c0-7dfd9dae34c4"
            ],
            "unusedDimensions": [
                {
                    "width": 2100,
                    "height": 300,
                    "length": 1000,
                    "guid": "a5e0a4c6-09f3-48e3-b98d-35dde5b9496d",
                    "x": 0,
                    "y": 1400,
                    "z": 0,
                    "r": 2100,
                    "t": 1700,
                    "f": 1000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 0
                        },
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": null,
            "usedDimension": null
        },
        {
            "sequenceNumber": 22,
            "messages": [
                "put good 23 into space (0/1000/1000) (order 3 element 3)"
            ],
            "unusedDimensions": [
                {
                    "width": 700,
                    "height": 300,
                    "length": 500,
                    "guid": "add1e0d9-9fc3-4a7f-ac74-5ad1abe827f9",
                    "x": 0,
                    "y": 1400,
                    "z": 1000,
                    "r": 700,
                    "t": 1700,
                    "f": 1500,
                    "points": [
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 700,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 700,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 1500
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 1400,
                    "height": 700,
                    "length": 500,
                    "guid": "ab6b6770-cc53-441b-95e8-b9cc7679fe9b",
                    "x": 700,
                    "y": 1000,
                    "z": 1000,
                    "r": 2100,
                    "t": 1700,
                    "f": 1500,
                    "points": [
                        {
                            "x": 700,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 700,
                            "y": 1000,
                            "z": 1500
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 1500
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1500
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 2100,
                    "height": 700,
                    "length": 1500,
                    "guid": "a6318570-1954-4687-8279-1496219d5d57",
                    "x": 0,
                    "y": 1000,
                    "z": 1500,
                    "r": 2100,
                    "t": 1700,
                    "f": 3000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 1500
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 1500
                        },
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 3000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 3000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 3000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 3000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": {
                "width": 700,
                "height": 400,
                "length": 500,
                "guid": "a9bb0464-2870-457d-85c7-a2f06fd7bcf3",
                "x": 0,
                "y": 1000,
                "z": 1000,
                "r": null,
                "t": null,
                "f": null,
                "points": []
            },
            "usedDimension": {
                "width": 2100,
                "height": 700,
                "length": 2000,
                "guid": "abb5cd55-ba02-4f17-afd3-af0f98f69d17",
                "x": 0,
                "y": 1000,
                "z": 1000,
                "r": 2100,
                "t": 1700,
                "f": 3000,
                "points": [
                    {
                        "x": 0,
                        "y": 1000,
                        "z": 1000
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 1000
                    },
                    {
                        "x": 0,
                        "y": 1000,
                        "z": 3000
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 3000
                    },
                    {
                        "x": 0,
                        "y": 1700,
                        "z": 1000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 1000
                    },
                    {
                        "x": 0,
                        "y": 1700,
                        "z": 3000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 3000
                    }
                ],
                "stackedOn": null,
                "groupRestrictedBy": null
            }
        },
        {
            "sequenceNumber": 23,
            "messages": [
                "put good 24 into space (700/1000/1000) (order 3 element 4)"
            ],
            "unusedDimensions": [
                {
                    "width": 700,
                    "height": 300,
                    "length": 500,
                    "guid": "a5c7136e-dee7-428f-8286-c6e588180cf3",
                    "x": 700,
                    "y": 1400,
                    "z": 1000,
                    "r": 1400,
                    "t": 1700,
                    "f": 1500,
                    "points": [
                        {
                            "x": 700,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 700,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 1500
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 700,
                    "height": 700,
                    "length": 500,
                    "guid": "ae62ed61-f13d-41cc-a630-dc5c06912370",
                    "x": 1400,
                    "y": 1000,
                    "z": 1000,
                    "r": 2100,
                    "t": 1700,
                    "f": 1500,
                    "points": [
                        {
                            "x": 1400,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 1000
                        },
                        {
                            "x": 1400,
                            "y": 1000,
                            "z": 1500
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 1500
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1500
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": {
                "width": 700,
                "height": 400,
                "length": 500,
                "guid": "a5e357c9-c259-423b-be3b-d5925c0f88c6",
                "x": 700,
                "y": 1000,
                "z": 1000,
                "r": null,
                "t": null,
                "f": null,
                "points": []
            },
            "usedDimension": {
                "width": 1400,
                "height": 700,
                "length": 500,
                "guid": "ab6b6770-cc53-441b-95e8-b9cc7679fe9b",
                "x": 700,
                "y": 1000,
                "z": 1000,
                "r": 2100,
                "t": 1700,
                "f": 1500,
                "points": [
                    {
                        "x": 700,
                        "y": 1000,
                        "z": 1000
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 1000
                    },
                    {
                        "x": 700,
                        "y": 1000,
                        "z": 1500
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 1500
                    },
                    {
                        "x": 700,
                        "y": 1700,
                        "z": 1000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 1000
                    },
                    {
                        "x": 700,
                        "y": 1700,
                        "z": 1500
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 1500
                    }
                ],
                "stackedOn": null,
                "groupRestrictedBy": null
            }
        },
        {
            "sequenceNumber": 24,
            "messages": [
                "combined unused spaces: add1e0d9-9fc3-4a7f-ac74-5ad1abe827f9, a5c7136e-dee7-428f-8286-c6e588180cf3"
            ],
            "unusedDimensions": [
                {
                    "width": 1400,
                    "height": 300,
                    "length": 500,
                    "guid": "abb100fb-e956-4598-901d-531ec3b66750",
                    "x": 0,
                    "y": 1400,
                    "z": 1000,
                    "r": 1400,
                    "t": 1700,
                    "f": 1500,
                    "points": [
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 1500
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": null,
            "usedDimension": null
        },
        {
            "sequenceNumber": 25,
            "messages": [
                "put good 26 into space (1400/1000/1000) (order 3 element 5)"
            ],
            "unusedDimensions": [
                {
                    "width": 700,
                    "height": 300,
                    "length": 500,
                    "guid": "acc79a77-986c-46c3-98c6-9c9c3e03f20e",
                    "x": 1400,
                    "y": 1400,
                    "z": 1000,
                    "r": 2100,
                    "t": 1700,
                    "f": 1500,
                    "points": [
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1500
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": {
                "width": 700,
                "height": 400,
                "length": 500,
                "guid": "a9267dc6-7932-49a5-9997-df3b0289129a",
                "x": 1400,
                "y": 1000,
                "z": 1000,
                "r": null,
                "t": null,
                "f": null,
                "points": []
            },
            "usedDimension": {
                "width": 700,
                "height": 700,
                "length": 500,
                "guid": "ae62ed61-f13d-41cc-a630-dc5c06912370",
                "x": 1400,
                "y": 1000,
                "z": 1000,
                "r": 2100,
                "t": 1700,
                "f": 1500,
                "points": [
                    {
                        "x": 1400,
                        "y": 1000,
                        "z": 1000
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 1000
                    },
                    {
                        "x": 1400,
                        "y": 1000,
                        "z": 1500
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 1500
                    },
                    {
                        "x": 1400,
                        "y": 1700,
                        "z": 1000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 1000
                    },
                    {
                        "x": 1400,
                        "y": 1700,
                        "z": 1500
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 1500
                    }
                ],
                "stackedOn": null,
                "groupRestrictedBy": null
            }
        },
        {
            "sequenceNumber": 26,
            "messages": [
                "combined unused spaces: abb100fb-e956-4598-901d-531ec3b66750, acc79a77-986c-46c3-98c6-9c9c3e03f20e"
            ],
            "unusedDimensions": [
                {
                    "width": 2100,
                    "height": 300,
                    "length": 500,
                    "guid": "aec25190-4e98-4f91-8a3f-2c8a1b4e603f",
                    "x": 0,
                    "y": 1400,
                    "z": 1000,
                    "r": 2100,
                    "t": 1700,
                    "f": 1500,
                    "points": [
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 1000
                        },
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1500
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": null,
            "usedDimension": null
        },
        {
            "sequenceNumber": 27,
            "messages": [
                "combined unused spaces: a5e0a4c6-09f3-48e3-b98d-35dde5b9496d, aec25190-4e98-4f91-8a3f-2c8a1b4e603f"
            ],
            "unusedDimensions": [
                {
                    "width": 2100,
                    "height": 300,
                    "length": 1500,
                    "guid": "a31b5bc1-41f7-4772-b196-abb73199b51b",
                    "x": 0,
                    "y": 1400,
                    "z": 0,
                    "r": 2100,
                    "t": 1700,
                    "f": 1500,
                    "points": [
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 0
                        },
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1500
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": null,
            "usedDimension": null
        },
        {
            "sequenceNumber": 28,
            "messages": [
                "put good 29 into space (0/1000/1500) (order 3 element 6)"
            ],
            "unusedDimensions": [
                {
                    "width": 700,
                    "height": 300,
                    "length": 500,
                    "guid": "a8437a65-72c6-4eb8-af95-7865e1f0a044",
                    "x": 0,
                    "y": 1400,
                    "z": 1500,
                    "r": 700,
                    "t": 1700,
                    "f": 2000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 700,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 2000
                        },
                        {
                            "x": 700,
                            "y": 1400,
                            "z": 2000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 2000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 1400,
                    "height": 700,
                    "length": 500,
                    "guid": "a5fe89d7-e938-47d2-9cac-41a925097a29",
                    "x": 700,
                    "y": 1000,
                    "z": 1500,
                    "r": 2100,
                    "t": 1700,
                    "f": 2000,
                    "points": [
                        {
                            "x": 700,
                            "y": 1000,
                            "z": 1500
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 1500
                        },
                        {
                            "x": 700,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 2000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 2100,
                    "height": 700,
                    "length": 1000,
                    "guid": "a075a592-caa0-45d4-a1ca-b51b78224b89",
                    "x": 0,
                    "y": 1000,
                    "z": 2000,
                    "r": 2100,
                    "t": 1700,
                    "f": 3000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 3000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 3000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 3000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 3000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": {
                "width": 700,
                "height": 400,
                "length": 500,
                "guid": "ab492248-0890-4764-945d-d33a9658171d",
                "x": 0,
                "y": 1000,
                "z": 1500,
                "r": null,
                "t": null,
                "f": null,
                "points": []
            },
            "usedDimension": {
                "width": 2100,
                "height": 700,
                "length": 1500,
                "guid": "a6318570-1954-4687-8279-1496219d5d57",
                "x": 0,
                "y": 1000,
                "z": 1500,
                "r": 2100,
                "t": 1700,
                "f": 3000,
                "points": [
                    {
                        "x": 0,
                        "y": 1000,
                        "z": 1500
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 1500
                    },
                    {
                        "x": 0,
                        "y": 1000,
                        "z": 3000
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 3000
                    },
                    {
                        "x": 0,
                        "y": 1700,
                        "z": 1500
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 1500
                    },
                    {
                        "x": 0,
                        "y": 1700,
                        "z": 3000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 3000
                    }
                ],
                "stackedOn": null,
                "groupRestrictedBy": null
            }
        },
        {
            "sequenceNumber": 29,
            "messages": [
                "put good 30 into space (700/1000/1500) (order 3 element 7)"
            ],
            "unusedDimensions": [
                {
                    "width": 700,
                    "height": 300,
                    "length": 500,
                    "guid": "a68ef22f-5989-4ecb-9402-a596a6dc51bc",
                    "x": 700,
                    "y": 1400,
                    "z": 1500,
                    "r": 1400,
                    "t": 1700,
                    "f": 2000,
                    "points": [
                        {
                            "x": 700,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 700,
                            "y": 1400,
                            "z": 2000
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 2000
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 2000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 700,
                    "height": 700,
                    "length": 500,
                    "guid": "a5906783-1457-4daf-bf0e-71129852f75b",
                    "x": 1400,
                    "y": 1000,
                    "z": 1500,
                    "r": 2100,
                    "t": 1700,
                    "f": 2000,
                    "points": [
                        {
                            "x": 1400,
                            "y": 1000,
                            "z": 1500
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 1500
                        },
                        {
                            "x": 1400,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 2000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": {
                "width": 700,
                "height": 400,
                "length": 500,
                "guid": "a1e7e84f-243b-4616-be30-50d826641817",
                "x": 700,
                "y": 1000,
                "z": 1500,
                "r": null,
                "t": null,
                "f": null,
                "points": []
            },
            "usedDimension": {
                "width": 1400,
                "height": 700,
                "length": 500,
                "guid": "a5fe89d7-e938-47d2-9cac-41a925097a29",
                "x": 700,
                "y": 1000,
                "z": 1500,
                "r": 2100,
                "t": 1700,
                "f": 2000,
                "points": [
                    {
                        "x": 700,
                        "y": 1000,
                        "z": 1500
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 1500
                    },
                    {
                        "x": 700,
                        "y": 1000,
                        "z": 2000
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 2000
                    },
                    {
                        "x": 700,
                        "y": 1700,
                        "z": 1500
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 1500
                    },
                    {
                        "x": 700,
                        "y": 1700,
                        "z": 2000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 2000
                    }
                ],
                "stackedOn": null,
                "groupRestrictedBy": null
            }
        },
        {
            "sequenceNumber": 30,
            "messages": [
                "combined unused spaces: a8437a65-72c6-4eb8-af95-7865e1f0a044, a68ef22f-5989-4ecb-9402-a596a6dc51bc"
            ],
            "unusedDimensions": [
                {
                    "width": 1400,
                    "height": 300,
                    "length": 500,
                    "guid": "adf6ba34-83d8-490c-bd29-20c8f2612b0c",
                    "x": 0,
                    "y": 1400,
                    "z": 1500,
                    "r": 1400,
                    "t": 1700,
                    "f": 2000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 2000
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 2000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 2000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": null,
            "usedDimension": null
        },
        {
            "sequenceNumber": 31,
            "messages": [
                "put good 32 into space (1400/1000/1500) (order 3 element 8)"
            ],
            "unusedDimensions": [
                {
                    "width": 700,
                    "height": 300,
                    "length": 500,
                    "guid": "a6ab9f19-0408-4c94-9c78-abdba76343a4",
                    "x": 1400,
                    "y": 1400,
                    "z": 1500,
                    "r": 2100,
                    "t": 1700,
                    "f": 2000,
                    "points": [
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 2000
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 2000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": {
                "width": 700,
                "height": 400,
                "length": 500,
                "guid": "ac1c837f-07bd-40ca-a7ea-b07f75fd2310",
                "x": 1400,
                "y": 1000,
                "z": 1500,
                "r": null,
                "t": null,
                "f": null,
                "points": []
            },
            "usedDimension": {
                "width": 700,
                "height": 700,
                "length": 500,
                "guid": "a5906783-1457-4daf-bf0e-71129852f75b",
                "x": 1400,
                "y": 1000,
                "z": 1500,
                "r": 2100,
                "t": 1700,
                "f": 2000,
                "points": [
                    {
                        "x": 1400,
                        "y": 1000,
                        "z": 1500
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 1500
                    },
                    {
                        "x": 1400,
                        "y": 1000,
                        "z": 2000
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 2000
                    },
                    {
                        "x": 1400,
                        "y": 1700,
                        "z": 1500
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 1500
                    },
                    {
                        "x": 1400,
                        "y": 1700,
                        "z": 2000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 2000
                    }
                ],
                "stackedOn": null,
                "groupRestrictedBy": null
            }
        },
        {
            "sequenceNumber": 32,
            "messages": [
                "combined unused spaces: adf6ba34-83d8-490c-bd29-20c8f2612b0c, a6ab9f19-0408-4c94-9c78-abdba76343a4"
            ],
            "unusedDimensions": [
                {
                    "width": 2100,
                    "height": 300,
                    "length": 500,
                    "guid": "a27ff8c1-19d5-463e-a152-14bf56bcf76f",
                    "x": 0,
                    "y": 1400,
                    "z": 1500,
                    "r": 2100,
                    "t": 1700,
                    "f": 2000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 1500
                        },
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 2000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 1500
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 2000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": null,
            "usedDimension": null
        },
        {
            "sequenceNumber": 33,
            "messages": [
                "combined unused spaces: a31b5bc1-41f7-4772-b196-abb73199b51b, a27ff8c1-19d5-463e-a152-14bf56bcf76f"
            ],
            "unusedDimensions": [
                {
                    "width": 2100,
                    "height": 300,
                    "length": 2000,
                    "guid": "a395af77-cffd-4682-bd8b-f8a97b9fc8d5",
                    "x": 0,
                    "y": 1400,
                    "z": 0,
                    "r": 2100,
                    "t": 1700,
                    "f": 2000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 0
                        },
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1400,
                            "z": 2000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 0
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 2000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": null,
            "usedDimension": null
        },
        {
            "sequenceNumber": 34,
            "messages": [
                "put good 35 into space (0/1000/2000) (order 3 element 9)"
            ],
            "unusedDimensions": [
                {
                    "width": 700,
                    "height": 300,
                    "length": 500,
                    "guid": "a94e962f-6e1f-45ea-a5b8-9f4fea7ba0d4",
                    "x": 0,
                    "y": 1400,
                    "z": 2000,
                    "r": 700,
                    "t": 1700,
                    "f": 2500,
                    "points": [
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 2000
                        },
                        {
                            "x": 700,
                            "y": 1400,
                            "z": 2000
                        },
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 2500
                        },
                        {
                            "x": 700,
                            "y": 1400,
                            "z": 2500
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 2500
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 2500
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 1400,
                    "height": 700,
                    "length": 500,
                    "guid": "ad7bf0b3-2bad-4084-9132-1b9594d79545",
                    "x": 700,
                    "y": 1000,
                    "z": 2000,
                    "r": 2100,
                    "t": 1700,
                    "f": 2500,
                    "points": [
                        {
                            "x": 700,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 700,
                            "y": 1000,
                            "z": 2500
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 2500
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 2500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 2500
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 2100,
                    "height": 700,
                    "length": 500,
                    "guid": "a4c5e990-0651-4041-b858-698b0d77423d",
                    "x": 0,
                    "y": 1000,
                    "z": 2500,
                    "r": 2100,
                    "t": 1700,
                    "f": 3000,
                    "points": [
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 2500
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 2500
                        },
                        {
                            "x": 0,
                            "y": 1000,
                            "z": 3000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 3000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 2500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 2500
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 3000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 3000
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": {
                "width": 700,
                "height": 400,
                "length": 500,
                "guid": "a36dd007-f0b1-4236-a10a-f81da82d7b88",
                "x": 0,
                "y": 1000,
                "z": 2000,
                "r": null,
                "t": null,
                "f": null,
                "points": []
            },
            "usedDimension": {
                "width": 2100,
                "height": 700,
                "length": 1000,
                "guid": "a075a592-caa0-45d4-a1ca-b51b78224b89",
                "x": 0,
                "y": 1000,
                "z": 2000,
                "r": 2100,
                "t": 1700,
                "f": 3000,
                "points": [
                    {
                        "x": 0,
                        "y": 1000,
                        "z": 2000
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 2000
                    },
                    {
                        "x": 0,
                        "y": 1000,
                        "z": 3000
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 3000
                    },
                    {
                        "x": 0,
                        "y": 1700,
                        "z": 2000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 2000
                    },
                    {
                        "x": 0,
                        "y": 1700,
                        "z": 3000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 3000
                    }
                ],
                "stackedOn": null,
                "groupRestrictedBy": null
            }
        },
        {
            "sequenceNumber": 35,
            "messages": [
                "put good 36 into space (700/1000/2000) (order 3 element 10)"
            ],
            "unusedDimensions": [
                {
                    "width": 700,
                    "height": 300,
                    "length": 500,
                    "guid": "a5755f1f-ec17-4547-90d2-bd9b4cc28aae",
                    "x": 700,
                    "y": 1400,
                    "z": 2000,
                    "r": 1400,
                    "t": 1700,
                    "f": 2500,
                    "points": [
                        {
                            "x": 700,
                            "y": 1400,
                            "z": 2000
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 2000
                        },
                        {
                            "x": 700,
                            "y": 1400,
                            "z": 2500
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 2500
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 700,
                            "y": 1700,
                            "z": 2500
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 2500
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                },
                {
                    "width": 700,
                    "height": 700,
                    "length": 500,
                    "guid": "a0e08cd2-3f96-4516-82de-efc291ce0cb3",
                    "x": 1400,
                    "y": 1000,
                    "z": 2000,
                    "r": 2100,
                    "t": 1700,
                    "f": 2500,
                    "points": [
                        {
                            "x": 1400,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 2000
                        },
                        {
                            "x": 1400,
                            "y": 1000,
                            "z": 2500
                        },
                        {
                            "x": 2100,
                            "y": 1000,
                            "z": 2500
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 2500
                        },
                        {
                            "x": 2100,
                            "y": 1700,
                            "z": 2500
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": {
                "width": 700,
                "height": 400,
                "length": 500,
                "guid": "aa0ba0b1-ad38-4206-903a-7f970f6f5278",
                "x": 700,
                "y": 1000,
                "z": 2000,
                "r": null,
                "t": null,
                "f": null,
                "points": []
            },
            "usedDimension": {
                "width": 1400,
                "height": 700,
                "length": 500,
                "guid": "ad7bf0b3-2bad-4084-9132-1b9594d79545",
                "x": 700,
                "y": 1000,
                "z": 2000,
                "r": 2100,
                "t": 1700,
                "f": 2500,
                "points": [
                    {
                        "x": 700,
                        "y": 1000,
                        "z": 2000
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 2000
                    },
                    {
                        "x": 700,
                        "y": 1000,
                        "z": 2500
                    },
                    {
                        "x": 2100,
                        "y": 1000,
                        "z": 2500
                    },
                    {
                        "x": 700,
                        "y": 1700,
                        "z": 2000
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 2000
                    },
                    {
                        "x": 700,
                        "y": 1700,
                        "z": 2500
                    },
                    {
                        "x": 2100,
                        "y": 1700,
                        "z": 2500
                    }
                ],
                "stackedOn": null,
                "groupRestrictedBy": null
            }
        },
        {
            "sequenceNumber": 36,
            "messages": [
                "combined unused spaces: a94e962f-6e1f-45ea-a5b8-9f4fea7ba0d4, a5755f1f-ec17-4547-90d2-bd9b4cc28aae"
            ],
            "unusedDimensions": [
                {
                    "width": 1400,
                    "height": 300,
                    "length": 500,
                    "guid": "a2a68bc4-8bec-46fc-936a-973337dcf411",
                    "x": 0,
                    "y": 1400,
                    "z": 2000,
                    "r": 1400,
                    "t": 1700,
                    "f": 2500,
                    "points": [
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 2000
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 2000
                        },
                        {
                            "x": 0,
                            "y": 1400,
                            "z": 2500
                        },
                        {
                            "x": 1400,
                            "y": 1400,
                            "z": 2500
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 2000
                        },
                        {
                            "x": 0,
                            "y": 1700,
                            "z": 2500
                        },
                        {
                            "x": 1400,
                            "y": 1700,
                            "z": 2500
                        }
                    ],
                    "stackedOn": null,
                    "groupRestrictedBy": null
                }
            ],
            "dimension": null,
            "usedDimension": null
        }
    ],
    "calculated": "2022-01-20T18:14:58",
    "description": null
});


/***/ }),

/***/ 68133:
/*!***************************************!*\
  !*** ./src/config/function-config.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var src_lib_process_builder_globals_pre_defined_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/lib/process-builder/globals/pre-defined-functions */ 30063);
/* harmony import */ var _example_solution__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./example-solution */ 94457);
/* harmony import */ var _interface_codes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interface-codes */ 3703);
/* harmony import */ var _param_codes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./param-codes */ 98992);




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
    new src_lib_process_builder_globals_pre_defined_functions__WEBPACK_IMPORTED_MODULE_0__.PredefinedFunctions().customJSMethod(0),
    {
        'identifier': 1,
        'inputParams': [],
        'name': 'Provide exemplary solution',
        'normalizedName': 'provideExemplarySolution',
        'description': 'method provides an exemplary solution',
        'output': { 'param': _param_codes__WEBPACK_IMPORTED_MODULE_3__.ParamCodes.ExemplarySolution },
        'pseudoImplementation': () => {
            return new Promise((resolve) => resolve(_example_solution__WEBPACK_IMPORTED_MODULE_1__["default"]));
        },
        'canFail': false
    },
    {
        'identifier': 2,
        'inputParams': null,
        'useDynamicInputParams': {
            'typeLimits': ['object']
        },
        'name': 'Download JSON',
        'normalizedName': 'downloadJSON',
        'description': 'method downloads object as json',
        'output': null,
        'pseudoImplementation': (arg) => {
            let sJson = JSON.stringify(arg), element = document.createElement('a');
            element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
            element.setAttribute('download', "storage-manager-download.json");
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        },
        'canFail': false,
        'requireCustomImplementation': false
    },
    {
        'identifier': 3,
        'inputParams': null,
        'name': 'Upload JSON',
        'normalizedName': 'uploadJSON',
        'description': 'method enables to upload json objects',
        'output': {
            'param': 'dynamic'
        },
        'pseudoImplementation': () => {
            let promise = new Promise((resolve, reject) => {
                let input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'application/json');
                input.style.display = 'none';
                input.onchange = (evt) => {
                    let file = evt.target.files[0];
                    if (file) {
                        let fileReader = new FileReader();
                        fileReader.onload = () => {
                            try {
                                let obj = JSON.parse(fileReader.result);
                                resolve(obj);
                            }
                            catch (err) {
                                reject('error parsing json object');
                            }
                        };
                        fileReader.readAsText(file);
                        document.body.removeChild(input);
                    }
                    else {
                        document.body.removeChild(input);
                        reject('no input file');
                    }
                };
                document.body.appendChild(input);
                input.click();
            });
            return promise;
        },
        'pseudoImplementationComputationName': 'Import',
        'canFail': false,
        'requireCustomImplementation': false
    },
    {
        identifier: 4,
        inputParams: null,
        name: 'Map to solution',
        normalizedName: 'mapToSolution',
        description: 'method converts a given input to a reusable solution',
        output: {
            param: 'dynamic',
            interface: _interface_codes__WEBPACK_IMPORTED_MODULE_2__.InterfaceCodes.Solution
        },
        canFail: false,
        requireCustomImplementation: false,
        requireDataMapping: true,
        finalizesFlow: true
    }
]);


/***/ }),

/***/ 3703:
/*!***************************************!*\
  !*** ./src/config/interface-codes.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InterfaceCodes": () => (/* binding */ InterfaceCodes)
/* harmony export */ });
var InterfaceCodes;
(function (InterfaceCodes) {
    InterfaceCodes[InterfaceCodes["Solution"] = 0] = "Solution";
    InterfaceCodes[InterfaceCodes["Good"] = 1] = "Good";
    InterfaceCodes[InterfaceCodes["Container"] = 2] = "Container";
    InterfaceCodes[InterfaceCodes["Group"] = 3] = "Group";
    InterfaceCodes[InterfaceCodes["Step"] = 4] = "Step";
})(InterfaceCodes || (InterfaceCodes = {}));


/***/ }),

/***/ 9359:
/*!*****************************************!*\
  !*** ./src/config/interfaces-config.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _interface_codes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interface-codes */ 3703);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
    {
        identifier: _interface_codes__WEBPACK_IMPORTED_MODULE_0__.InterfaceCodes.Solution,
        typeDef: [
            { 'name': 'id', 'type': 'string', 'defaultValue': 'ab34762f-ccd1-4258-b3e1-69558728e6b4' },
            {
                'name': 'container',
                'type': 'object',
                'interface': _interface_codes__WEBPACK_IMPORTED_MODULE_0__.InterfaceCodes.Container
            },
            { 'name': 'alogorithm', 'type': 'string', 'defaultValue': 'all in one row' },
            {
                'name': 'groups',
                'type': 'array',
                'defaultValue': null,
                'typeDef': [
                    {
                        'interface': _interface_codes__WEBPACK_IMPORTED_MODULE_0__.InterfaceCodes.Group,
                        'type': 'object'
                    }
                ]
            },
            { 'name': 'description', 'type': 'string', 'defaultValue': 'exemplary algorithm' },
            { 'name': 'calculated', 'type': 'string', 'defaultValue': '2020-01-01T12:00:00' },
            {
                'name': 'steps',
                'type': 'array',
                'defaultValue': null,
                'typeDef': [
                    {
                        'interface': _interface_codes__WEBPACK_IMPORTED_MODULE_0__.InterfaceCodes.Step,
                        'type': 'object'
                    }
                ]
            },
        ],
        name: 'solution template',
        normalizedName: 'solution'
    },
    {
        identifier: _interface_codes__WEBPACK_IMPORTED_MODULE_0__.InterfaceCodes.Container,
        name: 'container template',
        normalizedName: 'container',
        typeDef: [
            { 'name': 'height', 'type': 'number', 'defaultValue': 1700 },
            { 'name': 'width', 'type': 'number', 'defaultValue': 2100 },
            { 'name': 'length', 'type': 'number', 'defaultValue': 3000 },
            {
                name: 'goods', type: 'array', typeDef: [
                    {
                        name: null,
                        type: 'object',
                        interface: _interface_codes__WEBPACK_IMPORTED_MODULE_0__.InterfaceCodes.Good
                    }
                ]
            }
        ]
    },
    {
        identifier: _interface_codes__WEBPACK_IMPORTED_MODULE_0__.InterfaceCodes.Good,
        name: 'good template',
        normalizedName: 'good',
        typeDef: [
            { 'name': 'id', 'type': 'number', 'defaultValue': 1 },
            { 'name': 'desc', 'type': 'string', 'defaultValue': 'pallet' },
            { 'name': 'height', 'type': 'number', 'defaultValue': 10 },
            { 'name': 'group', 'type': 'number', 'defaultValue': 1 },
        ]
    },
    {
        identifier: _interface_codes__WEBPACK_IMPORTED_MODULE_0__.InterfaceCodes.Group,
        name: 'group template',
        normalizedName: 'group',
        typeDef: [
            { 'name': 'id', 'type': 'number', 'defaultValue': 1 },
            { 'name': 'color', 'type': 'string', 'defaultValue': '#b71a1a' },
            { 'name': 'desc', 'type': 'string', 'defaultValue': 'Test AG' },
        ]
    },
    {
        identifier: _interface_codes__WEBPACK_IMPORTED_MODULE_0__.InterfaceCodes.Step,
        name: 'step template',
        normalizedName: 'step',
        typeDef: [
            { 'name': 'sequenceNumber', 'type': 'number', 'defaultValue': 0 },
        ]
    }
]);


/***/ }),

/***/ 98992:
/*!***********************************!*\
  !*** ./src/config/param-codes.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParamCodes": () => (/* binding */ ParamCodes)
/* harmony export */ });
var ParamCodes;
(function (ParamCodes) {
    ParamCodes[ParamCodes["UserStringInput"] = 0] = "UserStringInput";
    ParamCodes[ParamCodes["ToUpperCaseResult"] = 1] = "ToUpperCaseResult";
    ParamCodes[ParamCodes["UserNumberInput"] = 2] = "UserNumberInput";
    ParamCodes[ParamCodes["UserDateInput"] = 3] = "UserDateInput";
    ParamCodes[ParamCodes["ExemplarySolution"] = 4] = "ExemplarySolution";
})(ParamCodes || (ParamCodes = {}));


/***/ }),

/***/ 29713:
/*!*************************************!*\
  !*** ./src/config/params-config.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _interface_codes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interface-codes */ 3703);
/* harmony import */ var _param_codes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./param-codes */ 98992);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
    {
        'identifier': _param_codes__WEBPACK_IMPORTED_MODULE_1__.ParamCodes.ExemplarySolution,
        'name': 'exemplary solution',
        'normalizedName': 'exemplarySolution',
        'constant': true,
        'interface': _interface_codes__WEBPACK_IMPORTED_MODULE_0__.InterfaceCodes.Solution,
        'type': 'object'
    },
]);


/***/ }),

/***/ 30800:
/*!**********************************************!*\
  !*** ./src/config/process-builder-config.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _interface_codes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interface-codes */ 3703);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    editable: true,
    hideDataObjectReferences: false,
    hideDatabases: true,
    hideEvents: false,
    hideGateways: false,
    hideGroups: true,
    hidePools: true,
    hideSubProcesses: true,
    hideTasks: false,
    statusConfig: {
        initialStatus: 'initial',
        finalStatus: 'final'
    },
    errorGatewayConfig: {
        errorConnectionName: 'on error',
        gatewayName: 'task failed?',
        successConnectionName: 'on success'
    },
    dynamicParamDefaultNaming: 'unnamed param',
    defaultFunctionName: 'unnamed function',
    expectInterface: _interface_codes__WEBPACK_IMPORTED_MODULE_0__.InterfaceCodes.Solution
});


/***/ }),

/***/ 92340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 40260:
/*!*************************************************!*\
  !*** ./src/lib/automation/automation.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AutomationModule": () => (/* binding */ AutomationModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _pipes_api_authorization_type_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pipes/api-authorization-type.pipe */ 58308);
/* harmony import */ var _components_api_configuration_preview_api_configuration_preview_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/api-configuration-preview/api-configuration-preview.component */ 62701);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/input */ 68562);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ 84522);
/* harmony import */ var _components_api_call_configurator_api_call_configurator_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/api-call-configurator/api-call-configurator.component */ 1093);
/* harmony import */ var _components_select_api_authorization_select_api_authorization_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/select-api-authorization/select-api-authorization.component */ 83393);
/* harmony import */ var _components_dynamic_input_access_token_input_access_token_input_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/dynamic-input/access-token-input/access-token-input.component */ 28435);
/* harmony import */ var _components_dynamic_input_endpoint_input_endpoint_input_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/dynamic-input/endpoint-input/endpoint-input.component */ 33874);
/* harmony import */ var _components_dynamic_input_username_password_combination_username_password_combination_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/dynamic-input/username-password-combination/username-password-combination.component */ 67562);
/* harmony import */ var _components_dynamic_input_api_login_test_api_login_test_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/dynamic-input/api-login-test/api-login-test.component */ 15474);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 57822);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/select */ 57371);
/* harmony import */ var ngx_json_viewer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-json-viewer */ 48623);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 22560);
















class AutomationModule {
}
AutomationModule.ɵfac = function AutomationModule_Factory(t) { return new (t || AutomationModule)(); };
AutomationModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: AutomationModule });
AutomationModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_10__.ReactiveFormsModule,
            _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInputModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule,
            _angular_material_select__WEBPACK_IMPORTED_MODULE_13__.MatSelectModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatButtonModule,
            ngx_json_viewer__WEBPACK_IMPORTED_MODULE_15__.NgxJsonViewerModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](AutomationModule, { declarations: [_components_api_configuration_preview_api_configuration_preview_component__WEBPACK_IMPORTED_MODULE_1__.ApiConfigurationPreviewComponent,
        _pipes_api_authorization_type_pipe__WEBPACK_IMPORTED_MODULE_0__.ApiAuthorizationTypePipe,
        _components_api_call_configurator_api_call_configurator_component__WEBPACK_IMPORTED_MODULE_2__.ApiCallConfiguratorComponent,
        _components_dynamic_input_api_login_test_api_login_test_component__WEBPACK_IMPORTED_MODULE_7__.ApiLoginTestComponent,
        _components_dynamic_input_username_password_combination_username_password_combination_component__WEBPACK_IMPORTED_MODULE_6__.UsernamePasswordCombinationComponent,
        _components_dynamic_input_endpoint_input_endpoint_input_component__WEBPACK_IMPORTED_MODULE_5__.EndpointInputComponent,
        _components_dynamic_input_access_token_input_access_token_input_component__WEBPACK_IMPORTED_MODULE_4__.AccessTokenInputComponent,
        _components_select_api_authorization_select_api_authorization_component__WEBPACK_IMPORTED_MODULE_3__.SelectApiAuthorizationComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_10__.ReactiveFormsModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInputModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule,
        _angular_material_select__WEBPACK_IMPORTED_MODULE_13__.MatSelectModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatButtonModule,
        ngx_json_viewer__WEBPACK_IMPORTED_MODULE_15__.NgxJsonViewerModule], exports: [_components_api_call_configurator_api_call_configurator_component__WEBPACK_IMPORTED_MODULE_2__.ApiCallConfiguratorComponent,
        _components_api_configuration_preview_api_configuration_preview_component__WEBPACK_IMPORTED_MODULE_1__.ApiConfigurationPreviewComponent] }); })();


/***/ }),

/***/ 29944:
/*!**************************************************************!*\
  !*** ./src/lib/automation/classes/api-call-configuration.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BasicAuthConfiguration": () => (/* binding */ BasicAuthConfiguration),
/* harmony export */   "Configuration": () => (/* binding */ Configuration),
/* harmony export */   "JWTTokenLoginConfiguration": () => (/* binding */ JWTTokenLoginConfiguration),
/* harmony export */   "OAuth2Configuration": () => (/* binding */ OAuth2Configuration),
/* harmony export */   "StolenJWTTokenConfiguration": () => (/* binding */ StolenJWTTokenConfiguration)
/* harmony export */ });
class Configuration {
    constructor() {
        this.calculationEndpoint = null;
    }
}
class BasicAuthConfiguration extends Configuration {
    constructor() {
        super(...arguments);
        this.userName = null;
        this.password = null;
    }
}
class StolenJWTTokenConfiguration extends Configuration {
    constructor() {
        super(...arguments);
        this.jwtToken = null;
    }
}
class JWTTokenLoginConfiguration extends Configuration {
    constructor() {
        super(...arguments);
        this.userName = null;
        this.password = null;
        this.loginEndpoint = null;
    }
}
class OAuth2Configuration extends Configuration {
}


/***/ }),

/***/ 1093:
/*!************************************************************************************************!*\
  !*** ./src/lib/automation/components/api-call-configurator/api-call-configurator.component.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiCallConfiguratorComponent": () => (/* binding */ ApiCallConfiguratorComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 61555);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 19193);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 53298);
/* harmony import */ var src_lib_automation_classes_api_call_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/lib/automation/classes/api-call-configuration */ 29944);
/* harmony import */ var src_lib_automation_globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/lib/automation/globals */ 66419);
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../interfaces */ 7686);
/* harmony import */ var _dynamic_input_access_token_input_access_token_input_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dynamic-input/access-token-input/access-token-input.component */ 28435);
/* harmony import */ var _dynamic_input_api_login_test_api_login_test_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dynamic-input/api-login-test/api-login-test.component */ 15474);
/* harmony import */ var _dynamic_input_endpoint_input_endpoint_input_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dynamic-input/endpoint-input/endpoint-input.component */ 33874);
/* harmony import */ var _dynamic_input_username_password_combination_username_password_combination_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dynamic-input/username-password-combination/username-password-combination.component */ 67562);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var src_lib_automation_services_configure_api_call_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/lib/automation/services/configure-api-call.service */ 31129);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ 75074);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/input */ 68562);
/* harmony import */ var _select_api_authorization_select_api_authorization_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../select-api-authorization/select-api-authorization.component */ 83393);
















const _c0 = ["dynamicContent"];
function ApiCallConfiguratorComponent_ng_template_6_Template(rf, ctx) { }
class ApiCallConfiguratorComponent {
    constructor(formGroupProvider, _configurationFormGroupProvider, _submitConfigurationProvider, _formBuilder, _componentFactoryResolver, _configureApiCallService) {
        this.formGroupProvider = formGroupProvider;
        this._configurationFormGroupProvider = _configurationFormGroupProvider;
        this._submitConfigurationProvider = _submitConfigurationProvider;
        this._formBuilder = _formBuilder;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._configureApiCallService = _configureApiCallService;
        this._ref = new rxjs__WEBPACK_IMPORTED_MODULE_9__.ReplaySubject(1);
        this._subscriptions = [];
        this.formGroupProvider.formGroup = this._formBuilder.group({
            endpoint: null,
            authorization: src_lib_automation_globals__WEBPACK_IMPORTED_MODULE_1__.API_CALL_AUTHORIZATION.NO_AUTH
        });
    }
    set ref(ref) {
        this._ref.next(ref);
    }
    ngOnDestroy() {
        for (let sub of this._subscriptions)
            sub.unsubscribe();
        this._subscriptions = [];
    }
    ngOnInit() {
        this._subscriptions.push(...[
            (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.combineLatest)([this._ref, this.formGroupProvider.formGroup.controls['authorization'].valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.distinctUntilChanged)())])
                .subscribe(([ref, type]) => {
                this.setConfigurationForm(type);
                this.setDynamicInner(ref, type);
            }),
            (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.combineLatest)([this._ref, this._configureApiCallService.authType$, this._configureApiCallService.configuration$]).subscribe({
                next: ([ref, authType, configuration]) => {
                    this.formGroupProvider.formGroup.patchValue({
                        endpoint: configuration?.calculationEndpoint,
                        authorization: authType
                    });
                    this.setConfigurationForm(authType);
                    this.setDynamicInner(ref, authType);
                    if (this._configurationFormGroupProvider.configurationFormGroup)
                        this._configurationFormGroupProvider.configurationFormGroup.patchValue(configuration);
                }
            })
        ]);
    }
    setConfigurationForm(type) {
        switch (type) {
            case src_lib_automation_globals__WEBPACK_IMPORTED_MODULE_1__.API_CALL_AUTHORIZATION.BASIC:
                this._configurationFormGroupProvider.configurationFormGroup = this._formBuilder.group(new src_lib_automation_classes_api_call_configuration__WEBPACK_IMPORTED_MODULE_0__.BasicAuthConfiguration());
                break;
            case src_lib_automation_globals__WEBPACK_IMPORTED_MODULE_1__.API_CALL_AUTHORIZATION.JWT_BEARER_LOGIN:
                this._configurationFormGroupProvider.configurationFormGroup = this._formBuilder.group(new src_lib_automation_classes_api_call_configuration__WEBPACK_IMPORTED_MODULE_0__.JWTTokenLoginConfiguration());
                break;
            case src_lib_automation_globals__WEBPACK_IMPORTED_MODULE_1__.API_CALL_AUTHORIZATION.OAUTH2:
                this._configurationFormGroupProvider.configurationFormGroup = this._formBuilder.group(new src_lib_automation_classes_api_call_configuration__WEBPACK_IMPORTED_MODULE_0__.OAuth2Configuration());
                break;
            case src_lib_automation_globals__WEBPACK_IMPORTED_MODULE_1__.API_CALL_AUTHORIZATION.STOLEN_JWT_BEARER:
                this._configurationFormGroupProvider.configurationFormGroup = this._formBuilder.group(new src_lib_automation_classes_api_call_configuration__WEBPACK_IMPORTED_MODULE_0__.StolenJWTTokenConfiguration());
                break;
        }
    }
    setDynamicInner(ref, type) {
        if (!ref)
            return;
        ref.clear();
        if (typeof type !== 'number')
            return;
        let injector = _angular_core__WEBPACK_IMPORTED_MODULE_12__.Injector.create({
            providers: [
                { provide: _interfaces__WEBPACK_IMPORTED_MODULE_2__.FORM_GROUP, useValue: this._configurationFormGroupProvider.configurationFormGroup },
                { provide: _interfaces__WEBPACK_IMPORTED_MODULE_2__.SUBMIT_CONFIGURATION_PROVIDER, useValue: this._submitConfigurationProvider }
            ]
        });
        let index = 0;
        if (type === src_lib_automation_globals__WEBPACK_IMPORTED_MODULE_1__.API_CALL_AUTHORIZATION.BASIC || type === src_lib_automation_globals__WEBPACK_IMPORTED_MODULE_1__.API_CALL_AUTHORIZATION.JWT_BEARER_LOGIN) {
            let factory = this._componentFactoryResolver.resolveComponentFactory(_dynamic_input_username_password_combination_username_password_combination_component__WEBPACK_IMPORTED_MODULE_6__.UsernamePasswordCombinationComponent);
            ref.createComponent(factory, index, injector);
            index++;
        }
        if (type === src_lib_automation_globals__WEBPACK_IMPORTED_MODULE_1__.API_CALL_AUTHORIZATION.JWT_BEARER_LOGIN) {
            let factory = this._componentFactoryResolver.resolveComponentFactory(_dynamic_input_endpoint_input_endpoint_input_component__WEBPACK_IMPORTED_MODULE_5__.EndpointInputComponent);
            ref.createComponent(factory, index, injector);
            index++;
        }
        if (type === src_lib_automation_globals__WEBPACK_IMPORTED_MODULE_1__.API_CALL_AUTHORIZATION.STOLEN_JWT_BEARER) {
            let factory = this._componentFactoryResolver.resolveComponentFactory(_dynamic_input_access_token_input_access_token_input_component__WEBPACK_IMPORTED_MODULE_3__.AccessTokenInputComponent);
            ref.createComponent(factory, index, injector);
            index++;
        }
        if (type === src_lib_automation_globals__WEBPACK_IMPORTED_MODULE_1__.API_CALL_AUTHORIZATION.JWT_BEARER_LOGIN) {
            let factory = this._componentFactoryResolver.resolveComponentFactory(_dynamic_input_api_login_test_api_login_test_component__WEBPACK_IMPORTED_MODULE_4__.ApiLoginTestComponent);
            ref.createComponent(factory, index, injector);
            index++;
        }
    }
}
ApiCallConfiguratorComponent.ɵfac = function ApiCallConfiguratorComponent_Factory(t) { return new (t || ApiCallConfiguratorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_interfaces__WEBPACK_IMPORTED_MODULE_2__.FORM_GROUP_PROVIDER), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_interfaces__WEBPACK_IMPORTED_MODULE_2__.CONFIGURATION_FORM_GROUP_PROVIDER), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_interfaces__WEBPACK_IMPORTED_MODULE_2__.SUBMIT_CONFIGURATION_PROVIDER), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__.ComponentFactoryResolver), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_lib_automation_services_configure_api_call_service__WEBPACK_IMPORTED_MODULE_7__.ConfigureApiCallService)); };
ApiCallConfiguratorComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({ type: ApiCallConfiguratorComponent, selectors: [["app-api-call-configurator"]], viewQuery: function ApiCallConfiguratorComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_c0, 5, _angular_core__WEBPACK_IMPORTED_MODULE_12__.ViewContainerRef);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.ref = _t.first);
    } }, decls: 8, vars: 1, consts: [[1, "body", 3, "formGroup"], ["appearance", "outline", 1, "width"], ["type", "text", "formControlName", "endpoint", "matInput", "", "placeholder", "z.B. https://example.com/api/calculate"], ["formControlName", "authorization", "appearance", "outline", 1, "select-api-authorization"], ["dynamicContent", ""]], template: function ApiCallConfiguratorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 0)(1, "mat-form-field", 1)(2, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](3, "Berechnungsendpunkt");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](4, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](5, "app-select-api-authorization", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](6, ApiCallConfiguratorComponent_ng_template_6_Template, 0, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("formGroup", ctx.formGroupProvider.formGroup);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatLabel, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.DefaultValueAccessor, _angular_material_input__WEBPACK_IMPORTED_MODULE_15__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControlName, _select_api_authorization_select_api_authorization_component__WEBPACK_IMPORTED_MODULE_8__.SelectApiAuthorizationComponent], styles: [".select-api-authorization[_ngcontent-%COMP%] {\n    width: 300px;\n    display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS1jYWxsLWNvbmZpZ3VyYXRvci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksWUFBWTtJQUNaLGNBQWM7QUFDbEIiLCJmaWxlIjoiYXBpLWNhbGwtY29uZmlndXJhdG9yLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc2VsZWN0LWFwaS1hdXRob3JpemF0aW9uIHtcbiAgICB3aWR0aDogMzAwcHg7XG4gICAgZGlzcGxheTogYmxvY2s7XG59XG4iXX0= */"] });


/***/ }),

/***/ 62701:
/*!********************************************************************************************************!*\
  !*** ./src/lib/automation/components/api-configuration-preview/api-configuration-preview.component.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiConfigurationPreviewComponent": () => (/* binding */ ApiConfigurationPreviewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _services_configure_api_call_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/configure-api-call.service */ 31129);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _pipes_api_authorization_type_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pipes/api-authorization-type.pipe */ 58308);




class ApiConfigurationPreviewComponent {
  constructor(configureApiCallService) {
    this.configureApiCallService = configureApiCallService;
  }

  ngOnInit() {}

}

ApiConfigurationPreviewComponent.ɵfac = function ApiConfigurationPreviewComponent_Factory(t) {
  return new (t || ApiConfigurationPreviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_configure_api_call_service__WEBPACK_IMPORTED_MODULE_0__.ConfigureApiCallService));
};

ApiConfigurationPreviewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: ApiConfigurationPreviewComponent,
  selectors: [["app-api-configuration-preview"]],
  decls: 8,
  vars: 8,
  consts: [[1, "body"], [1, "endpoint"], [1, "request"]],
  template: function ApiConfigurationPreviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](6, "apiAuthorizationType");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](7, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    }

    if (rf & 2) {
      let tmp_0_0;
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", (tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](3, 2, ctx.configureApiCallService.configuration$)) == null ? null : tmp_0_0.calculationEndpoint, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](6, 4, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](7, 6, ctx.configureApiCallService.authType$)), " ");
    }
  },
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.AsyncPipe, _pipes_api_authorization_type_pipe__WEBPACK_IMPORTED_MODULE_1__.ApiAuthorizationTypePipe],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcGktY29uZmlndXJhdGlvbi1wcmV2aWV3LmNvbXBvbmVudC5jc3MifQ== */"]
});

/***/ }),

/***/ 28435:
/*!********************************************************************************************************!*\
  !*** ./src/lib/automation/components/dynamic-input/access-token-input/access-token-input.component.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AccessTokenInputComponent": () => (/* binding */ AccessTokenInputComponent)
/* harmony export */ });
/* harmony import */ var src_lib_automation_interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/lib/automation/interfaces */ 7686);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ 75074);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ 68562);





class AccessTokenInputComponent {
    constructor(formGroup) {
        this.formGroup = formGroup;
    }
    ngOnInit() {
    }
}
AccessTokenInputComponent.ɵfac = function AccessTokenInputComponent_Factory(t) { return new (t || AccessTokenInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_lib_automation_interfaces__WEBPACK_IMPORTED_MODULE_0__.FORM_GROUP)); };
AccessTokenInputComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AccessTokenInputComponent, selectors: [["app-access-token-input"]], decls: 5, vars: 1, consts: [[1, "body", 3, "formGroup"], ["appearance", "outline", 1, "width"], ["rows", "6", "formControlName", "jwtToken", "matInput", ""]], template: function AccessTokenInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "mat-form-field", 1)(2, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Bearer Access Token");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "textarea", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.formGroup);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__.MatLabel, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_material_input__WEBPACK_IMPORTED_MODULE_4__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhY2Nlc3MtdG9rZW4taW5wdXQuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 15474:
/*!************************************************************************************************!*\
  !*** ./src/lib/automation/components/dynamic-input/api-login-test/api-login-test.component.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiLoginTestComponent": () => (/* binding */ ApiLoginTestComponent)
/* harmony export */ });
/* harmony import */ var src_lib_automation_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/lib/automation/globals */ 66419);
/* harmony import */ var src_lib_automation_interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/lib/automation/interfaces */ 7686);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_lib_automation_services_configure_api_call_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/lib/automation/services/configure-api-call.service */ 31129);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var ngx_json_viewer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-json-viewer */ 48623);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 84522);








const _c0 = function (a0, a1) {
  return {
    "success": a0,
    "error": a1
  };
};

function ApiLoginTestComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](1, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "ngx-json-viewer", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](4, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction2"](8, _c0, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](1, 2, ctx_r0.configureApiCallService.accessGrantedStatus$) === ctx_r0.ACCESS_GRANTED_STATUS.SUCCEEDED, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 4, ctx_r0.configureApiCallService.accessGrantedStatus$) === ctx_r0.ACCESS_GRANTED_STATUS.FAILED));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("json", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](4, 6, ctx_r0.configureApiCallService.loginResponse$));
  }
}

class ApiLoginTestComponent {
  constructor(submitConfigurationProvider, configureApiCallService) {
    this.submitConfigurationProvider = submitConfigurationProvider;
    this.configureApiCallService = configureApiCallService;
    this.ACCESS_GRANTED_STATUS = src_lib_automation_globals__WEBPACK_IMPORTED_MODULE_0__.ACCESS_GRANTED_STATUS;
  }

  ngOnInit() {}

  testLogin() {
    this.configureApiCallService.setAccessGrantedStatus(src_lib_automation_globals__WEBPACK_IMPORTED_MODULE_0__.ACCESS_GRANTED_STATUS.NOT_TESTED);
    this.submitConfigurationProvider.takeConfiguration();
    this.configureApiCallService.loginBearerToken().subscribe(result => {
      this.configureApiCallService.setLoginResponse(result);
      this.configureApiCallService.setAccessGrantedStatus(src_lib_automation_globals__WEBPACK_IMPORTED_MODULE_0__.ACCESS_GRANTED_STATUS.SUCCEEDED);
    }, result => {
      this.configureApiCallService.setLoginResponse(result);
      this.configureApiCallService.setAccessGrantedStatus(src_lib_automation_globals__WEBPACK_IMPORTED_MODULE_0__.ACCESS_GRANTED_STATUS.FAILED);
    });
  }

}

ApiLoginTestComponent.ɵfac = function ApiLoginTestComponent_Factory(t) {
  return new (t || ApiLoginTestComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_lib_automation_interfaces__WEBPACK_IMPORTED_MODULE_1__.SUBMIT_CONFIGURATION_PROVIDER), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_lib_automation_services_configure_api_call_service__WEBPACK_IMPORTED_MODULE_2__.ConfigureApiCallService));
};

ApiLoginTestComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: ApiLoginTestComponent,
  selectors: [["app-api-login-test"]],
  decls: 5,
  vars: 3,
  consts: [[1, "body"], ["class", "response-preview", 3, "ngClass", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "response-preview", 3, "ngClass"], [3, "json"]],
  template: function ApiLoginTestComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, ApiLoginTestComponent_div_1_Template, 5, 11, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "button", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ApiLoginTestComponent_Template_button_click_3_listener() {
        return ctx.testLogin();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Test Login");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 1, ctx.configureApiCallService.loginResponse$));
    }
  },
  directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, ngx_json_viewer__WEBPACK_IMPORTED_MODULE_5__.NgxJsonViewerComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.AsyncPipe],
  styles: [".response-preview[_ngcontent-%COMP%] {\n    margin-bottom: 0.5rem;\n    padding: 1rem;\n}\n\n.response-preview.success[_ngcontent-%COMP%] {\n    background-color: #f4fff4;\n    border-radius: 3px;\n}\n\n.response-preview.error[_ngcontent-%COMP%] {\n    background-color: #fff4f4;\n    border-radius: 3px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS1sb2dpbi10ZXN0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxxQkFBcUI7SUFDckIsYUFBYTtBQUNqQjs7QUFFQTtJQUNJLHlCQUF5QjtJQUN6QixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsa0JBQWtCO0FBQ3RCIiwiZmlsZSI6ImFwaS1sb2dpbi10ZXN0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucmVzcG9uc2UtcHJldmlldyB7XG4gICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICAgIHBhZGRpbmc6IDFyZW07XG59XG5cbi5yZXNwb25zZS1wcmV2aWV3LnN1Y2Nlc3Mge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNGZmZjQ7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xufVxuXG4ucmVzcG9uc2UtcHJldmlldy5lcnJvciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjRmNDtcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG59XG4iXX0= */"]
});

/***/ }),

/***/ 33874:
/*!************************************************************************************************!*\
  !*** ./src/lib/automation/components/dynamic-input/endpoint-input/endpoint-input.component.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EndpointInputComponent": () => (/* binding */ EndpointInputComponent)
/* harmony export */ });
/* harmony import */ var src_lib_automation_interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/lib/automation/interfaces */ 7686);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ 75074);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ 68562);





class EndpointInputComponent {
    constructor(formGroup) {
        this.formGroup = formGroup;
    }
    ngOnInit() {
    }
}
EndpointInputComponent.ɵfac = function EndpointInputComponent_Factory(t) { return new (t || EndpointInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_lib_automation_interfaces__WEBPACK_IMPORTED_MODULE_0__.FORM_GROUP)); };
EndpointInputComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: EndpointInputComponent, selectors: [["app-endpoint-input"]], decls: 5, vars: 1, consts: [[1, "body", 3, "formGroup"], ["appearance", "outline", 1, "width"], ["formControlName", "loginEndpoint", "matInput", "", "placeholder", "z.B. https://example.com/token"]], template: function EndpointInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "mat-form-field", 1)(2, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Authorisierungsendpunkt");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.formGroup);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__.MatLabel, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_material_input__WEBPACK_IMPORTED_MODULE_4__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlbmRwb2ludC1pbnB1dC5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 67562:
/*!******************************************************************************************************************************!*\
  !*** ./src/lib/automation/components/dynamic-input/username-password-combination/username-password-combination.component.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UsernamePasswordCombinationComponent": () => (/* binding */ UsernamePasswordCombinationComponent)
/* harmony export */ });
/* harmony import */ var src_lib_automation_interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/lib/automation/interfaces */ 7686);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ 75074);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ 68562);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 84522);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 57822);







class UsernamePasswordCombinationComponent {
    constructor(formGroup) {
        this.formGroup = formGroup;
        this.showPassword = false;
    }
    ngOnInit() {
    }
}
UsernamePasswordCombinationComponent.ɵfac = function UsernamePasswordCombinationComponent_Factory(t) { return new (t || UsernamePasswordCombinationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_lib_automation_interfaces__WEBPACK_IMPORTED_MODULE_0__.FORM_GROUP)); };
UsernamePasswordCombinationComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: UsernamePasswordCombinationComponent, selectors: [["app-username-password-combination"]], decls: 12, vars: 3, consts: [[1, "body", 3, "formGroup"], ["appearance", "outline", 1, "width"], ["type", "text", "autocomplete", "off", "formControlName", "userName", "matInput", ""], ["autocomplete", "off", "formControlName", "password", "matInput", "", 3, "type"], ["mat-icon-button", "", "matSuffix", "", 3, "click"]], template: function UsernamePasswordCombinationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "mat-form-field", 1)(2, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Benutzername");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-form-field", 1)(6, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Passwort");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UsernamePasswordCombinationComponent_Template_button_click_9_listener() { return ctx.showPassword = !ctx.showPassword; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.formGroup);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("type", ctx.showPassword ? "text" : "password");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.showPassword ? "visibility" : "visibility_off");
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__.MatLabel, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_material_input__WEBPACK_IMPORTED_MODULE_4__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__.MatSuffix, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon], styles: [".body[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    grid-column-gap: 1rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXJuYW1lLXBhc3N3b3JkLWNvbWJpbmF0aW9uLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxhQUFhO0lBQ2IsOEJBQThCO0lBQzlCLHFCQUFxQjtBQUN6QiIsImZpbGUiOiJ1c2VybmFtZS1wYXNzd29yZC1jb21iaW5hdGlvbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJvZHkge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xuICAgIGdyaWQtY29sdW1uLWdhcDogMXJlbTtcbn0iXX0= */"] });


/***/ }),

/***/ 83393:
/*!******************************************************************************************************!*\
  !*** ./src/lib/automation/components/select-api-authorization/select-api-authorization.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectApiAuthorizationComponent": () => (/* binding */ SelectApiAuthorizationComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../globals */ 66419);
/* harmony import */ var src_app_services_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/data.service */ 52468);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ 75074);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/select */ 57371);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/core */ 59121);










function SelectApiAuthorizationComponent_mat_form_field_1_mat_option_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-option", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const wrapper_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", wrapper_r4.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", wrapper_r4.display, " ");
} }
function SelectApiAuthorizationComponent_mat_form_field_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-form-field", 3)(1, "mat-label", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Authorisierung w\u00E4hlen");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "mat-select", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, SelectApiAuthorizationComponent_mat_form_field_1_mat_option_4_Template, 2, 2, "mat-option", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("appearance", ctx_r0.appearance);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formControl", ctx_r0.valueControl);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r0.authorizationTypes);
} }
function SelectApiAuthorizationComponent_ng_template_2_mat_option_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-option", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const wrapper_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", wrapper_r6.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", wrapper_r6.display, " ");
} }
function SelectApiAuthorizationComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-label", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Authorisierung w\u00E4hlen");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-select", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, SelectApiAuthorizationComponent_ng_template_2_mat_option_3_Template, 2, 2, "mat-option", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formControl", ctx_r2.valueControl);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.authorizationTypes);
} }
class SelectApiAuthorizationComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.appearance = null;
        this.valueControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(_globals__WEBPACK_IMPORTED_MODULE_0__.API_CALL_AUTHORIZATION.NO_AUTH);
        this.authorizationTypes = Object.values(_globals__WEBPACK_IMPORTED_MODULE_0__.API_CALL_AUTHORIZATION).filter(x => typeof x === 'number').map((x) => {
            return { display: (0,_globals__WEBPACK_IMPORTED_MODULE_0__.apiCallAuthorizationTypeToString)(x), type: x.valueOf() };
        });
        this._subscriptions = [];
        this.onTouched = () => { };
        this.registerOnTouched = (fn) => this.onTouched = fn;
        this.writeValue = (val) => this.valueControl.patchValue(val);
    }
    ngOnDestroy() {
        for (let sub of this._subscriptions)
            sub.unsubscribe();
        this._subscriptions = [];
    }
    ngOnInit() {
    }
    registerOnChange(fn) {
        this._subscriptions.push(this.valueControl.valueChanges.subscribe(fn));
    }
    setDisabledState(isDisabled) {
        isDisabled ? this.valueControl.disable() : this.valueControl.enable();
    }
}
SelectApiAuthorizationComponent.ɵfac = function SelectApiAuthorizationComponent_Factory(t) { return new (t || SelectApiAuthorizationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_data_service__WEBPACK_IMPORTED_MODULE_1__.DataService)); };
SelectApiAuthorizationComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: SelectApiAuthorizationComponent, selectors: [["app-select-api-authorization"]], inputs: { appearance: "appearance" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵProvidersFeature"]([
            {
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NG_VALUE_ACCESSOR,
                useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(() => SelectApiAuthorizationComponent),
                multi: true
            }
        ])], decls: 4, vars: 2, consts: [[1, "body"], ["class", "width", 3, "appearance", 4, "ngIf", "ngIfElse"], ["noMatFormField", ""], [1, "width", 3, "appearance"], [1, "label"], [3, "formControl"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"]], template: function SelectApiAuthorizationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, SelectApiAuthorizationComponent_mat_form_field_1_Template, 5, 3, "mat-form-field", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, SelectApiAuthorizationComponent_ng_template_2_Template, 4, 2, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.appearance)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_6__.MatSelect, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlDirective, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_material_core__WEBPACK_IMPORTED_MODULE_7__.MatOption], styles: [".width[_ngcontent-%COMP%] {\n    width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdC1hcGktYXV0aG9yaXphdGlvbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksV0FBVztBQUNmIiwiZmlsZSI6InNlbGVjdC1hcGktYXV0aG9yaXphdGlvbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLndpZHRoIHtcbiAgICB3aWR0aDogMTAwJTtcbn0iXX0= */"] });


/***/ }),

/***/ 66419:
/*!***************************************!*\
  !*** ./src/lib/automation/globals.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ACCESS_GRANTED_STATUS": () => (/* binding */ ACCESS_GRANTED_STATUS),
/* harmony export */   "API_CALL_AUTHORIZATION": () => (/* binding */ API_CALL_AUTHORIZATION),
/* harmony export */   "CONFIGURATION_ERROR": () => (/* binding */ CONFIGURATION_ERROR),
/* harmony export */   "apiCallAuthorizationTypeToString": () => (/* binding */ apiCallAuthorizationTypeToString)
/* harmony export */ });
var API_CALL_AUTHORIZATION;
(function (API_CALL_AUTHORIZATION) {
    API_CALL_AUTHORIZATION[API_CALL_AUTHORIZATION["NO_AUTH"] = 0] = "NO_AUTH";
    API_CALL_AUTHORIZATION[API_CALL_AUTHORIZATION["BASIC"] = 1] = "BASIC";
    API_CALL_AUTHORIZATION[API_CALL_AUTHORIZATION["JWT_BEARER_LOGIN"] = 2] = "JWT_BEARER_LOGIN";
    API_CALL_AUTHORIZATION[API_CALL_AUTHORIZATION["STOLEN_JWT_BEARER"] = 3] = "STOLEN_JWT_BEARER";
    API_CALL_AUTHORIZATION[API_CALL_AUTHORIZATION["OAUTH2"] = 4] = "OAUTH2";
})(API_CALL_AUTHORIZATION || (API_CALL_AUTHORIZATION = {}));
var CONFIGURATION_ERROR;
(function (CONFIGURATION_ERROR) {
    CONFIGURATION_ERROR[CONFIGURATION_ERROR["NO_AUTH_TYPE"] = 0] = "NO_AUTH_TYPE";
    CONFIGURATION_ERROR[CONFIGURATION_ERROR["NO_CONFIGURATION"] = 1] = "NO_CONFIGURATION";
    CONFIGURATION_ERROR[CONFIGURATION_ERROR["NO_CALCULATION_ENDPOINT"] = 2] = "NO_CALCULATION_ENDPOINT";
    CONFIGURATION_ERROR[CONFIGURATION_ERROR["NO_USERNAME"] = 3] = "NO_USERNAME";
    CONFIGURATION_ERROR[CONFIGURATION_ERROR["NO_PASSWORD"] = 4] = "NO_PASSWORD";
    CONFIGURATION_ERROR[CONFIGURATION_ERROR["NO_AUTH_ENDPOINT"] = 5] = "NO_AUTH_ENDPOINT";
})(CONFIGURATION_ERROR || (CONFIGURATION_ERROR = {}));
var ACCESS_GRANTED_STATUS;
(function (ACCESS_GRANTED_STATUS) {
    ACCESS_GRANTED_STATUS[ACCESS_GRANTED_STATUS["NOT_TESTED"] = 0] = "NOT_TESTED";
    ACCESS_GRANTED_STATUS[ACCESS_GRANTED_STATUS["SUCCEEDED"] = 1] = "SUCCEEDED";
    ACCESS_GRANTED_STATUS[ACCESS_GRANTED_STATUS["FAILED"] = 2] = "FAILED";
})(ACCESS_GRANTED_STATUS || (ACCESS_GRANTED_STATUS = {}));
function apiCallAuthorizationTypeToString(type) {
    if (typeof type !== 'number')
        return null;
    switch (type.valueOf()) {
        case API_CALL_AUTHORIZATION.NO_AUTH:
            return 'Ohne Autorisierung';
        case API_CALL_AUTHORIZATION.BASIC:
            return 'Basic Auth';
        case API_CALL_AUTHORIZATION.JWT_BEARER_LOGIN:
            return 'JWT Bearer (mit Login Endpunkt)';
        case API_CALL_AUTHORIZATION.OAUTH2:
            return 'OAuth2';
        case API_CALL_AUTHORIZATION.STOLEN_JWT_BEARER:
            return 'JWT Bearer (nur Token)';
    }
}


/***/ }),

/***/ 7686:
/*!******************************************!*\
  !*** ./src/lib/automation/interfaces.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONFIGURATION_FORM_GROUP_PROVIDER": () => (/* binding */ CONFIGURATION_FORM_GROUP_PROVIDER),
/* harmony export */   "FORM_GROUP": () => (/* binding */ FORM_GROUP),
/* harmony export */   "FORM_GROUP_PROVIDER": () => (/* binding */ FORM_GROUP_PROVIDER),
/* harmony export */   "SUBMIT_CONFIGURATION_PROVIDER": () => (/* binding */ SUBMIT_CONFIGURATION_PROVIDER)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 22560);

const FORM_GROUP = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("FORM_GROUP");
const FORM_GROUP_PROVIDER = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("FORM_GROUP_PROVIDER");
const CONFIGURATION_FORM_GROUP_PROVIDER = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("CONFIGURATION_FORM_GROUP_PROVIDER");
const SUBMIT_CONFIGURATION_PROVIDER = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("SUBMIT_CONFIGURATION_PROVIDER");


/***/ }),

/***/ 58308:
/*!*****************************************************************!*\
  !*** ./src/lib/automation/pipes/api-authorization-type.pipe.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiAuthorizationTypePipe": () => (/* binding */ ApiAuthorizationTypePipe)
/* harmony export */ });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ 66419);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);


class ApiAuthorizationTypePipe {
    transform(value) {
        return (0,_globals__WEBPACK_IMPORTED_MODULE_0__.apiCallAuthorizationTypeToString)(value);
    }
}
ApiAuthorizationTypePipe.ɵfac = function ApiAuthorizationTypePipe_Factory(t) { return new (t || ApiAuthorizationTypePipe)(); };
ApiAuthorizationTypePipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({ name: "apiAuthorizationType", type: ApiAuthorizationTypePipe, pure: true });


/***/ }),

/***/ 31129:
/*!*******************************************************************!*\
  !*** ./src/lib/automation/services/configure-api-call.service.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigureApiCallService": () => (/* binding */ ConfigureApiCallService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 58987);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 84505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 61555);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 19193);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 86942);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 83910);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 59151);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 59095);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals */ 66419);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 22560);






class ConfigureApiCallService {
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        this._authType = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(null);
        this._configuration = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(null);
        this._accessGrantedStatus = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(_globals__WEBPACK_IMPORTED_MODULE_0__.ACCESS_GRANTED_STATUS.NOT_TESTED);
        this._loginResponse = new rxjs__WEBPACK_IMPORTED_MODULE_2__.ReplaySubject(1);
        this.authType$ = this._authType.asObservable();
        this.configuration$ = this._configuration.asObservable();
        this.configurationValid$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.combineLatest)([this.authType$, this.configuration$]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(([authType, configuration]) => {
            let errors = [];
            if (typeof authType?.valueOf() !== 'number' ?? true)
                errors.push(_globals__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION_ERROR.NO_AUTH_TYPE);
            if (!configuration)
                errors.push(_globals__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION_ERROR.NO_CONFIGURATION);
            else {
                if (typeof configuration.calculationEndpoint !== 'string')
                    errors.push(_globals__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION_ERROR.NO_CALCULATION_ENDPOINT);
                switch (authType?.valueOf() ?? null) {
                    case _globals__WEBPACK_IMPORTED_MODULE_0__.API_CALL_AUTHORIZATION.BASIC.valueOf():
                        if (typeof configuration.password !== 'string')
                            errors.push(_globals__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION_ERROR.NO_PASSWORD);
                        if (typeof configuration.userName !== 'string')
                            errors.push(_globals__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION_ERROR.NO_USERNAME);
                        break;
                    case _globals__WEBPACK_IMPORTED_MODULE_0__.API_CALL_AUTHORIZATION.JWT_BEARER_LOGIN.valueOf():
                        if (typeof configuration.password !== 'string')
                            errors.push(_globals__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION_ERROR.NO_PASSWORD);
                        if (typeof configuration.userName !== 'string')
                            errors.push(_globals__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION_ERROR.NO_USERNAME);
                        if (typeof configuration.loginEndpoint !== 'string')
                            errors.push(_globals__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION_ERROR.NO_AUTH_ENDPOINT);
                        break;
                    case _globals__WEBPACK_IMPORTED_MODULE_0__.API_CALL_AUTHORIZATION.OAUTH2.valueOf():
                        break;
                    case _globals__WEBPACK_IMPORTED_MODULE_0__.API_CALL_AUTHORIZATION.STOLEN_JWT_BEARER.valueOf():
                        if (typeof configuration.jwtToken !== 'string')
                            errors.push(_globals__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION_ERROR.NO_USERNAME);
                        break;
                }
            }
            return { valid: errors.length === 0, invalid: errors.length > 0, errors: errors };
        }));
        this.accessGrantedStatus$ = this._accessGrantedStatus.asObservable();
        this.loginResponse$ = this._loginResponse.asObservable();
        this.setAccessGrantedStatus = (status) => this._accessGrantedStatus.next(status);
        this.setAuthType = (type) => this._authType.next(type);
        this.setConfiguration = (configuration) => this._configuration.next(configuration);
        this.setLoginResponse = (response) => this._loginResponse.next(response);
    }
    loginBearerToken() {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.combineLatest)([this.authType$, this.configuration$]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.filter)(([authType, configuration]) => authType === _globals__WEBPACK_IMPORTED_MODULE_0__.API_CALL_AUTHORIZATION.JWT_BEARER_LOGIN), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)(([authType, configuration]) => {
            return this._httpClient.post(configuration.loginEndpoint, new _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpParams()
                .set('userName', configuration.userName)
                .set('password', configuration.password)
                .set('grant_type', 'password'));
        }));
    }
}
ConfigureApiCallService.ɵfac = function ConfigureApiCallService_Factory(t) { return new (t || ConfigureApiCallService)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClient)); };
ConfigureApiCallService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjectable"]({ token: ConfigureApiCallService, factory: ConfigureApiCallService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 10852:
/*!*******************************************************!*\
  !*** ./src/lib/process-builder/globals/i-function.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FUNCTIONS_CONFIG_TOKEN": () => (/* binding */ FUNCTIONS_CONFIG_TOKEN)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 22560);

const FUNCTIONS_CONFIG_TOKEN = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("FUNCTION_CONFIG");


/***/ }),

/***/ 67371:
/*!********************************************************!*\
  !*** ./src/lib/process-builder/globals/i-interface.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "INTERFACES_CONFIG_TOKEN": () => (/* binding */ INTERFACES_CONFIG_TOKEN)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 22560);

const INTERFACES_CONFIG_TOKEN = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("INTERFACE_CONFIG");


/***/ }),

/***/ 49075:
/*!****************************************************!*\
  !*** ./src/lib/process-builder/globals/i-param.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PARAMS_CONFIG_TOKEN": () => (/* binding */ PARAMS_CONFIG_TOKEN)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 22560);

const PARAMS_CONFIG_TOKEN = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("PARAM_CONFIG");


/***/ }),

/***/ 37088:
/*!*********************************************************************!*\
  !*** ./src/lib/process-builder/globals/i-process-builder-config.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PROCESS_BUILDER_CONFIG_TOKEN": () => (/* binding */ PROCESS_BUILDER_CONFIG_TOKEN)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 22560);

const PROCESS_BUILDER_CONFIG_TOKEN = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("PROCESS_BUILDER_CONFIG");


/***/ }),

/***/ 30063:
/*!******************************************************************!*\
  !*** ./src/lib/process-builder/globals/pre-defined-functions.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PredefinedFunctions": () => (/* binding */ PredefinedFunctions)
/* harmony export */ });
class PredefinedFunctions {
    customJSMethod(identifier, name = 'custom JS function') {
        return {
            'identifier': identifier,
            'canFail': true,
            'description': 'a self-written, custom javascript code snippet',
            'inputParams': null,
            'name': name,
            'useDynamicInputParams': true,
            'pseudoImplementation': (...args) => args,
            'payload': undefined,
            'output': { 'param': 'dynamic' },
            'requireCustomImplementation': true
        };
    }
    objectToObjectMappingMethod(identifier, name = 'object mapping') {
        return {
            'identifier': identifier,
            'canFail': true,
            'description': 'a method for object-to-object mapping',
            'inputParams': null,
            'name': name,
            'useDynamicInputParams': { typeLimits: ['object'] },
            'pseudoImplementation': (...args) => args,
            'payload': undefined,
            'output': { 'param': 'dynamic' }
        };
    }
}


/***/ }),

/***/ 48225:
/*!************************************************************!*\
  !*** ./src/lib/shared/components/error/error.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorComponent": () => (/* binding */ ErrorComponent)
/* harmony export */ });
/* harmony import */ var src_app_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/animations */ 54000);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);


class ErrorComponent {
    constructor() { }
    ngOnInit() {
    }
}
ErrorComponent.ɵfac = function ErrorComponent_Factory(t) { return new (t || ErrorComponent)(); };
ErrorComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ErrorComponent, selectors: [["app-error"]], decls: 8, vars: 1, consts: [[1, "body"], [1, "message"], [1, "inner"], ["src", "https://giphy.com/embed/Vu7FU5T4RJPo1esgna", "width", "480", "height", "270", "frameBorder", "0", "allowFullScreen", "", 1, "giphy-embed"], [1, "via-giphy"], ["href", "https://giphy.com/gifs/art-geek-systaime-Vu7FU5T4RJPo1esgna"]], template: function ErrorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Content not available yet ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "iframe", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "p", 4)(6, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "via GIPHY");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("@show", undefined);
    } }, styles: [".body[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1;\n    align-items: center;\n    justify-content: center;\n    flex-direction: column;\n    height: 100%;\n    width: 100%;\n    background-color: #ececec;\n}\n\n.message[_ngcontent-%COMP%] {\n    margin: 2rem;\n    line-height: 2rem;\n    font-size: 2rem;\n    color: #a21818;\n}\n\n.inner[_ngcontent-%COMP%] {\n    overflow: hidden;\n    border-radius: 3px;\n    position: relative;\n    box-shadow: 0 0 4px #848484;\n}\n\niframe[_ngcontent-%COMP%] {\n    pointer-events: none;\n}\n\n.via-giphy[_ngcontent-%COMP%] {\n    background-color: #ffffff;\n    position: absolute;\n    right: 0px;\n    bottom: 0px;\n    margin: 0px;\n    display: block;\n    padding: 0.5rem 1rem;\n    border-radius: 2px;\n    font-weight: 700;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9yLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxhQUFhO0lBQ2IsT0FBTztJQUNQLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIsc0JBQXNCO0lBQ3RCLFlBQVk7SUFDWixXQUFXO0lBQ1gseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2YsY0FBYztBQUNsQjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLDJCQUEyQjtBQUMvQjs7QUFFQTtJQUNJLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJLHlCQUF5QjtJQUN6QixrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLFdBQVc7SUFDWCxXQUFXO0lBQ1gsY0FBYztJQUNkLG9CQUFvQjtJQUNwQixrQkFBa0I7SUFDbEIsZ0JBQWdCO0FBQ3BCIiwiZmlsZSI6ImVycm9yLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYm9keSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4OiAxO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VjZWNlYztcbn1cblxuLm1lc3NhZ2Uge1xuICAgIG1hcmdpbjogMnJlbTtcbiAgICBsaW5lLWhlaWdodDogMnJlbTtcbiAgICBmb250LXNpemU6IDJyZW07XG4gICAgY29sb3I6ICNhMjE4MTg7XG59XG5cbi5pbm5lciB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGJveC1zaGFkb3c6IDAgMCA0cHggIzg0ODQ4NDtcbn1cblxuaWZyYW1lIHtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLnZpYS1naXBoeSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcmlnaHQ6IDBweDtcbiAgICBib3R0b206IDBweDtcbiAgICBtYXJnaW46IDBweDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuIl19 */"], data: { animation: [src_app_animations__WEBPACK_IMPORTED_MODULE_0__.showAnimation] } });


/***/ }),

/***/ 49873:
/*!*****************************************!*\
  !*** ./src/lib/shared/shared.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SharedModule": () => (/* binding */ SharedModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _components_error_error_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/error/error.component */ 48225);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);



class SharedModule {
}
SharedModule.ɵfac = function SharedModule_Factory(t) { return new (t || SharedModule)(); };
SharedModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: SharedModule });
SharedModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](SharedModule, { declarations: [_components_error_error_component__WEBPACK_IMPORTED_MODULE_0__.ErrorComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule], exports: [_components_error_error_component__WEBPACK_IMPORTED_MODULE_0__.ErrorComponent] }); })();


/***/ }),

/***/ 14431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 34497);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 36747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 92340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.error(err));


/***/ }),

/***/ 46700:
/*!***************************************************!*\
  !*** ./node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af": 58685,
	"./af.js": 58685,
	"./ar": 254,
	"./ar-dz": 4312,
	"./ar-dz.js": 4312,
	"./ar-kw": 32614,
	"./ar-kw.js": 32614,
	"./ar-ly": 18630,
	"./ar-ly.js": 18630,
	"./ar-ma": 28674,
	"./ar-ma.js": 28674,
	"./ar-sa": 49032,
	"./ar-sa.js": 49032,
	"./ar-tn": 24730,
	"./ar-tn.js": 24730,
	"./ar.js": 254,
	"./az": 53052,
	"./az.js": 53052,
	"./be": 60150,
	"./be.js": 60150,
	"./bg": 63069,
	"./bg.js": 63069,
	"./bm": 13466,
	"./bm.js": 13466,
	"./bn": 18516,
	"./bn-bd": 90557,
	"./bn-bd.js": 90557,
	"./bn.js": 18516,
	"./bo": 26273,
	"./bo.js": 26273,
	"./br": 9588,
	"./br.js": 9588,
	"./bs": 19815,
	"./bs.js": 19815,
	"./ca": 83331,
	"./ca.js": 83331,
	"./cs": 21320,
	"./cs.js": 21320,
	"./cv": 72219,
	"./cv.js": 72219,
	"./cy": 68266,
	"./cy.js": 68266,
	"./da": 66427,
	"./da.js": 66427,
	"./de": 67435,
	"./de-at": 52871,
	"./de-at.js": 52871,
	"./de-ch": 12994,
	"./de-ch.js": 12994,
	"./de.js": 67435,
	"./dv": 82357,
	"./dv.js": 82357,
	"./el": 95649,
	"./el.js": 95649,
	"./en-au": 59961,
	"./en-au.js": 59961,
	"./en-ca": 19878,
	"./en-ca.js": 19878,
	"./en-gb": 3924,
	"./en-gb.js": 3924,
	"./en-ie": 70864,
	"./en-ie.js": 70864,
	"./en-il": 91579,
	"./en-il.js": 91579,
	"./en-in": 30940,
	"./en-in.js": 30940,
	"./en-nz": 16181,
	"./en-nz.js": 16181,
	"./en-sg": 44301,
	"./en-sg.js": 44301,
	"./eo": 85291,
	"./eo.js": 85291,
	"./es": 54529,
	"./es-do": 53764,
	"./es-do.js": 53764,
	"./es-mx": 12584,
	"./es-mx.js": 12584,
	"./es-us": 63425,
	"./es-us.js": 63425,
	"./es.js": 54529,
	"./et": 35203,
	"./et.js": 35203,
	"./eu": 70678,
	"./eu.js": 70678,
	"./fa": 83483,
	"./fa.js": 83483,
	"./fi": 96262,
	"./fi.js": 96262,
	"./fil": 52521,
	"./fil.js": 52521,
	"./fo": 34555,
	"./fo.js": 34555,
	"./fr": 63131,
	"./fr-ca": 88239,
	"./fr-ca.js": 88239,
	"./fr-ch": 21702,
	"./fr-ch.js": 21702,
	"./fr.js": 63131,
	"./fy": 267,
	"./fy.js": 267,
	"./ga": 23821,
	"./ga.js": 23821,
	"./gd": 71753,
	"./gd.js": 71753,
	"./gl": 4074,
	"./gl.js": 4074,
	"./gom-deva": 92762,
	"./gom-deva.js": 92762,
	"./gom-latn": 5969,
	"./gom-latn.js": 5969,
	"./gu": 82809,
	"./gu.js": 82809,
	"./he": 45402,
	"./he.js": 45402,
	"./hi": 315,
	"./hi.js": 315,
	"./hr": 10410,
	"./hr.js": 10410,
	"./hu": 38288,
	"./hu.js": 38288,
	"./hy-am": 67928,
	"./hy-am.js": 67928,
	"./id": 71334,
	"./id.js": 71334,
	"./is": 86959,
	"./is.js": 86959,
	"./it": 34864,
	"./it-ch": 51124,
	"./it-ch.js": 51124,
	"./it.js": 34864,
	"./ja": 36141,
	"./ja.js": 36141,
	"./jv": 29187,
	"./jv.js": 29187,
	"./ka": 42136,
	"./ka.js": 42136,
	"./kk": 94332,
	"./kk.js": 94332,
	"./km": 18607,
	"./km.js": 18607,
	"./kn": 84305,
	"./kn.js": 84305,
	"./ko": 70234,
	"./ko.js": 70234,
	"./ku": 16003,
	"./ku.js": 16003,
	"./ky": 75061,
	"./ky.js": 75061,
	"./lb": 32786,
	"./lb.js": 32786,
	"./lo": 66183,
	"./lo.js": 66183,
	"./lt": 50029,
	"./lt.js": 50029,
	"./lv": 24169,
	"./lv.js": 24169,
	"./me": 68577,
	"./me.js": 68577,
	"./mi": 68177,
	"./mi.js": 68177,
	"./mk": 50337,
	"./mk.js": 50337,
	"./ml": 65260,
	"./ml.js": 65260,
	"./mn": 52325,
	"./mn.js": 52325,
	"./mr": 14695,
	"./mr.js": 14695,
	"./ms": 75334,
	"./ms-my": 37151,
	"./ms-my.js": 37151,
	"./ms.js": 75334,
	"./mt": 63570,
	"./mt.js": 63570,
	"./my": 97963,
	"./my.js": 97963,
	"./nb": 88028,
	"./nb.js": 88028,
	"./ne": 86638,
	"./ne.js": 86638,
	"./nl": 50302,
	"./nl-be": 66782,
	"./nl-be.js": 66782,
	"./nl.js": 50302,
	"./nn": 33501,
	"./nn.js": 33501,
	"./oc-lnc": 50563,
	"./oc-lnc.js": 50563,
	"./pa-in": 50869,
	"./pa-in.js": 50869,
	"./pl": 65302,
	"./pl.js": 65302,
	"./pt": 49687,
	"./pt-br": 74884,
	"./pt-br.js": 74884,
	"./pt.js": 49687,
	"./ro": 79107,
	"./ro.js": 79107,
	"./ru": 33627,
	"./ru.js": 33627,
	"./sd": 30355,
	"./sd.js": 30355,
	"./se": 83427,
	"./se.js": 83427,
	"./si": 11848,
	"./si.js": 11848,
	"./sk": 54590,
	"./sk.js": 54590,
	"./sl": 20184,
	"./sl.js": 20184,
	"./sq": 56361,
	"./sq.js": 56361,
	"./sr": 78965,
	"./sr-cyrl": 81287,
	"./sr-cyrl.js": 81287,
	"./sr.js": 78965,
	"./ss": 25456,
	"./ss.js": 25456,
	"./sv": 70451,
	"./sv.js": 70451,
	"./sw": 77558,
	"./sw.js": 77558,
	"./ta": 51356,
	"./ta.js": 51356,
	"./te": 73693,
	"./te.js": 73693,
	"./tet": 21243,
	"./tet.js": 21243,
	"./tg": 42500,
	"./tg.js": 42500,
	"./th": 55768,
	"./th.js": 55768,
	"./tk": 77761,
	"./tk.js": 77761,
	"./tl-ph": 35780,
	"./tl-ph.js": 35780,
	"./tlh": 29590,
	"./tlh.js": 29590,
	"./tr": 33807,
	"./tr.js": 33807,
	"./tzl": 93857,
	"./tzl.js": 93857,
	"./tzm": 60654,
	"./tzm-latn": 8806,
	"./tzm-latn.js": 8806,
	"./tzm.js": 60654,
	"./ug-cn": 30845,
	"./ug-cn.js": 30845,
	"./uk": 19232,
	"./uk.js": 19232,
	"./ur": 47052,
	"./ur.js": 47052,
	"./uz": 77967,
	"./uz-latn": 32233,
	"./uz-latn.js": 32233,
	"./uz.js": 77967,
	"./vi": 98615,
	"./vi.js": 98615,
	"./x-pseudo": 12320,
	"./x-pseudo.js": 12320,
	"./yo": 31313,
	"./yo.js": 31313,
	"./zh-cn": 64490,
	"./zh-cn.js": 64490,
	"./zh-hk": 55910,
	"./zh-hk.js": 55910,
	"./zh-mo": 98262,
	"./zh-mo.js": 98262,
	"./zh-tw": 44223,
	"./zh-tw.js": 44223
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 46700;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(14431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map