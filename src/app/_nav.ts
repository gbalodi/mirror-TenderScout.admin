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
        name: 'Users list',
        url: '/users-list',
        icon: 'fas fa-users',
    },
    {
        name: 'Dictionaries',
        icon: 'fas fa-book',
        children: [
            {
                name: 'Country dict',
                url: '/countries-dict',
                icon: 'fas fa-globe-asia',
                badge: {
                    variant: 'success',
                    text: 'NEW'
                }
            },
        ]
    },
    {
        name: 'Sign-up requests',
        url: '/signup-reqs-list',
        icon: 'fas fa-user-plus',
        badge: {
            variant: 'info',
        }
    }
];
