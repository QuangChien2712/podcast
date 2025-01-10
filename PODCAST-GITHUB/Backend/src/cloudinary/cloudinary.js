import dotenv from 'dotenv'
import cloudinary from 'cloudinary'

dotenv.config()

cloudinary.config({
    cloud_name: "denvqae4v",
    api_key: "879654272522899",
    api_secret: "f4dDCroFWfRE3Nck05u7LgSQoFk",
});

export default cloudinary