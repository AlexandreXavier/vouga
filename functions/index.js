"use strict";
// Import and initialize the Firebase Admin SDK.
const functions = require("firebase-functions");
const admin = require("firebase-admin");

//send email to confirme
const nodemailer = require("nodemailer");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

//mensagens to firestore database
const spawn = require("child-process-promise").spawn;
const path = require("path");
const os = require("os");
const fs = require("fs");

admin.initializeApp();

// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

const APP_NAME = "PortocaroDos";

exports.sendWelcomeEmail = functions.auth.user().onCreate(user => {
  // [END onCreateTrigger]
  // [START eventAttributes]
  const email = user.email; // The email of the user.
  console.log("sendWelcomeEmail- " + email);
  const displayName = user.displayName; // The display name of the user.
  // [END eventAttributes]

  return sendWelcomeEmail(email, displayName);
});
// [END sendWelcomeEmail]

exports.sendByeEmail = functions.auth.user().onDelete(user => {
  // [END onDeleteTrigger]
  const email = user.email;
  const displayName = user.displayName;

  return sendGoodbyeEmail(email, displayName);
});
// [END sendByeEmail]

//mensagens to firestore database
exports.addWelcomeMessages = functions.auth.user().onCreate(async user => {
  const fullName = user.displayName || "Anonymous";
  console.log("NOME do User" + fullName);

  // Saves the new welcome message into the database
  // which then displays it in the FriendlyChat clients.
  await admin
    .firestore()
    .collection("messages")
    .add({
      name: "Vouga Bot",
      profilePicUrl: "/avatar-1.png", // Firebase logo
      text: `${fullName} Vamos ver se Funciona! Bem Vindo II!`,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
  console.log("Welcome message written to database.");
});

// Envia um email ao novo utilizador registado.
async function sendWelcomeEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Olá ${displayName ||
    ""}! Bem vindo ao clube ${APP_NAME}. Espero que goste dos serviços que vamos dispor para si.`;
  await mailTransport.sendMail(mailOptions);
  console.log("Email de agradecimento ao novo assinante:", email);
  return null;
}
