import { CreateUserModule } from './create-user.module';

describe('CreateUserModule', () => {
  let createUserModule: CreateUserModule;

  beforeEach(() => {
    createUserModule = new CreateUserModule();
  });

  it('should create an instance', () => {
    expect(createUserModule).toBeTruthy();
  });
});
