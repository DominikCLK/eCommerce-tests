import {
  AccountTabTestCase,
  CategoriesTabTestCase,
  NavbarTabTestCase,
} from '@_src/models/navbarLocators.model';

export const navbarTabsTestCases: NavbarTabTestCase[] = [
  { navbarTab: 'home', url: '/' },
  { navbarTab: 'contact', url: 'contact' },
  { navbarTab: 'sign-in', url: 'auth/login' },
];

export const categoriesTabsTestCases: CategoriesTabTestCase[] = [
  { categories: 'hand-tools', url: 'category/hand-tools' },
  { categories: 'power-tools', url: 'category/power-tools' },
  { categories: 'other', url: 'category/other' },
  { categories: 'special-tools', url: 'category/special-tools' },
  { categories: 'rentals', url: 'rentals' },
];

export const accountTabsTestCases: AccountTabTestCase[] = [
  { accountTab: 'my-account', url: 'account' },
  { accountTab: 'my-favorites', url: 'account/favorites' },
  { accountTab: 'my-profile', url: 'account/profile' },
  { accountTab: 'my-invoices', url: 'account/invoices' },
  { accountTab: 'my-messages', url: 'account/messages' },
  { accountTab: 'sign-out', url: '/' },
];
