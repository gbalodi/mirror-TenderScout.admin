import { ScraperModule } from './scraper.module';

describe('ScraperModule', () => {
  let scraperModule: ScraperModule;

  beforeEach(() => {
    scraperModule = new ScraperModule();
  });

  it('should create an instance', () => {
    expect(scraperModule).toBeTruthy();
  });
});
