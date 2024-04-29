import { BasePage } from '@_src/pages/base.page';
import { Locator, Page } from '@playwright/test';

export class CheckoutPage extends BasePage {
  checkoutItemName(itemName: string): Locator {
    return this.page.getByText(`${itemName}`);
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

  finishButton = this.page.locator('[data-test="finish"]');

  constructor(page: Page) {
    super(page);
  }

  async buyNowPayLaterMethod(month: string): Promise<void> {
    await this.paymentMethod.selectOption('4: Buy Now Pay Later');
    await this.monthlyInstallments.selectOption(month);
    await this.finishButton.click();
  }
}
