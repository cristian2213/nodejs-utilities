importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"
);

self.addEventListener("message", (e) => {
  const { data } = e;

  if (data.type === "hash") {
    const secretKey = "1234567891234567";
    const cipherText = CryptoJS.AES.encrypt(data.message, secretKey).toString();

    const originalText = CryptoJS.AES.decrypt(cipherText, secretKey).toString(
      CryptoJS.enc.Utf8
    );

    // This returns a message in reponse.
    self.postMessage({
      type: "hashResult",
      result: cipherText + " - " + originalText,
    });
  }
});
