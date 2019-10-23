# NodeJS authentification example

## Simple example of authentication on nodejs with PassportJS, Express and Handlebars.

Instead of ./db/users.js you can use another storage type.
For this, you should describe callbacks with another functions of returning users.

After authentification you get simple gallery of photos

> ⚠ Note: I am not responsible for the reliability

## Install:

```shell
git clone https://github.com/lootboxer/nodejs-auth.git

npm i
npm run start
```
After that you will see, that nodemon and express started

![Nodemon with express started](/readme_images/console.png)

If you go on "[http://localhost:3000](http://localhost:3000)" you will see:
![Login form](/readme_images/login.png)

Enter in form:

Login | Password
---|---
*admin* | *admin*

**Congratulate!🎉 You will be redirected in gallery**


![Gallery](/readme_images/gallery.png)