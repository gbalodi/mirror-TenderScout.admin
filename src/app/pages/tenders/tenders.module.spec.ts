import { TendersModule } from './tenders.module';

describe('TendersModule', () => {
  let tendersModule: TendersModule;

  beforeEach(() => {
    tendersModule = new TendersModule();
  });

  it('should create an instance', () => {
    expect(tendersModule).toBeTruthy();
  });
});
