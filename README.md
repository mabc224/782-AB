# 782-AB

Here is the procedure to use it.

First install dependencies by using command 
```sh
npm install
```
in root dir of this app.



To execute the server, execute command
```sh
node bin/www
```
It will start localhost server on 3000 port.

This url will insert fake data;
```sh
 http://localhost:3000
```

You can see inserted data here;
```sh
 http://localhost:3000/data
```

You can query data by lat, lng
```sh
 http://localhost:3000/channels?l=<lat>,<lng>
 http://localhost:3000/channels?l=-142.2452,-12.5151
```

You can query data by ip
```sh
 http://localhost:3000/channels?l=<ip>
 http://localhost:3000/channels?l=172.168.0.1
```

In case of this passed, it will try to collect user ip, and try to find location by matching ip in database, if found, channel will return
```sh
 http://localhost:3000/channels
```
