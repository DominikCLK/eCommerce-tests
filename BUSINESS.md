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

## Business requirements

The business requirements introduced below regarding registration, login, product search, basket management, orders, payment process, and integration with the API interface.

# Registration and Login (UI Smoke)

- ## Registration

<br>

|     | TAG              | Role | Description                                                               |     |
| --- | ---------------- | ---- | ------------------------------------------------------------------------- | --- |
|     | UI-S-ECTS-R01-01 | user | The user can register on the website by entering the required data.       |
|     | UI-S-ECTS-R01-02 | user | After successful registration, the user is redirected to the login page.  |
|     | UI-S-ECTS-R01-03 | user | If incorrect data is provided, the message "Required field" is displayed. |

- ## Login

<br>

|     | TAG              | Role | Description                                                                               |     |
| --- | ---------------- | ---- | ----------------------------------------------------------------------------------------- | --- |
|     | UI-S-ECTS-R02-01 | user | A registered user can log in to his account by providing valid login details.             |
|     | UI-S-ECTS-R02-02 | user | After successful login, the user is redirected to his profile page.                       |
|     | UI-S-ECTS-R02-03 | user | If you provide false login details, the message "Invalid email or password" is displayed. |

<br>

# Registration and Login (API integration)

- ## Registration

<br>

|     | TAG               | Role | Description                                                                                                 |     |
| --- | ----------------- | ---- | ----------------------------------------------------------------------------------------------------------- | --- |
|     | API-I-ECTS-R03-01 | user | Verify that endpoint '/users/register' create new user (POST method) - status 201                           |
|     | API-I-ECTS-R03-02 | user | Verify that endpoint '/users/login' successfully login with new user credentials (POST method) - status 200 |
|     | API-I-ECTS-R03-03 | user | Verify that endpoint '/users/me' successfully return new user details (GET method) - status 200             |

- ## Login

<br>

|     | TAG               | Role | Description                                                                                                           |     |
| --- | ----------------- | ---- | --------------------------------------------------------------------------------------------------------------------- | --- |
|     | API-I-ECTS-R04-01 | user | Verify that endpoint '/users/login' login with default credentials (POST method) - status 200                         |
|     | API-I-ECTS-R04-02 | user | Verify that endpoint '/users/login' has a bearer token (POST method) - status 200                                     |
|     | API-I-ECTS-R04-03 | user | Verify that endpoint '/users/me' successfully return default user details and correct token (GET method) - status 200 |

<br>

# Basket (API integration)

<br>

|     | TAG               | Role | Description                                                                                                                                        |     |
| --- | ----------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
|     | API-I-ECTS-R04-01 | user | Verify that endpoint '/products?between=price,1,100&page=1' return details of one product (GET method) - status 200                                |
|     | API-I-ECTS-R04-02 | user | Verify that endpoint '/carts' successfully create basket object an uniq id (POST method) - status 201                                              |
|     | API-I-ECTS-R04-03 | user | Verify that endpoint '/carts/basketId' successfully add product to basket, response has 'item added or updated' message (POST method) - status 200 |
|     | API-I-ECTS-R04-04 | user | Verify that endpoint '/carts/' successfully return products in basket, verify product id (GET method) - status 200                                 |
|     | API-I-ECTS-R04-05 | user | Verify that endpoint '/carts/' successfully remove products in basket (DELETE method) - status 204                                                 |
|     | API-I-ECTS-R04-06 | user | Verify that endpoint '/carts/basketId' successfully return empty basket, verify cart_items is 0 (GET method) - status 200                          |

## Author

- [@DominikCLK](https://github.com/DominikCLK)
