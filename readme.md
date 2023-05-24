# Microservice Example to Register Users and Send Email Notifications Using Nodemailer and MailTrap

---

### 1st step:

-  Setup ENV Variables in `mailerServiceAPI`

Rename the file .env.example to .env and fill the variables listed bellow with your credentials from MailTrap

```bash
MAILER_USER=
MAILER_PASSWORD=
MAILER_PORT=
MAILER_HOST=
```

### 2nd step

### Run with Docker 🐳 and have fun 🥳

```bash
  docker compose up -d
```

- Access each container and `npm i && npm start``

```bash
  docker exec -it register_api sh
  npm i && npm start
```

```bash
  docker exec -it mailer_api sh
  npm i && npm start
```

```bash
  docker exec -it cep_api sh
  npm i && npm start
```
---

Now you can use the following routes:

*registerAPI*
- /POST: http://localhost:3001/register
```json
{
  "firstName": "Rafael",
  "lastName": "Tedesco",
  "email": "teste@teste2235121122.com",
  "cep": "0460185"
}
```

It creates a new customer and retrieves all the address data from the cep provided and send an email with an Welcome message.

This endpoint communicates with two services: consultaEnderecoAPI and mailerServiceAPI

---

*consultaEnderecoAPI*
- /POST ```http://localhost:3000/get-address-info```

```json
{ 
  "cep": "08717380"
}
```
It retrieves all the address data from the provided CEP

---
*mailerServiceAPI*
- /POST: http://localhost:3002/send-mail

```json
{ 
  "email": "emailteste@teste.com",
  "fullName": "Rafael Tedesco",
  "message": "Welcome"
}
```

It sends an email with a message usign MailTrap

---

* If you prefer you can use the registerAPI as an API Gateway and hide the communication between the underneath services.

---

* Challenges for you, dear reader/developer

- Add Redis on registerAPI when fetching a CEP to lower latency
- Add Kafka, RabbitMQ or Bull to send mails in background wihout holding reply