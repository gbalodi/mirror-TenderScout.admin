import { ClaimedCompaniesModule } from './claimed-companies.module';

describe('ClaimedCompaniesModule', () => {
  let claimedCompaniesModule: ClaimedCompaniesModule;

  beforeEach(() => {
    claimedCompaniesModule = new ClaimedCompaniesModule();
  });

  it('should create an instance', () => {
    expect(claimedCompaniesModule).toBeTruthy();
  });
});
