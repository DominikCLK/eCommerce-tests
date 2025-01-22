import { BasePage } from '@_src/pages/base.page';
import { Locator, Page } from '@playwright/test';

export class CheckoutPage extends BasePage {
  checkoutItemName(itemName: string): Locator {
    return this.page.getByText(`${itemName}`, { exact: true });
  }

  proceedButton(stemNumber: string): Locator {
    return this.page.locator(`[data-test="proceed-${stemNumber}"]`);
  }

  paymentMessage(message: string): Locator {
    return this.page.getByText(`${message}`);
  }

  checkoutAddress = this.page.locator('[data-test="address"]');
  checkoutCity = this.page.locator('[data-test="city"]');
  checkoutState = this.page.locator('[data-test="state"]');
  checkoutCountry = this.page.locator('[data-test="country"]');
  checkoutPostcode = this.page.locator('[data-test="postcode"]');

  paymentMethod = this.page.locator('[data-test="payment-method"]');
  monthlyInstallments = this.page.locator('[data-test="monthly_installments"]');

  confirmButton = this.page.locator('[data-test="finish"]');
  orderConfirmation = this.page.locator('#order-confirmation');

  constructor(page: Page) {
    super(page);
  }

  async buyNowPayLaterMethod(month: string): Promise<void> {
    await this.paymentMethod.selectOption('buy-now-pay-later');
    await this.monthlyInstallments.selectOption(month);
    await this.confirmButton.click();
  }
}
