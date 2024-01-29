# !!! IMPORTANT NOTE: please start the server before see the live link. Because where I upload the server sometimes it creates problems because of free users. Thanks in advance
## Server Link: https://shoemanagement.onrender.com/

# Project Details
 ## Project Name: Shoe Inventory Management System
 ## live Url: https://65b7c17b1fff7a0d543da78a--singular-hotteok-1dfc48.netlify.app/
 ## Technology: nodejs, expressjs, cors, mongoDB

# How to setup the application.

First of all you can see this github. From this github you can either copy the link from code and in your terminal just put git clone "your link", it will automatically copy to your local machine and you can see the code or you can download from here directly. 
No matter what you choose. You can choose any of them. Now in your folder open your terminal and write the codes respectively,
```
  npm install node-modules
  npm run dev
```
Then your code will automatically run and after clicking the url you can see the project view. (Make sure setup the server. You wil find full documentation there)


# How to use the application

## Login page:
  On the application you first see a login page. If you are not registered with our service you can visit  to the signup page and signup to our system. After come back to login page you need to put the login details for login to your account.

  #### Here if you want you can login my demo account.
  ```
  email: jac@gmail.com
  password: 123456
```

## Home Page

In home page you can see a sidebar menu from where you can travarse different pages. So, in the home page you will find whole data with some filtering options. If you don't have data go to add shoe page.
So, in home page you will see all the data you insert in your account. Also you can filter by brand, model, style, size, color, price, date. You can see and find a data as you want. 
Then each product has update option. By clicking on update you can  redirect to a update page where initially the previous data is loaded. Then you need to update the data if you want.
Here you can also see some select option. When you select an option you can view the delete button. By clicking on delete you can delete the selected data, First of all delete should require your permission for deletion. Once you granted it will delete from the list. 
You can  see all data in real time.

## Add Shoe Page
In add shoe page you can add your product in here it is shoe. Here you can see a form which required a lot of multiple data. You should provide all the data and add shoe as you want.


## Sales management Page
In sales management page you can manage your sells. First of all you will see all the data and a search option. In search option you can search a data as you want. Each data has sell button. By clicking on it you can show a popup update where you can add your sales options. By adding quantity you can see some deduction of quantity from main page.

## Sales History

Here you can see 5 options. 
### all Sales
```Here you can see all the saltes data available```

### Daily Sales
```Here you can see daily sales data partitionate by date```
### Monthly Sales
```Here you can see monthly  sales data```
### yearly Sales
```Here you can see yearly  sales data```
## Logout
```By clicking on logout you will logout from the system.```

# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
