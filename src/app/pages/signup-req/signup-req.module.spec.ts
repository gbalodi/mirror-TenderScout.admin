import { SignupReqModule } from './signup-req.module';

describe('SignupReqModule', () => {
  let signupReqModule: SignupReqModule;

  beforeEach(() => {
    signupReqModule = new SignupReqModule();
  });

  it('should create an instance', () => {
    expect(signupReqModule).toBeTruthy();
  });
});
