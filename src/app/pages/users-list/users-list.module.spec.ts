import { UsersListModule } from './users-list.module';

describe('UsersListModule', () => {
  let usersListModule: UsersListModule;

  beforeEach(() => {
    usersListModule = new UsersListModule();
  });

  it('should create an instance', () => {
    expect(usersListModule).toBeTruthy();
  });
});
