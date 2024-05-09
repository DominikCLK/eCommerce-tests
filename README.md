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

- **Integration testing:** Validate the seamless interaction between different components of your system to ensure smooth data flow and functionality across interconnected modules.

- **Scenario Coverage:** Cover various user journeys, including login to account, fund transfers, and balance verification.

- **Continuous Integration:** Integrate the testing suite into the continuous integration pipeline for quick feedback. GitHub Action you can see here
  https://github.com/DominikCLK/eCommerce-tests/actions

<p align="center">
  <a href="#">
    <img src="https://github.com/DominikCLK/eCommerce-tests/assets/75272795/63face02-d380-4fda-a419-efce56d9b5d6" />
  </a>
</p>

## 🛠 Technologies Used

- **`Playwright Framework:`** A powerful automation framework for browsers.
- **`TypeScript:`** Enhance code readability and maintainability with strong typing and modern features.
- **`Faker library:`** A versatile tool in software development for generating synthetic but realistic data. With Faker, developers can effortlessly create mock datasets for testing, prototyping, or populating databases with fictional yet believable information. This library is invaluable for scenarios requiring dummy data without compromising sensitive information, facilitating efficient testing and development processes.
- **`ESLint:`** Ensure code consistency and detect potential errors or deviations from coding standards in JavaScript and TypeScript projects. By enforcing a set of configurable rules, ESLint helps maintain clean and error-free code, improving code quality and readability across the development team.
- **`Prettier:`** Automatically format code according to a predefined set of rules, enhancing code readability and reducing formatting inconsistencies. Prettier supports various programming languages, including JavaScript and TypeScript, and seamlessly integrates with popular code editors and version control systems, streamlining the development workflow.
- **`Postman:`** Simplify API development and testing with a comprehensive platform for building, testing, and documenting APIs. Postman enables developers to create requests, organize collections, and automate testing workflows, facilitating collaboration and ensuring API reliability and functionality.
- **`Continuous Integration (CI/GitHub Actions):`** Automate testing on code changes for a continuous feedback loop. GitHub Action you can see here
  https://github.com/DominikCLK/eCommerce-tests/actions

 <p align="center">
  <a href="#">
    <img src="https://simpleskill.icons.workers.dev/svg?i=visualstudiocode,node.js,eslint,prettier,playwright,typescript,postman,githubactions,git,github" />
  </a>
</p>
## 💬 Note

### The current branch I am working on:

- testsAPI

### Here I am presenting tests for the E-commerce app. To log in, enter credentials from the table. Do not provide real data!

# Default accounts

| First name | Last name | Role  | E-mail                                | Password  |
| ---------- | --------- | ----- | ------------------------------------- | --------- |
| John       | Doe       | admin | admin@practicesoftwaretesting.com     | welcome01 |
| Jane       | Doe       | user  | customer@practicesoftwaretesting.com  | welcome01 |
| Jack       | Howe      | user  | customer2@practicesoftwaretesting.com | welcome01 |

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

<br>
<br>
<br>

# Construction tools E-commerce store (TOOLSHOP DEMO) - Business requirements

<p align="center">
  <a href="#">
    <img src="https://github.com/DominikCLK/Demo-Bank-Project/assets/75272795/852f9436-e12f-4aec-9002-7d6dba4cf764" />
  </a>
</p>

## Overview

To ensure the effective operation of an e-commerce store specializing in the sale of construction tools, it is necessary to establish clear and detailed business requirements. This document aims to describe these requirements, which include functionalities related to registration, login, product search, basket and order management, as well as API integration.

## Description

The e-commerce store with construction tools (ECTS - ECommerce Tool Shop) is designed to enable customers to easily and conveniently purchase tools necessary to carry out construction work. The business requirements contained in this document are key to ensuring the proper operation of the platform, as well as customer satisfaction through the availability, convenience, and security of purchasing processes. across interconnected modules..

## Objective

The goal of these business requirements is to provide an end-to-end functionality for a construction tools e-commerce store that allows customers to easily browse, search, and purchase the products they need, as well as ensure proper integration with modules and components via API. When creating these requirements, efforts were made to ensure consistency, ease of use, and stability of the platform.

# Business requirements

The business requirements introduced below regarding registration, login, product search, basket management, orders, payment process, and integration with the API interface.

## Registration and Login (UI Smoke)

- Registration

<br>

|     | TAG              | Role | Description                                                               |     |
| --- | ---------------- | ---- | ------------------------------------------------------------------------- | --- |
|     | UI-S-ECTS-R01-01 | user | The user can register on the website by entering the required data.       |
|     | UI-S-ECTS-R01-02 | user | After successful registration, the user is redirected to the login page.  |
|     | UI-S-ECTS-R01-03 | user | If incorrect data is provided, the message "Required field" is displayed. |

- Login

<br>

|     | TAG              | Role | Description                                                                               |     |
| --- | ---------------- | ---- | ----------------------------------------------------------------------------------------- | --- |
|     | UI-S-ECTS-R02-01 | user | A registered user can log in to his account by providing valid login details.             |
|     | UI-S-ECTS-R02-02 | user | After successful login, the user is redirected to his profile page.                       |
|     | UI-S-ECTS-R02-03 | user | If you provide false login details, the message "Invalid email or password" is displayed. |

<br>

## Registration and Login (API integration)

- Registration

<br>

|     | TAG               | Role | Description                                                                                                 |     |
| --- | ----------------- | ---- | ----------------------------------------------------------------------------------------------------------- | --- |
|     | API-I-ECTS-R03-01 | user | Verify that endpoint '/users/register' create new user (POST method) - status 201                           |
|     | API-I-ECTS-R03-02 | user | Verify that endpoint '/users/login' successfully login with new user credentials (POST method) - status 200 |
|     | API-I-ECTS-R03-03 | user | Verify that endpoint '/users/me' successfully returns new user details (GET method) - status 200            |

- Login

<br>

|     | TAG               | Role | Description                                                                                                            |     |
| --- | ----------------- | ---- | ---------------------------------------------------------------------------------------------------------------------- | --- |
|     | API-I-ECTS-R04-01 | user | Verify that endpoint '/users/login' login with default credentials (POST method) - status 200                          |
|     | API-I-ECTS-R04-02 | user | Verify that endpoint '/users/login' has a bearer token (POST method) - status 200                                      |
|     | API-I-ECTS-R04-03 | user | Verify that endpoint '/users/me' successfully returns default user details and correct token (GET method) - status 200 |

<br>

## Basket (API integration)

<br>

|     | TAG               | Role | Description                                                                                                                                                 |     |
| --- | ----------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
|     | API-I-ECTS-R04-01 | user | Verify that endpoint '/products?between=price,1,100&page=1' returns details of one product (GET method) - status 200                                        |
|     | API-I-ECTS-R04-02 | user | Verify that endpoint '/carts' successfully create basket object an unique id (POST method) - status 201                                                     |
|     | API-I-ECTS-R04-03 | user | Verify that endpoint '/carts/basketId' successfully adds product to the basket, the response has 'item added or updated' message (POST method) - status 200 |
|     | API-I-ECTS-R04-04 | user | Verify that endpoint '/carts/' successfully return products in basket, verify product id (GET method) - status 200                                          |
|     | API-I-ECTS-R04-05 | user | Verify that endpoint '/carts/' successfully removes products in the basket (DELETE method) - status 204                                                     |
|     | API-I-ECTS-R04-06 | user | Verify that endpoint '/carts/basketId' successfully returns empty basket, verify cart_items is 0 (GET method) - status 200                                  |

## Author

- [@DominikCLK](https://github.com/DominikCLK)
