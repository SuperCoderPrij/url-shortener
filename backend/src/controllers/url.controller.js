import urlModel from "../models/url.model.js"
import { generateCode } from "../utils/generateCode.js"

export const postUrlController = async (req, res) => {
    let { url } = req.body

    if (!url) {
        return res.status(400).json({
            error: "Please enter URL!"
        })
    }
    if ((url.startsWith("http://") === false) && (url.startsWith("https://") === false)) {
        return res.status(400).json({
            error: "Please enter valid URL starting with 'http://' or 'https://'"
        })
    }
    if (url.length > 2048) {
        return res.status(400).json({
            error: "URL should not be above 2048 characters"
        })
    }

    const code = generateCode()

    const newUrl = await urlModel.create({
        originalUrl: url,
        shortCode: code
    })

    return res.status(201).json({
        message: "URL shortened successfully!",
        data: {
            originalUrl: newUrl.originalUrl,
            shortCode: newUrl.shortCode
        }
    })
}

export const getUrlController = async (req, res) => {
    let urls = await urlModel.find()

    if (!urls) {
        return res.status(204).json({
            message: "The request was successful, but there's no content found."
        })
    }

    return res.status(200).json({
        message: "All URL fetched successfully!",
        data: urls
    })
}

export const deleteUrlController = async (req, res) => {
    const { id } = req.params

    const url = await urlModel.findById(id)

    if (!url) {
        return res.status(404).json({
            message: "URL not found!"
        })
    }

    await urlModel.findByIdAndDelete(id)

    return res.status(200).json({
        message: "URL deleted successfully!"
    })
}