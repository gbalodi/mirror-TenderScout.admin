export const navigation = [
    {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'fas fa-columns',
        badge: {
            variant: 'info',
        }
    },
    {
        name: 'User tools',
        icon: 'fas fa-users-cog',
        children: [
            {
                name: 'Users List',
                url: '/users/list',
                icon: 'fas fa-users',
            },
            {
                name: 'Archived Users List',
                url: '/users/archives',
                icon: 'fas fa-user-times'
            },
            {
                name: 'Users Statistics',
                url: '/users/statistics',
                icon: 'fas fa-users',
            },
            {
                name: 'Assistance Requests',
                url: '/users/assist-requests',
                icon: 'fas fa-question-circle',
                badge: {
                    variant: 'info',
                }
            },
            {
                name: 'Upgrade Requests',
                url: '/users/upgrade-requests',
                icon: 'fas fa-question-circle',
                badge: {
                    variant: 'info',
                }
            },
            // {
            //     name: 'Rating Requests',
            //     url: '/users/rating-request',
            //     icon: 'fas fa-users',
            // },
            {
                name: 'Sign-Up Requests',
                url: '/users/signup-requests',
                icon: 'fas fa-user-plus',
                badge: {
                    variant: 'info',
                }
            }
        ]
    },
    {

        name: 'Companies',
        icon: 'fas fa-users-cog',
        children: [
            // {
            //     name: 'Companies list',
            //     url: '/companies/list',
            //     icon: 'fas fa-users',
            // },
            {
                name: 'Orbidal Group',
                url: '/companies/orbidal-group',
                icon: 'fas fa-users',
            },
            {
                name: 'Companies Statistics',
                url: '/companies/statistics',
                icon: 'fas fa-chart-bar',
            },
            {
                name: 'Companies Contacts',
                url: '/companies/companies-contacts',
                icon: 'fas fa-users',
            }
        ]
    },
    {
        name: 'Tenders',
        // url: '/tenders',
        icon: 'fas fa-gavel',
        children: [
            {
                name: 'Tenders List',
                url: '/tenders/list',
                icon: 'fas fa-gavel',
            }
        ]
    },
    {
        name: 'Dictionaries',
        icon: 'fas fa-book',
        children: [
            {
                name: 'Country Dict',
                url: '/dictionaries/countries',
                icon: 'fas fa-globe-asia',
            },
            {
                name: 'Codes Dict',
                url: '/dictionaries/codes',
                icon: 'fas fa-sort-numeric-down',
            },
            {
                name: 'Industries Dict',
                url: '/dictionaries/industries',
                icon: 'fas fa-industry',
            },
        ]
    },
    {
        name: 'Orbidal Documents List',
        url: '/orbidal-documents',
        icon: 'fas fa-list-ul',
    },
    {
        name: 'Training Docs',
        url: '/training-documents',
        icon: 'fas fa-list-alt'
    },
    {
        name: 'Scraper Status',
        url: '/scraper/list',
        icon: 'fas fa-address-book',
    },
    {
        name: 'Ingestors Status',
        url: '/ingestors/list',
        icon: 'fa fa-indent',
    },
    {
        name: 'Bid Academy',
        icon: 'fas fa-book',
        children: [
            {
                name: 'Pathways',
                url: '/bid-academy/pathway-list',
                icon: 'fas fa-globe-asia',
            },
            // {
            //     name: 'Pathway Grouping',
            //     url: '/bid-academy/story-groups-tree',
            //     icon: 'fas fa-globe-asia',
            // },
            {
                name: 'Documents',
                url: '/bid-academy/documents-list',
                icon: 'fas fa-globe-asia',
            },
            {
                name: 'Pathway\'s Categories',
                url: '/bid-academy/categories-list',
                icon: 'fas fa-globe-asia',
            }
        ]
    }

    // {
    //     name: 'Company Claims',
    //     url: '/claims',
    //     icon: 'fas fa-users',
    // }
];
