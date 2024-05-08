import { Component, OnInit } from '@angular/core';
import { ConfigureApiCallService } from '../../services/configure-api-call.service';

@Component({
  selector: 'app-api-configuration-preview',
  templateUrl: './api-configuration-preview.component.html',
  styleUrls: ['./api-configuration-preview.component.css']
})
export class ApiConfigurationPreviewComponent implements OnInit {

  constructor(
    public configureApiCallService: ConfigureApiCallService
  ) { }

  ngOnInit(): void {
  }

}
