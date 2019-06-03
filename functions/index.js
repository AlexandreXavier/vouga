"use strict";
// Import and initialize the Firebase Admin SDK.
const functions = require("firebase-functions");
const admin = require("firebase-admin");

const spawn = require("child-process-promise").spawn;
const path = require("path");
const os = require("os");
const fs = require("fs");

admin.initializeApp();

exports.addWelcomeMessages = functions.auth.user().onCreate(async user => {
  console.log("DENTRO.");

  const fullName = user.displayName || "Anonymous";
  console.log("NOME " + fullName);

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
