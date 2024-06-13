import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiAuthorizationTypePipe } from './pipes/api-authorization-type.pipe';
import { ApiConfigurationPreviewComponent } from './components/api-configuration-preview/api-configuration-preview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SelectApiAuthorizationComponent } from './components/select-api-authorization/select-api-authorization.component';
import { AccessTokenInputComponent } from './components/dynamic-input/access-token-input/access-token-input.component';
import { EndpointInputComponent } from './components/dynamic-input/endpoint-input/endpoint-input.component';
import { UsernamePasswordCombinationComponent } from './components/dynamic-input/username-password-combination/username-password-combination.component';
import { ApiLoginTestComponent } from './components/dynamic-input/api-login-test/api-login-test.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxJsonViewerModule } from 'ngx-json-viewer';



@NgModule({
  declarations: [
    ApiConfigurationPreviewComponent,
    ApiAuthorizationTypePipe,
    ApiLoginTestComponent,
    UsernamePasswordCombinationComponent,
    EndpointInputComponent,
    AccessTokenInputComponent,
    SelectApiAuthorizationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    NgxJsonViewerModule
  ],
  exports: [
    ApiConfigurationPreviewComponent
  ]
})
export class AutomationModule { }
