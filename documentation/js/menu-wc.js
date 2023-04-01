'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">storage-manager documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-c402aa64331c7ef4b5e7e184714abf1399f1168b0603c6f712f10abd9f771f9f956dc05d03559f68d8248ba6b7482c1336ab1ea8ab47a568cebf246a75e216f4"' : 'data-target="#xs-components-links-module-AppModule-c402aa64331c7ef4b5e7e184714abf1399f1168b0603c6f712f10abd9f771f9f956dc05d03559f68d8248ba6b7482c1336ab1ea8ab47a568cebf246a75e216f4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-c402aa64331c7ef4b5e7e184714abf1399f1168b0603c6f712f10abd9f771f9f956dc05d03559f68d8248ba6b7482c1336ab1ea8ab47a568cebf246a75e216f4"' :
                                            'id="xs-components-links-module-AppModule-c402aa64331c7ef4b5e7e184714abf1399f1168b0603c6f712f10abd9f771f9f956dc05d03559f68d8248ba6b7482c1336ab1ea8ab47a568cebf246a75e216f4"' }>
                                            <li class="link">
                                                <a href="components/AboutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ApiCallConfiguratorDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiCallConfiguratorDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalculationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalculationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalculationContextOverviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalculationContextOverviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContainerPreviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContainerPreviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditDataDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditDataDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GoodPreviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoodPreviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GoodsPanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoodsPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupsFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupsFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupsPanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupsPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LocalDataComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalDataComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoSolutionDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NoSolutionDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrdersFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectGroupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectGroupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectProductComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectProductComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectUnitComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectUnitComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SolutionAnimationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SolutionAnimationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SolutionPreviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SolutionPreviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SolutionPreviewRenderingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SolutionPreviewRenderingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SolutionValidationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SolutionValidationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SolutionVisualizationDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SolutionVisualizationDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VisualizerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VisualizerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WidgetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WidgetComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-c402aa64331c7ef4b5e7e184714abf1399f1168b0603c6f712f10abd9f771f9f956dc05d03559f68d8248ba6b7482c1336ab1ea8ab47a568cebf246a75e216f4"' : 'data-target="#xs-pipes-links-module-AppModule-c402aa64331c7ef4b5e7e184714abf1399f1168b0603c6f712f10abd9f771f9f956dc05d03559f68d8248ba6b7482c1336ab1ea8ab47a568cebf246a75e216f4"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-c402aa64331c7ef4b5e7e184714abf1399f1168b0603c6f712f10abd9f771f9f956dc05d03559f68d8248ba6b7482c1336ab1ea8ab47a568cebf246a75e216f4"' :
                                            'id="xs-pipes-links-module-AppModule-c402aa64331c7ef4b5e7e184714abf1399f1168b0603c6f712f10abd9f771f9f956dc05d03559f68d8248ba6b7482c1336ab1ea8ab47a568cebf246a75e216f4"' }>
                                            <li class="link">
                                                <a href="pipes/CalculationErrorPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalculationErrorPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ComputedStylePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ComputedStylePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/PrettyLengthPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrettyLengthPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/PrettyVolumePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrettyVolumePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SolutionValidationErrorPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SolutionValidationErrorPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SortedFormArrayPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SortedFormArrayPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AutomationModule.html" data-type="entity-link" >AutomationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AutomationModule-af5ecc74f7f0c30032ffeea6b5fd962522f48e45486674851cbcec20b8a37dd7b859e7fdc399ecb8d00c8902dcb974f627f975f86b03b8cb0cc52bafb1a7d88f"' : 'data-target="#xs-components-links-module-AutomationModule-af5ecc74f7f0c30032ffeea6b5fd962522f48e45486674851cbcec20b8a37dd7b859e7fdc399ecb8d00c8902dcb974f627f975f86b03b8cb0cc52bafb1a7d88f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AutomationModule-af5ecc74f7f0c30032ffeea6b5fd962522f48e45486674851cbcec20b8a37dd7b859e7fdc399ecb8d00c8902dcb974f627f975f86b03b8cb0cc52bafb1a7d88f"' :
                                            'id="xs-components-links-module-AutomationModule-af5ecc74f7f0c30032ffeea6b5fd962522f48e45486674851cbcec20b8a37dd7b859e7fdc399ecb8d00c8902dcb974f627f975f86b03b8cb0cc52bafb1a7d88f"' }>
                                            <li class="link">
                                                <a href="components/AccessTokenInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccessTokenInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ApiCallConfiguratorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiCallConfiguratorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ApiConfigurationPreviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiConfigurationPreviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ApiLoginTestComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiLoginTestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EndpointInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EndpointInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectApiAuthorizationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectApiAuthorizationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsernamePasswordCombinationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsernamePasswordCombinationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AutomationModule-af5ecc74f7f0c30032ffeea6b5fd962522f48e45486674851cbcec20b8a37dd7b859e7fdc399ecb8d00c8902dcb974f627f975f86b03b8cb0cc52bafb1a7d88f"' : 'data-target="#xs-pipes-links-module-AutomationModule-af5ecc74f7f0c30032ffeea6b5fd962522f48e45486674851cbcec20b8a37dd7b859e7fdc399ecb8d00c8902dcb974f627f975f86b03b8cb0cc52bafb1a7d88f"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AutomationModule-af5ecc74f7f0c30032ffeea6b5fd962522f48e45486674851cbcec20b8a37dd7b859e7fdc399ecb8d00c8902dcb974f627f975f86b03b8cb0cc52bafb1a7d88f"' :
                                            'id="xs-pipes-links-module-AutomationModule-af5ecc74f7f0c30032ffeea6b5fd962522f48e45486674851cbcec20b8a37dd7b859e7fdc399ecb8d00c8902dcb974f627f975f86b03b8cb0cc52bafb1a7d88f"' }>
                                            <li class="link">
                                                <a href="pipes/ApiAuthorizationTypePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiAuthorizationTypePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CodeEditorModule.html" data-type="entity-link" >CodeEditorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CodeEditorModule-8af83deb1a51283631ec15dceb9280702b1307cdbae6e3733bb00694e197b60fa4cc01c38b58b487adea7e3dbb2345ec1e7dc2219ed8a2528374bf618e873ae9"' : 'data-target="#xs-components-links-module-CodeEditorModule-8af83deb1a51283631ec15dceb9280702b1307cdbae6e3733bb00694e197b60fa4cc01c38b58b487adea7e3dbb2345ec1e7dc2219ed8a2528374bf618e873ae9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CodeEditorModule-8af83deb1a51283631ec15dceb9280702b1307cdbae6e3733bb00694e197b60fa4cc01c38b58b487adea7e3dbb2345ec1e7dc2219ed8a2528374bf618e873ae9"' :
                                            'id="xs-components-links-module-CodeEditorModule-8af83deb1a51283631ec15dceb9280702b1307cdbae6e3733bb00694e197b60fa4cc01c38b58b487adea7e3dbb2345ec1e7dc2219ed8a2528374bf618e873ae9"' }>
                                            <li class="link">
                                                <a href="components/CodeEditorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CodeEditorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConfirmationModule.html" data-type="entity-link" >ConfirmationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ConfirmationModule-082e89b6a54d197fc85ef2484ae58df361a7a77d74ef1abfe22767482f0c5681c8039a1e480ba9abcc6457565b4bb0e3e863c5b31fc65135a8f7ec258af05cc2"' : 'data-target="#xs-components-links-module-ConfirmationModule-082e89b6a54d197fc85ef2484ae58df361a7a77d74ef1abfe22767482f0c5681c8039a1e480ba9abcc6457565b4bb0e3e863c5b31fc65135a8f7ec258af05cc2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ConfirmationModule-082e89b6a54d197fc85ef2484ae58df361a7a77d74ef1abfe22767482f0c5681c8039a1e480ba9abcc6457565b4bb0e3e863c5b31fc65135a8f7ec258af05cc2"' :
                                            'id="xs-components-links-module-ConfirmationModule-082e89b6a54d197fc85ef2484ae58df361a7a77d74ef1abfe22767482f0c5681c8039a1e480ba9abcc6457565b4bb0e3e863c5b31fc65135a8f7ec258af05cc2"' }>
                                            <li class="link">
                                                <a href="components/ConfirmationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PipelineStoreModule.html" data-type="entity-link" >PipelineStoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PipeRunnerModule.html" data-type="entity-link" >PipeRunnerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PipeRunnerModule-0e92c424fc0e24be224da86dab48626cb7d191874fe347052d54dfbde46700958e417aee836e9366962bd2341a1d50067ce2511fedeb410c330d3163a4120f20"' : 'data-target="#xs-components-links-module-PipeRunnerModule-0e92c424fc0e24be224da86dab48626cb7d191874fe347052d54dfbde46700958e417aee836e9366962bd2341a1d50067ce2511fedeb410c330d3163a4120f20"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PipeRunnerModule-0e92c424fc0e24be224da86dab48626cb7d191874fe347052d54dfbde46700958e417aee836e9366962bd2341a1d50067ce2511fedeb410c330d3163a4120f20"' :
                                            'id="xs-components-links-module-PipeRunnerModule-0e92c424fc0e24be224da86dab48626cb7d191874fe347052d54dfbde46700958e417aee836e9366962bd2341a1d50067ce2511fedeb410c330d3163a4120f20"' }>
                                            <li class="link">
                                                <a href="components/PipeRunnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PipeRunnerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PipelineActionPreviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PipelineActionPreviewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProcedureStoreModule.html" data-type="entity-link" >ProcedureStoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProcessBuilderModule.html" data-type="entity-link" >ProcessBuilderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProcessBuilderModule-5152fe1259904feabdfc8af1ad04b0b0b5bb1de43ad58020312fe1def1460afdae6a3c4862f4ce6634bb77044436ba7f2f341bde0369a11ba73084e7f797d646"' : 'data-target="#xs-components-links-module-ProcessBuilderModule-5152fe1259904feabdfc8af1ad04b0b0b5bb1de43ad58020312fe1def1460afdae6a3c4862f4ce6634bb77044436ba7f2f341bde0369a11ba73084e7f797d646"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProcessBuilderModule-5152fe1259904feabdfc8af1ad04b0b0b5bb1de43ad58020312fe1def1460afdae6a3c4862f4ce6634bb77044436ba7f2f341bde0369a11ba73084e7f797d646"' :
                                            'id="xs-components-links-module-ProcessBuilderModule-5152fe1259904feabdfc8af1ad04b0b0b5bb1de43ad58020312fe1def1460afdae6a3c4862f4ce6634bb77044436ba7f2f341bde0369a11ba73084e7f797d646"' }>
                                            <li class="link">
                                                <a href="components/EmbeddedConfigureErrorGatewayEntranceConnectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmbeddedConfigureErrorGatewayEntranceConnectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmbeddedFunctionImplementationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmbeddedFunctionImplementationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmbeddedFunctionInputSelectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmbeddedFunctionInputSelectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmbeddedFunctionSelectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmbeddedFunctionSelectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmbeddedInputOutputMappingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmbeddedInputOutputMappingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmbeddedInputOutputMappingTableRowComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmbeddedInputOutputMappingTableRowComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmbeddedOutputParamConfigurationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmbeddedOutputParamConfigurationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmbeddedParamEditorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmbeddedParamEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FunctionPreviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FunctionPreviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ParamEditorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParamEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ParamMemberPathPreviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParamMemberPathPreviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ParamMemberPreviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParamMemberPreviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ParamPreviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParamPreviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProcessBuilderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProcessBuilderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskCreationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskCreationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProcessBuilderModule-5152fe1259904feabdfc8af1ad04b0b0b5bb1de43ad58020312fe1def1460afdae6a3c4862f4ce6634bb77044436ba7f2f341bde0369a11ba73084e7f797d646"' : 'data-target="#xs-injectables-links-module-ProcessBuilderModule-5152fe1259904feabdfc8af1ad04b0b0b5bb1de43ad58020312fe1def1460afdae6a3c4862f4ce6634bb77044436ba7f2f341bde0369a11ba73084e7f797d646"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProcessBuilderModule-5152fe1259904feabdfc8af1ad04b0b0b5bb1de43ad58020312fe1def1460afdae6a3c4862f4ce6634bb77044436ba7f2f341bde0369a11ba73084e7f797d646"' :
                                        'id="xs-injectables-links-module-ProcessBuilderModule-5152fe1259904feabdfc8af1ad04b0b0b5bb1de43ad58020312fe1def1460afdae6a3c4862f4ce6634bb77044436ba7f2f341bde0369a11ba73084e7f797d646"' }>
                                        <li class="link">
                                            <a href="injectables/BpmnJsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BpmnJsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ConfirmationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProcessBuilderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProcessBuilderService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-ProcessBuilderModule-5152fe1259904feabdfc8af1ad04b0b0b5bb1de43ad58020312fe1def1460afdae6a3c4862f4ce6634bb77044436ba7f2f341bde0369a11ba73084e7f797d646"' : 'data-target="#xs-pipes-links-module-ProcessBuilderModule-5152fe1259904feabdfc8af1ad04b0b0b5bb1de43ad58020312fe1def1460afdae6a3c4862f4ce6634bb77044436ba7f2f341bde0369a11ba73084e7f797d646"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-ProcessBuilderModule-5152fe1259904feabdfc8af1ad04b0b0b5bb1de43ad58020312fe1def1460afdae6a3c4862f4ce6634bb77044436ba7f2f341bde0369a11ba73084e7f797d646"' :
                                            'id="xs-pipes-links-module-ProcessBuilderModule-5152fe1259904feabdfc8af1ad04b0b0b5bb1de43ad58020312fe1def1460afdae6a3c4862f4ce6634bb77044436ba7f2f341bde0369a11ba73084e7f797d646"' }>
                                            <li class="link">
                                                <a href="pipes/DynamicInputParamsPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DynamicInputParamsPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/InputParamPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputParamPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/InterfacePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InterfacePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ParamPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParamPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ReturnValueStatusPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReturnValueStatusPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/TaskCreationStepPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskCreationStepPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ValidationErrorPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ValidationErrorPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ValidationWarningPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ValidationWarningPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProcessBuilderWrapperModule.html" data-type="entity-link" >ProcessBuilderWrapperModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProcessBuilderWrapperModule-3e7bf770bbf61da318a81a1001ea505d275c08699c58e36715d031cd19ab07ba7cc02e27f519ba132318111f154af82ad8a87d6cc5d839e940c8b5cf7c611f0c"' : 'data-target="#xs-components-links-module-ProcessBuilderWrapperModule-3e7bf770bbf61da318a81a1001ea505d275c08699c58e36715d031cd19ab07ba7cc02e27f519ba132318111f154af82ad8a87d6cc5d839e940c8b5cf7c611f0c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProcessBuilderWrapperModule-3e7bf770bbf61da318a81a1001ea505d275c08699c58e36715d031cd19ab07ba7cc02e27f519ba132318111f154af82ad8a87d6cc5d839e940c8b5cf7c611f0c"' :
                                            'id="xs-components-links-module-ProcessBuilderWrapperModule-3e7bf770bbf61da318a81a1001ea505d275c08699c58e36715d031cd19ab07ba7cc02e27f519ba132318111f154af82ad8a87d6cc5d839e940c8b5cf7c611f0c"' }>
                                            <li class="link">
                                                <a href="components/MethodQuickInteractionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MethodQuickInteractionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProcessBuilderWrapperComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProcessBuilderWrapperComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-02a13b05cd05384d5db9c92e411067e453627ab511b9b3df49f7e2c6ec4ff3e1375a90f1d88b4f2cf4ce4bc75acbd5e3fd045ef13b42a8e663a9fdc3b576420c"' : 'data-target="#xs-components-links-module-SharedModule-02a13b05cd05384d5db9c92e411067e453627ab511b9b3df49f7e2c6ec4ff3e1375a90f1d88b4f2cf4ce4bc75acbd5e3fd045ef13b42a8e663a9fdc3b576420c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-02a13b05cd05384d5db9c92e411067e453627ab511b9b3df49f7e2c6ec4ff3e1375a90f1d88b4f2cf4ce4bc75acbd5e3fd045ef13b42a8e663a9fdc3b576420c"' :
                                            'id="xs-components-links-module-SharedModule-02a13b05cd05384d5db9c92e411067e453627ab511b9b3df49f7e2c6ec4ff3e1375a90f1d88b4f2cf4ce4bc75acbd5e3fd045ef13b42a8e663a9fdc3b576420c"' }>
                                            <li class="link">
                                                <a href="components/ErrorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-SharedModule-02a13b05cd05384d5db9c92e411067e453627ab511b9b3df49f7e2c6ec4ff3e1375a90f1d88b4f2cf4ce4bc75acbd5e3fd045ef13b42a8e663a9fdc3b576420c"' : 'data-target="#xs-directives-links-module-SharedModule-02a13b05cd05384d5db9c92e411067e453627ab511b9b3df49f7e2c6ec4ff3e1375a90f1d88b4f2cf4ce4bc75acbd5e3fd045ef13b42a8e663a9fdc3b576420c"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedModule-02a13b05cd05384d5db9c92e411067e453627ab511b9b3df49f7e2c6ec4ff3e1375a90f1d88b4f2cf4ce4bc75acbd5e3fd045ef13b42a8e663a9fdc3b576420c"' :
                                        'id="xs-directives-links-module-SharedModule-02a13b05cd05384d5db9c92e411067e453627ab511b9b3df49f7e2c6ec4ff3e1375a90f1d88b4f2cf4ce4bc75acbd5e3fd045ef13b42a8e663a9fdc3b576420c"' }>
                                        <li class="link">
                                            <a href="directives/AnimatedCounterDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnimatedCounterDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StorageManagerModule.html" data-type="entity-link" >StorageManagerModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/VisualizationModule.html" data-type="entity-link" >VisualizationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VisualizationModule-2491587cac96678d4626c89a4a01320d0b6857693425e0b1dc2463704c5eabd832c3020e2d24babacd685ff8a8deb1cff39fa77ea8a0d558cbd78845ae2500a3"' : 'data-target="#xs-components-links-module-VisualizationModule-2491587cac96678d4626c89a4a01320d0b6857693425e0b1dc2463704c5eabd832c3020e2d24babacd685ff8a8deb1cff39fa77ea8a0d558cbd78845ae2500a3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VisualizationModule-2491587cac96678d4626c89a4a01320d0b6857693425e0b1dc2463704c5eabd832c3020e2d24babacd685ff8a8deb1cff39fa77ea8a0d558cbd78845ae2500a3"' :
                                            'id="xs-components-links-module-VisualizationModule-2491587cac96678d4626c89a4a01320d0b6857693425e0b1dc2463704c5eabd832c3020e2d24babacd685ff8a8deb1cff39fa77ea8a0d558cbd78845ae2500a3"' }>
                                            <li class="link">
                                                <a href="components/SceneVisualizationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SceneVisualizationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AboutComponent.html" data-type="entity-link" >AboutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CalculationComponent.html" data-type="entity-link" >CalculationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GoodPreviewComponent.html" data-type="entity-link" >GoodPreviewComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GoodsPanelComponent.html" data-type="entity-link" >GoodsPanelComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GroupsPanelComponent.html" data-type="entity-link" >GroupsPanelComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LocalDataComponent.html" data-type="entity-link" >LocalDataComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VisualizerComponent.html" data-type="entity-link" >VisualizerComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AllInOneRowSolver.html" data-type="entity-link" >AllInOneRowSolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/CodemirrorRepository.html" data-type="entity-link" >CodemirrorRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomContextPad.html" data-type="entity-link" >CustomContextPad</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomPalette.html" data-type="entity-link" >CustomPalette</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomRenderer.html" data-type="entity-link" >CustomRenderer</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExemplaryBpmnModel.html" data-type="entity-link" >ExemplaryBpmnModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/GroupDataGenerator.html" data-type="entity-link" >GroupDataGenerator</a>
                            </li>
                            <li class="link">
                                <a href="classes/InjectorInterfacesProvider.html" data-type="entity-link" >InjectorInterfacesProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/InjectorProvider.html" data-type="entity-link" >InjectorProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderDataGenerator.html" data-type="entity-link" >OrderDataGenerator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParameterRepository.html" data-type="entity-link" >ParameterRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/PredefinedFunctionTemplates.html" data-type="entity-link" >PredefinedFunctionTemplates</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProcessBuilderRepository.html" data-type="entity-link" >ProcessBuilderRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/SolutionDataGenerator.html" data-type="entity-link" >SolutionDataGenerator</a>
                            </li>
                            <li class="link">
                                <a href="classes/SolutionPreviewDataGenerator.html" data-type="entity-link" >SolutionPreviewDataGenerator</a>
                            </li>
                            <li class="link">
                                <a href="classes/Solver.html" data-type="entity-link" >Solver</a>
                            </li>
                            <li class="link">
                                <a href="classes/StartLeftBottomSolver.html" data-type="entity-link" >StartLeftBottomSolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/SuperFloSolver.html" data-type="entity-link" >SuperFloSolver</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ApiCallConfiguratorComponentService.html" data-type="entity-link" >ApiCallConfiguratorComponentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ApplicationEffects.html" data-type="entity-link" >ApplicationEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BPMNJsRepository.html" data-type="entity-link" >BPMNJsRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BpmnJsService.html" data-type="entity-link" >BpmnJsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CalculationComponentService.html" data-type="entity-link" >CalculationComponentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfigureApiCallService.html" data-type="entity-link" >ConfigureApiCallService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfirmationService.html" data-type="entity-link" >ConfirmationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CsvService.html" data-type="entity-link" >CsvService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DialogService.html" data-type="entity-link" >DialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileService.html" data-type="entity-link" >FileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IBpmnJSModelEffects.html" data-type="entity-link" >IBpmnJSModelEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ICalculationAttributesEffects.html" data-type="entity-link" >ICalculationAttributesEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IFunctionEffects.html" data-type="entity-link" >IFunctionEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IGroupEffects.html" data-type="entity-link" >IGroupEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IInterfaceEffects.html" data-type="entity-link" >IInterfaceEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IOrderEffects.html" data-type="entity-link" >IOrderEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IParamEffects.html" data-type="entity-link" >IParamEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IPendingProcedureEffects.html" data-type="entity-link" >IPendingProcedureEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IProductEffects.html" data-type="entity-link" >IProductEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ISolutionEffects.html" data-type="entity-link" >ISolutionEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ISolutionPreviewEffects.html" data-type="entity-link" >ISolutionPreviewEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ParamEditorComponentService.html" data-type="entity-link" >ParamEditorComponentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PipeRunnerService.html" data-type="entity-link" >PipeRunnerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProcessBuilderComponentService.html" data-type="entity-link" >ProcessBuilderComponentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProcessBuilderService.html" data-type="entity-link" >ProcessBuilderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SceneVisualizationComponentService.html" data-type="entity-link" >SceneVisualizationComponentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SolutionAnimationComponentService.html" data-type="entity-link" >SolutionAnimationComponentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SolutionValidationService.html" data-type="entity-link" >SolutionValidationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VisualizationService.html" data-type="entity-link" >VisualizationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VisualizerComponentService.html" data-type="entity-link" >VisualizerComponentService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IAlgorithmStatusWrapper.html" data-type="entity-link" >IAlgorithmStatusWrapper</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IApiAuthorizationResponse.html" data-type="entity-link" >IApiAuthorizationResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAutoPlace.html" data-type="entity-link" >IAutoPlace</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBasicAuthConfiguration.html" data-type="entity-link" >IBasicAuthConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBpmnJS.html" data-type="entity-link" >IBpmnJS</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBpmnJSModel.html" data-type="entity-link" >IBpmnJSModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBusinessObject.html" data-type="entity-link" >IBusinessObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBusinessObjectConnector.html" data-type="entity-link" >IBusinessObjectConnector</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICalculationAttributes.html" data-type="entity-link" >ICalculationAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICalculationAttributesVariables.html" data-type="entity-link" >ICalculationAttributesVariables</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICanvasModule.html" data-type="entity-link" >ICanvasModule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IConfiguration.html" data-type="entity-link" >IConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IConfigurationFormGroupProvider.html" data-type="entity-link" >IConfigurationFormGroupProvider</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IConfirmationInput.html" data-type="entity-link" >IConfirmationInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IConnectionCreatePostExecutedEvent.html" data-type="entity-link" >IConnectionCreatePostExecutedEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IConnector.html" data-type="entity-link" >IConnector</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IContainer.html" data-type="entity-link" >IContainer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IContextPadEntry.html" data-type="entity-link" >IContextPadEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDimension.html" data-type="entity-link" >IDimension</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDirectEditingEvent.html" data-type="entity-link" >IDirectEditingEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDirectEditingModule.html" data-type="entity-link" >IDirectEditingModule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDynamicInputParamsConfig.html" data-type="entity-link" >IDynamicInputParamsConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEditingContext.html" data-type="entity-link" >IEditingContext</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IElement.html" data-type="entity-link" >IElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IElementRegistryModule.html" data-type="entity-link" >IElementRegistryModule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEmbeddedView.html" data-type="entity-link" >IEmbeddedView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IErrorGatewayConfig.html" data-type="entity-link" >IErrorGatewayConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEvent.html" data-type="entity-link" >IEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEventBusModule.html" data-type="entity-link" >IEventBusModule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IExtensionElement.html" data-type="entity-link" >IExtensionElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IExtensionElementsWrapper.html" data-type="entity-link" >IExtensionElementsWrapper</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFormGroupProvider.html" data-type="entity-link" >IFormGroupProvider</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFunction.html" data-type="entity-link" >IFunction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFunctionTemplate.html" data-type="entity-link" >IFunctionTemplate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGood.html" data-type="entity-link" >IGood</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGraphicsFactory.html" data-type="entity-link" >IGraphicsFactory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGroup.html" data-type="entity-link" >IGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IIdentifiable.html" data-type="entity-link" >IIdentifiable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IInjectedJwtTokenConfiguration.html" data-type="entity-link" >IInjectedJwtTokenConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IInputParam.html" data-type="entity-link" >IInputParam</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IInterface.html" data-type="entity-link" >IInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IJwtByLoginConfiguration.html" data-type="entity-link" >IJwtByLoginConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMethodEvaluationResult.html" data-type="entity-link" >IMethodEvaluationResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IModelingModule.html" data-type="entity-link" >IModelingModule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOAuth2Configuration.html" data-type="entity-link" >IOAuth2Configuration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOrder.html" data-type="entity-link" >IOrder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPaletteEntry.html" data-type="entity-link" >IPaletteEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IParam.html" data-type="entity-link" >IParam</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IParamDefinition.html" data-type="entity-link" >IParamDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IParamEditorComponentInputData.html" data-type="entity-link" >IParamEditorComponentInputData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IParamMember.html" data-type="entity-link" >IParamMember</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPipeline.html" data-type="entity-link" >IPipeline</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPipelineAction.html" data-type="entity-link" >IPipelineAction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPipelineActionStatusInformation.html" data-type="entity-link" >IPipelineActionStatusInformation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPipelineDto.html" data-type="entity-link" >IPipelineDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPosition.html" data-type="entity-link" >IPosition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPositionedElement.html" data-type="entity-link" >IPositionedElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPossibilities.html" data-type="entity-link" >IPossibilities</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IProcedure.html" data-type="entity-link" >IProcedure</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IProcessBuilderConfig.html" data-type="entity-link" >IProcessBuilderConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IProcessStatusConfig.html" data-type="entity-link" >IProcessStatusConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IProcessValidationResult.html" data-type="entity-link" >IProcessValidationResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IProduct.html" data-type="entity-link" >IProduct</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IShapeAddedEvent.html" data-type="entity-link" >IShapeAddedEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IShapeCreateEvent.html" data-type="entity-link" >IShapeCreateEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IShapeDeleteExecutedEvent.html" data-type="entity-link" >IShapeDeleteExecutedEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISolution.html" data-type="entity-link" >ISolution</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISolutionPreview.html" data-type="entity-link" >ISolutionPreview</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISolutionWrapper.html" data-type="entity-link" >ISolutionWrapper</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISolver.html" data-type="entity-link" >ISolver</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISpace.html" data-type="entity-link" >ISpace</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStep.html" data-type="entity-link" >IStep</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStyle.html" data-type="entity-link" >IStyle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISubmitConfigurationProvider.html" data-type="entity-link" >ISubmitConfigurationProvider</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISyntaxNodeResponse.html" data-type="entity-link" >ISyntaxNodeResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITaskConfig.html" data-type="entity-link" >ITaskConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITaskCreationComponentInput.html" data-type="entity-link" >ITaskCreationComponentInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITaskCreationConfig.html" data-type="entity-link" >ITaskCreationConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITaskCreationDataWrapper.html" data-type="entity-link" >ITaskCreationDataWrapper</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITaskCreationFormGroupValue.html" data-type="entity-link" >ITaskCreationFormGroupValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITaskCreationPayload.html" data-type="entity-link" >ITaskCreationPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITextLeaf.html" data-type="entity-link" >ITextLeaf</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITooltipModule.html" data-type="entity-link" >ITooltipModule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IViewbox.html" data-type="entity-link" >IViewbox</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IViewboxChangedEvent.html" data-type="entity-link" >IViewboxChangedEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IVirtualDimension.html" data-type="entity-link" >IVirtualDimension</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IVisualizerContextService.html" data-type="entity-link" >IVisualizerContextService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IZoomScrollModule.html" data-type="entity-link" >IZoomScrollModule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-1.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-2.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-3.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-4.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-5.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-6.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-7.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-8.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-9.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-10.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-11.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-12.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-13.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-14.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-15.html" data-type="entity-link" >State</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});