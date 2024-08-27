import { Routes } from '@angular/router';
import { ComponentsComponent } from '../../components/components.component'

export const CommonLayout_ROUTES: Routes = [

    //Dashboard
    {
        path: 'dashboard',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
    },

    // Charts
    {
      path: 'changelog',
      children: [
          {
              path: '',
              redirectTo: '/changelog/changelog',
              pathMatch: 'full'
          },
          {
              path: '',
              loadChildren: () => import('../../changelog/changelog.module').then(m => m.ChangelogModule)
            },
        ]
    },
    {path:'activite',
        children:[
        {
            path:'',
            redirectTo:'/activite/activite',
            pathMatch:'full'
        },
        
        {
            path:'',
            loadChildren:() => import('../../accompagnement/accompagnement.module').then(m => m.AccompagnementModule)
        },
        
        ]},

        {path:'beneficiaire',
            children:[
            {
                path:'',
                redirectTo:'/beneficiaire/beneficiaire',
                pathMatch:'full'
            },
            
            {
                path:'',
                loadChildren:() => import('../../accompagnement/accompagnement.module').then(m => m.AccompagnementModule)
            },
            
            ]},

            {path:'intervenant',
                children:[
                {
                    path:'',
                    redirectTo:'/intervenant/intervenant',
                    pathMatch:'full'
                },
                
                {
                    path:'',
                    loadChildren:() => import('../../accompagnement/accompagnement.module').then(m => m.AccompagnementModule)
                },
                
                ]},
                {path:'membre',
                    children:[
                    {
                        path:'',
                        redirectTo:'/membre/membre',
                        pathMatch:'full'
                    },
                    
                    {
                        path:'',
                        loadChildren:() => import('../../accompagnement/accompagnement.module').then(m => m.AccompagnementModule)
                    },
                    
                    ]},
        
                {path:'etude',
                    children:[
                    {
                        path:'',
                        redirectTo:'/etude/etude',
                        pathMatch:'full'
                    },
                    
                    {
                        path:'',
                        loadChildren:() => import('../../accompagnement/accompagnement.module').then(m => m.AccompagnementModule)
                    },
                    
                    ]},

                    {path:'ville',
                        children:[
                        {
                            path:'',
                            redirectTo:'/ville/ville',
                            pathMatch:'full'
                        },
                        
                        {
                            path:'',
                            loadChildren:() => import('../../accompagnement/accompagnement.module').then(m => m.AccompagnementModule)
                        },
                        
                        ]},

    //Apps
    {
        path: 'apps',
        data: {
            title: 'Apps'
        },
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../apps/apps.module').then(m => m.AppsModule)
            },
        ]
    },

    //Component
    {
        path: 'demo',
        component: ComponentsComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../../components/components.module').then(m => m.ComponentsModule)
            }
        ],
        data: {
            title: 'Components '
        }
    },

    // Charts
    {
      path: 'features',
      data: {
          title: 'features'
      },
      children: [
          {
              path: '',
              redirectTo: '/dashboard',
              pathMatch: 'full'
          },
          {
              path: '',
              loadChildren: () => import('../../features/features.module').then(m => m.FeaturesModule)
            },
        ]
    },

    //Pages
    {
        path: 'pages',
        data: {
            title: 'Pages '
        },
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../pages/pages.module').then(m => m.PagesModule)
            },
        ]
    }
];
