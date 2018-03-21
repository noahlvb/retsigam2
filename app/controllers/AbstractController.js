const express = require('express')

const auth = require('./../middlewares/auth')

class AbstractController {
    constructor() {
        this.router = express.Router()
        this.auth = auth

        this.registerRoutes()

        return this.router
    }
}

module.exports = AbstractController
