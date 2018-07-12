async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();

  await page.goto('http://canvas.docker/login/canvas');

  // dom element selectors
  const USERNAME_SELECTOR = '#pseudonym_session_unique_id';
  const PASSWORD_SELECTOR = '#pseudonym_session_password';
  const BUTTON_SELECTOR = '#login_form > div > div > button.Button--login';

  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.username);

  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);

  await page.click(BUTTON_SELECTOR);
  await page.waitForNavigation();

  await page.goto('http://canvas.docker/courses/3/gradebook');
  await page.waitFor(2 * 1000);

  const STUDENT_ID_SELECTOR = '#gradebook_grid > div.container_0.slickgrid_224429.ui-widget > div.viewport_0.slick-viewport > div > div.ui-widget-content.slick-row.even.first-row.student_21 > div.slick-cell.b0.f0.meta-cell.primary-column.student > div.student-name > a';
  const FIRST_GRADE_TOTAL_SELECTOR = '#gradebook_grid > div.container_1.slickgrid_224429.ui-widget > div.viewport_1.slick-viewport > div > div.ui-widget-content.slick-row.even.first-row.student_21.active > div.slick-cell.b9.f9.total-cell.total_grade.active > div > span';
  const FIRST_ASSIGNMENT_GROUP_TOTAL_SELECTOR = '//*[@id="gradebook_grid"]/div[3]/div[4]/div/div[1]/div[6]/div/span';
  const LIST_ASSIGNMENT_GRADE_SELECTOR = '';

  browser.close();
}

run();
