const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    const options = {
        folder
    };
    if(height) {
            options.height = height;
        }
        if(quality) {
            options.quality = quality;
        }
    options.resource_type = 'auto';

    //self coded 
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.tempFilePath, options, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    }); 
}