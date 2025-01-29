import {
  accountTabsTestCases,
  categoriesTabsTestCases,
  navbarTabsTestCases,
} from '@_src/factories/testCases/navbarTestCases';
import { expect, test } from '@_src/fixtures/merge.fixture';
import {
  AccountTabTestCase,
  CategoriesTabTestCase,
  NavbarTabTestCase,
} from '@_src/models/navbarLocators.model';

test.describe('Navbar smoke tests for non logged and logged users', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  const navbarTabsTestCasesTyped: NavbarTabTestCase[] = navbarTabsTestCases;
  navbarTabsTestCasesTyped.forEach(({ navbarTab, url }) => {
    test(`Verify if ${navbarTab} redirect to correct page`, async ({
      navbarComponent,
      page,
    }) => {
      // Act:
      await navbarComponent.selectTab(navbarTab);

      // Assert:
      await expect(page).toHaveURL(url);
    });
  });

  const categoriesTabsTestCasesTyped: CategoriesTabTestCase[] =
    categoriesTabsTestCases;
  categoriesTabsTestCasesTyped.forEach(({ categories, url }) => {
    test(`Verify if ${categories} redirect to correct page`, async ({
      navbarComponent,
      page,
    }) => {
      // Arrange:
      const tab = 'categories';

      // Act:
      await navbarComponent.selectSubTab(tab, categories);

      // Assert:
      await expect(page).toHaveURL(url);
    });
  });

  const accountTabsTestCasesTyped: AccountTabTestCase[] = accountTabsTestCases;
  accountTabsTestCasesTyped.forEach(({ accountTab, url }) => {
    test(`Verify if ${accountTab} redirect to correct page @logged @smoke-ui`, async ({
      navbarComponent,
      page,
    }) => {
      // Arrange:
      const tab = 'menu';

      // Act:
      await navbarComponent.selectSubTab(tab, accountTab);

      // Assert:
      await expect(page).toHaveURL(url);
    });
  });
});
