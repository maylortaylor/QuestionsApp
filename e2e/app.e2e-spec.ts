import { QuestionsAppPage } from './app.po';

describe('questions-app App', () => {
  let page: QuestionsAppPage;

  beforeEach(() => {
    page = new QuestionsAppPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
