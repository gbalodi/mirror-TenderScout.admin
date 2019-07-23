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
                name: 'Users list',
                url: '/users/list',
                icon: 'fas fa-users',
            },
            {
                name: 'Sign-up requests',
                url: '/users/signup-requests',
                icon: 'fas fa-user-plus',
                badge: {
                    variant: 'info',
                }
            },
            {
                name: 'Assistence requests',
                url: '/users/assist-requests',
                icon: 'fas fa-question-circle',
                badge: {
                    variant: 'info',
                }
            },
            {
                name: 'Upgrade requests',
                url: '/users/upgrade-requests',
                icon: 'fas fa-question-circle',
                badge: {
                    variant: 'info',
                }
            }
        ]
    },
    {
        name: 'Dictionaries',
        icon: 'fas fa-book',
        children: [
            {
                name: 'Country dict',
                url: '/dictionaries/countries',
                icon: 'fas fa-globe-asia',
            },
            {
                name: 'Codes dict',
                url: '/dictionaries/codes',
                icon: 'fas fa-sort-numeric-down',
            },
            {
                name: 'Industies dict',
                url: '/dictionaries/industries',
                icon: 'fas fa-industry',
            },
        ]
    },
    {
        name: 'Tenders',
        url: '/tenders',
        icon: 'fas fa-gavel',
    },
    {
        name: 'Orbidal Documents List',
        url: '/documents/list',
        icon: 'fa fa-file-text',
    },
];
