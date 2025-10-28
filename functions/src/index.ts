
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
export const addmessage = onCall(async (request) => {
  // Grab the text parameter.
  const original = request.data.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin
    .firestore()
    .collection("messages")
    .add({original: original});
  // Send back a message that we've succesfully written the message
  return {result: `Message with ID: ${writeResult.id} added.`};
});


export const verifyDomain = onCall(async (request) => {
  const {workspaceId, currentDomain} = request.data;

  if (!workspaceId || !currentDomain) {
    logger.error("Missing workspaceId or currentDomain", {workspaceId, currentDomain});
    // While we could throw an error, returning 'allowed: false' is safer
    // as it prevents the widget from loading on a misconfigured request.
    return {allowed: false};
  }

  // Allow localhost for local development
  if (currentDomain === "localhost") {
    return {allowed: true};
  }

  try {
    const workspaceRef = db.collection("workspaces").doc(workspaceId);
    const doc = await workspaceRef.get();

    if (!doc.exists) {
      logger.warn(`Workspace document not found: ${workspaceId}`);
      return {allowed: false};
    }

    const workspaceData = doc.data();
    const whitelistedDomains = workspaceData?.whitelistedDomains;

    // If the array is empty or doesn't exist, allow the domain.
    if (!whitelistedDomains || whitelistedDomains.length === 0) {
      return {allowed: true};
    }

    // Check if the current domain is in the whitelist.
    if (whitelistedDomains.includes(currentDomain)) {
      return {allowed: true};
    } else {
      logger.info(`Domain not allowed: ${currentDomain} for workspace ${workspaceId}`);
      return {allowed: false};
    }
  } catch (error) {
    logger.error("Error during domain verification:", error);
    return {allowed: false};
  }
});
