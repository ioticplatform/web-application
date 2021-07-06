FROM node

RUN npm i -g serve

WORKDIR /var/www/
ADD build /var/www/build

CMD serve -s build -p 3000
