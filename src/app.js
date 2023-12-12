import express, { urlencoded } from "express"
import { router } from "./routes/routes.js"
import { AppError } from "./common/errors/appError.js"
import { globlalErrorHandler } from "./common/errors/error.controller.js"

const app = express()

app.use(express.json())
app.use(urlencoded({extended:true}))

//rutas
app.use("/api/v1", router)

//erros

app.all("*", (req, res, next) => {
  return next(new AppError(`This is url is not define ${req.originalUrl}`,404))
})

app.use(globlalErrorHandler)

export default app