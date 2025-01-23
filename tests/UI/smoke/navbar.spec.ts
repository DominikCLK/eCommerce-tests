import {
  accountTabsTestCases,
  categoriesTabsTestCases,
  navbarTabsTestCases,
} from '@_src/factories/testCases/navbarTestCases';
import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Navbar smoke tests for non logged and logged users', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  for (const { navbarTab, url } of navbarTabsTestCases) {
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

  for (const { categories, url } of categoriesTabsTestCases) {
    test(`Verify if ${categories} redirect to correct page`, async ({
      navbarComponent,
      page,
    }) => {
      // Arrange
      const tab = 'categories';
      // Act
      await navbarComponent.selectSubTab(tab, categories);

      // Assert
      await expect(page).toHaveURL(url);
    });
  }

  for (const { accountTab, url } of accountTabsTestCases) {
    test(`Verify if ${accountTab} redirect to correct page @logged @smoke-ui`, async ({
      navbarComponent,
      page,
    }) => {
      // Arrange
      const tab = 'menu';

      // Act
      await navbarComponent.selectSubTab(tab, accountTab);

      // Assert
      await expect(page).toHaveURL(url);
    });
  }
});
