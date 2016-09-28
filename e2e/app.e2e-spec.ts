import { HuntlabsPage } from './app.po';

describe('huntlabs App', function() {
  let page: HuntlabsPage;

  beforeEach(() => {
    page = new HuntlabsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
