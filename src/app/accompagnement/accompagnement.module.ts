import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ThemeConstantService } from '../shared/services/theme-constant.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { DemoComponentsShareModule } from '../components/demo-components-share/demo-components-share.module';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { AppComponent } from '../app.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActiviteComponent } from './activite/activite.component';
import { BeneficiaireComponent } from './beneficiaire/beneficiaire.component';
import { IntervenantComponent } from './intervenant/intervenant.component';
import { EtudeComponent } from './etude/etude.component';
import { AccompagnementRoutingModule } from './accompagnement-routing.module';
import { MembreComponent } from './membre/membre.component';
import { VilleComponent } from './ville/ville.component';
import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
    declarations: [
        ActiviteComponent,
        BeneficiaireComponent,
        IntervenantComponent,
        EtudeComponent,
        MembreComponent,
        VilleComponent
      
        
        
      
    
      
    ],
    imports: [
      CommonModule,
      SharedModule,
      AccompagnementRoutingModule,
      
      NzCardModule,
      DemoComponentsShareModule,
      NzCollapseModule,
      NzSkeletonModule,
      NzUploadModule,
      NzSpinModule,
      NzTableModule,
     
      ReactiveFormsModule,
      
      HttpClientModule,
      NgxPaginationModule
      
     
      
      
      
    ],
    exports: [
      
      
 
    ],
    providers: [
      ThemeConstantService,
      

  ],
  bootstrap: [AppComponent]
  })
  export class AccompagnementModule { }







