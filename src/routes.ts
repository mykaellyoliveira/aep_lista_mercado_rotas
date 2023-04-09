import { Router } from "express";
import ItemController from './controller/itemController'

const routes = Router()

routes.post('/itens', ItemController.create)

routes.get('/itens', ItemController.list)


export default routes