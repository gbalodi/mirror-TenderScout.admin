import { InjestorsModule } from './injestors.module';

describe('InjestorsModule', () => {
  let injestorsModule: InjestorsModule;

  beforeEach(() => {
    injestorsModule = new InjestorsModule();
  });

  it('should create an instance', () => {
    expect(injestorsModule).toBeTruthy();
  });
});
