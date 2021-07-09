import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';

import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';


import { CoachComponent } from './views/coach/coach.component';
import { SpecialiteComponent } from './views/specialite/specialite.component';
import { EditCoachComponent } from './views/edit-coach/edit-coach.component';
import { ViewCoachComponent } from './views/view-coach/view-coach.component';
import { DeleteCoachComponent } from './views/delete-coach/delete-coach.component';
import { EditSpecialiteComponent } from './views/edit-specialite/edit-specialite.component';
import { ViewSpecialiteComponent } from './views/view-specialite/view-specialite.component';
import { DeleteSpecialiteComponent } from './views/delete-specialite/delete-specialite.component';

export const routes: Routes = [

 


  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },

  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
           {
        path: 'coachs',
component:CoachComponent
      },
      {
        path: 'specialite',
component:SpecialiteComponent
      },

      {
        path: 'editCoach/:id',
component:EditCoachComponent
      },

      {
        path: 'editCoach',
component:EditCoachComponent
      },

      {
        path: 'viewCoach/:id',
component:ViewCoachComponent
      },

      {
        path: 'deleteCoach/:id',
component:DeleteCoachComponent
      },

      {
        path: 'editSpecialite/:id',
component:EditSpecialiteComponent
      },

      {
        path: 'editSpecialite',
component:EditSpecialiteComponent
      },

      {
        path: 'viewSpecialite/:id',
component:ViewSpecialiteComponent
      },

      {
        path: 'deleteSpecialite/:id',
component:DeleteSpecialiteComponent
      },

      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },

      
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
