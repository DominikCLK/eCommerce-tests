import {
  categoriesTestCases,
  navbarTestCases,
} from '@_src/factories/testCases/navbarTestCases';
import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Navbar smoke tests @smoke-ui', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  for (const { navbarTab, url } of navbarTestCases) {
    test(`Verify if ${navbarTab} redirect to correct page`, async ({
      navbarComponent,
      page,
    }) => {
      // Act
      await navbarComponent.selectTab(navbarTab);

      // Assert
      await expect(page).toHaveURL(url);
    });
  }

  for (const { categories, url } of categoriesTestCases) {
    test(`Verify if ${categories} redirect to correct page`, async ({
      navbarComponent,
      page,
    }) => {
      // Act
      await navbarComponent.selectCategoriesTab(categories);

      // Assert
      await expect(page).toHaveURL(url);
    });
  }
});
