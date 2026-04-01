const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

const bucket = admin.storage().bucket("sparkbagrut.appspot.com");

exports.pdfProxy = onRequest({invoker: "public"}, async (request, response) => {
  try {
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.set("Allow", "GET, HEAD");
      response.status(405).send("Method Not Allowed");
      return;
    }

    // Expected path: /pdfs/<folder>/<file-name.pdf>
    const rawPath = request.path || "/";
    const parts = rawPath.split("/").filter(Boolean);

    if (parts.length < 3 || parts[0] !== "pdfs") {
      response.status(400).send("Invalid PDF path");
      return;
    }

    const folder = decodeURIComponent(parts[1]);
    const fileName = decodeURIComponent(parts.slice(2).join("/"));
    const storagePath = `${folder}/${fileName}`;

    const file = bucket.file(storagePath);
    const [exists] = await file.exists();
    if (!exists) {
      response.status(404).send("File not found");
      return;
    }

    response.set("Content-Type", "application/pdf");
    response.set("Cache-Control", "public, max-age=3600");

    if (request.method === "HEAD") {
      response.status(200).end();
      return;
    }

    file.createReadStream()
        .on("error", () => {
          if (!response.headersSent) {
            response.status(500).send("Failed to stream file");
          } else {
            response.end();
          }
        })
        .pipe(response);
  } catch (error) {
    response.status(500).send("Internal server error");
  }
});
