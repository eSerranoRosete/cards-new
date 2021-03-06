const express = require("express");
const axios = require("axios");
const nodemailer = require("nodemailer");
const path = require("path");

const websiteRouter = require("./routers/website.router");

require("dotenv/config");

const app = express();

app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));
app.use("/", websiteRouter);

app.get("/:id", (req, res) => {
  axios(
    `${process.env.API_URL}/${req.params.id}?api_key=${process.env.API_KEY}`
  )
    .then((response) => {
      const user = response.data;
      try {
        if (user.active) {
          res.render(user.cardSettings.skin, { user: user });
        } else {
          res.sendFile(path.join(__dirname, "/views/misc/deactivated.html"));
        }
      } catch {
        return;
      }
    })
    .catch((error) => {
      if (error.response) res.sendStatus(error.response.status);
    });
});

app.get("/:id/join", (req, res) => {
  axios(
    `${process.env.API_URL}/${req.params.id}?api_key=${process.env.API_KEY}`
  )
    .then((response) => {
      const user = response.data;

      if (user.role == "coordinador" || user.role == "gerente") {
        res.render("ciudadmaderas/join.ejs", { user: user });
      } else {
        res.status(405).json({ error: "No permission" });
      }
    })
    .catch((error) => {
      if (error.response) res.sendStatus(error.response.status);
    });
});

app.post("/:id/submit", (req, res) => {
  axios(
    `${process.env.API_URL}/${req.params.id}?api_key=${process.env.API_KEY}`
  )
    .then((response) => {
      async function main() {
        let transporter = nodemailer.createTransport({
          host: "mail.inteminer.com",
          port: 26,
          secure: false,
          auth: {
            user: "recluta@inteminer.com",
            pass: "Inteminer2022*",
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        let info = await transporter.sendMail({
          from: "recluta@inteminer.com",
          to: user.email,
          subject: "Nueva Aplicaci??n Recibida",
          html: `
                  <h2>Has recibido una nueva aplicaci??n</h2>
                  <p>Nombre: ${req.body.name}</p>
                  <p>Email: ${req.body.email}</p>
                  <p>Tel??fono: ${req.body.phone}</p>
                  <p>Mensaje: ${req.body.message}</p>
                    `,
        });

        console.log("Message sent: %s", info.messageId);
      }

      main().catch(console.error);
      res.render("ciudadmaderas/submitted.ejs", { user: user });
    })
    .catch((error) => {
      if (error.response) res.sendStatus(error.response.status);
    });
});

app.listen(5500, () => {
  console.log("App running at http://localhost:5500");
});
