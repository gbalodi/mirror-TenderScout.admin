// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    // apiUrl: 'http://api.dev.tenderscout.braincode.xyz/',
    // apiUrl: 'https://hub.tenderscout.com/api/',
    apiUrl: 'https://api.tshub.matrixmarketers.com/api/',
    // apiUrl: 'http://192.168.10.130:3000/', //@Gaurav
    // apiUrl: 'http://192.168.1.62:3000/', //@Akshita
    // frontEnd: 'http://localhost:4200'
    frontEnd: 'https://prehub.matrixmarketers.com'
};
