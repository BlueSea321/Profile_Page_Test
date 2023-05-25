# Seller Profile Page
<br />


# Getting Started

### Install packages from the root directory
```
npm install
```
#### or
```
yarn install
```
### Start the development server
```
npm start
```
#### or
```
yarn start
```
<br />

# Folder Structure

```bash
├── tailwind.config.js 
├── README.md        
├── package-lock.json
├── package.json     
├── public
│   ├── assets
│   │   └── avatar.png
│   ├── favicon.ico  
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── components
    │   ├── Modals
    │   │   ├── LoginModal.js
    │   │   ├── OrderModal.js
    │   │   ├── ProductModal.js
    │   │   └── ProfileModal.js
    │   ├── Header.js
    │   ├── Product.js
    │   └── Profile.js
    │── index.css
    ├── index.js
    ├── reportWebVitals.js
    ├── setupTests.js
    ├── user.json
    └── utils.js

```
<br />

# How to test app

<br />

### You can log in with the credentials below.

<br />

### owner
### username: seller 
### password: seller123!@#

<br />

### buyer
### username: buyer
### password: buyer123!@#

<br />

### If logged in as the owner, you can add/remove products from localstorage(db).
### You can also edit profile information and save it to localstorage.
### You can also edit order of products as you like.

### If logged in as the buyer, you can add/remove products to/from your carts.

### If you are not logged in, you can only view profile information and products.

<br />

# Packages Used :package:

| Client Side Packages  |
| :-------------: |
| crypto-js |
| react-icons  |
| react-toastify  |
| tailwindcss |

