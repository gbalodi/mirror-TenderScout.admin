interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'KlAP3Y1syMqYXyogbDC-iVAEnx7b5ey5',
  domain: 'tenderscout.eu.auth0.com',
  callbackURL: 'http://localhost:3000/callback'
};
