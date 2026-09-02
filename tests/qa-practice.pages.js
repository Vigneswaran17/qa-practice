/** Reusable Playwright page objects for the QA Practice homepage quick starts. */
export const BASE_URL = 'https://www.qa-practice.com';

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(path = '/') {
    await this.page.goto(`${BASE_URL}${path}`, { waitUntil: 'domcontentloaded' });
  }
}

export class HomePage extends BasePage {
  async open() { await super.open('/'); }
  heading() { return this.page.getByRole('heading', { name: 'Hello!', exact: true }); }
  quickStartLink(name) { return this.page.getByRole('link', { name, exact: true }); }
}

export class InputPage extends BasePage {
  async submit(value) {
    await this.page.locator('input:not([type="hidden"]):not([type="submit"])').fill(value);
    await this.page.locator('input[type="submit"]').click();
  }
}

export class ButtonPage extends BasePage {
  async click() {
    await this.page.locator('#submit-id-submit, input[type="submit"], button').first().click();
  }
}

export class CheckboxPage extends BasePage {
  async select(label) { await this.page.getByLabel(label, { exact: true }).check(); }
  async submit() { await this.page.locator('#submit-id-submit, input[type="submit"]').click(); }
}

export class TextAreaPage extends BasePage {
  async enter(text) { await this.page.locator('textarea').first().fill(text); }
  async submit() { await this.page.locator('#submit-id-submit, input[type="submit"]').click(); }
}

export class SelectPage extends BasePage {
  async choose(option) { await this.page.locator('select').first().selectOption(option); }
  async submit() { await this.page.locator('#submit-id-submit, input[type="submit"]').click(); }
}
