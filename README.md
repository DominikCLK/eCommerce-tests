# ⚡️Playwright framework for E-commerce automated tests ⚡️

<p align="center">
  <a href="#">
    <img src="https://github.com/DominikCLK/Demo-Bank-Project/assets/75272795/852f9436-e12f-4aec-9002-7d6dba4cf764" />
  </a>
</p>

## Overview

This project aims to ensure the reliability and functionality of the [E-commerce](<[https://demo-bank.vercel.app/](https://practicesoftwaretesting.com/#/)>) website through automated testing. Leveraging the Playwright framework with TypeScript, we strive to streamline the testing process, catching potential issues early on and maintaining a robust and error-free web application.

## 🚀 Scope

- **End-to-end testing:** Simulate real user interactions to validate the entire user journey.

- **Smoke testing:** Conduct basic, quick checks on functionalities to ensure the software's fundamental features are operational. These tests are designed to provide a rapid assessment of system stability and readiness for more comprehensive testing, serving as a preliminary validation step before delving into deeper testing scenarios.

- **Backend API testing:** Ensure the robustness and reliability of your backend infrastructure by meticulously examining each endpoint and functionality.
- **Integration testing:** Validate the seamless interaction between different components of your system to ensure smooth data flow and functionality across interconnected modules..

- **Scenario Coverage:** Cover various user journeys, including login to account, fund transfers, and balance verification.

- **Continuous Integration:** Integrate the testing suite into the continuous integration pipeline for quick feedback.

<p align="center">
  <a href="#">
    <img src="https://github.com/DominikCLK/eCommerce-tests/assets/75272795/094f501c-69ff-4ca7-b9fc-a33426c4d970" />
  </a>
</p>

## 💬 Note

### The current branch I am working on:

- testsAPI

### Here I am presenting tests for the E-commerce app. To log in, enter credentials from table. Do not provide real data!

# Default accounts

| First name | Last name | Role  | E-mail                                | Password  |
| ---------- | --------- | ----- | ------------------------------------- | --------- |
| John       | Doe       | admin | admin@practicesoftwaretesting.com     | welcome01 |
| Jane       | Doe       | user  | customer@practicesoftwaretesting.com  | welcome01 |
| Jack       | Howe      | user  | customer2@practicesoftwaretesting.com | welcome01 |

## 🛠 Technologies Used

- **Playwright Framework:** A powerful automation framework for browsers.
- **TypeScript:** Enhance code readability and maintainability with strong typing and modern features.
- **Faker library:** A versatile tool in software development for generating synthetic but realistic data. With Faker, developers can effortlessly create mock datasets for testing, prototyping, or populating databases with fictional yet believable information. This library is invaluable for scenarios requiring dummy data without compromising sensitive information, facilitating efficient testing and development processes.
- **ESLint:** Ensure code consistency and detect potential errors or deviations from coding standards in JavaScript and TypeScript projects. By enforcing a set of configurable rules, ESLint helps maintain clean and error-free code, improving code quality and readability across the development team.
- **Prettier:** Automatically format code according to a predefined set of rules, enhancing code readability and reducing formatting inconsistencies. Prettier supports various programming languages, including JavaScript and TypeScript, and seamlessly integrates with popular code editors and version control systems, streamlining the development workflow.
- **Postman:** Simplify API development and testing with a comprehensive platform for building, testing, and documenting APIs. Postman enables developers to create requests, organize collections, and automate testing workflows, facilitating collaboration and ensuring API reliability and functionality.
- **Continuous Integration (CI/GitHub Actions):** Automate testing on code changes for a continuous feedback loop.

<p align="center">
  <a href="#">
    <img src="https://simpleskill.icons.workers.dev/svg?i=visualstudiocode,node.js,eslint,playwright,typescript,postman,githubactions,git,github" />
  </a>
</p>
<p align="center">
  <a href="#">
    <img src="https://simpleskill.icons.workers.dev/svg?i=windows11,macos,googlechrome,prettier" />
  </a>
</p>

## ⚡️ Prepare

### Local recommended tools:

- VS Code
- Git
- Node.js (version >16)

### Installation and setup

- Clone the Repository

```
git clone https://github.com/DominikCLK/eCommerce-tests.git
```

- (optional) install VSC recommended plugins
- install dependencies: `npm install`
- setup Playwright with: `npx playwright install --with-deps chromium`
- prepare local env file: `cp .env-template .env`
- To have the test passed set values in the created `.env` file:

```
BASE_URL='https://practicesoftwaretesting.com/#/'
DEFAULT_USER_EMAIL='customer2@practicesoftwaretesting.com'
DEFAULT_USER_PASSWORD='welcome01'
API_URL='https://api.practicesoftwaretesting.com'
```

<br>

Run all tests:

```
npx playwright test
```

Run all tests with tags:

```
npx playwright test --grep /tag/
```

For more usage cases look in `package.json` scripts section.

## Author

- [@DominikCLK](https://github.com/DominikCLK)
