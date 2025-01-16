const { APP_CONFIG } = require("../config/app.config");
const ImageKit = require("imagekit");
const {
  IMAGEKIT_ENDPOINT_URL,
  IMAGEKIT_INSTANCE_ID,
  IMAGEKIT_PRIVATE_KEY,
  IMAGEKIT_PUBLIC_KEY,
} = APP_CONFIG;

// register or make image kit instance
var imagekit = new ImageKit({
  publicKey: IMAGEKIT_PUBLIC_KEY,
  privateKey: IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: IMAGEKIT_ENDPOINT_URL,
});

// upload
async function upload({ files }) {
  try {
    if (Array.isArray(files)) {
      const promises = [];
      for (const f of files) {
        const imagekitFileParam = Buffer.from(f.src);
        promises.push(
          imagekit.upload({
            file: imagekitFileParam,
            fileName: f.fileName,
          })
        );
      }
      await Promise.all(promises);
      return { message: "success" };
    } else {
      throw new Error("Upload failed due to invalid parameter!")
    }
  } catch (error) {
    console.log({
      info: "Erro while uploading file",
      error,
      message: error?.message,
    });
  }
}
// generate url
// download

// get file details

module.exports.uploadService = {
  upload,
};
