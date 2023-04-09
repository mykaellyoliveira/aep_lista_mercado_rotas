import { Request, Response } from "express";
import ItemService from "../service/itemService";

class ItemController{
    async create(req: Request, res: Response){
        await ItemService.createItem(req.body)

        return res.status(201).send()
    }

    async list(req: Request, res:Response){
        const results = await ItemService.listItem()

        return res.status(200).send(results)
    }
}

export default new ItemController()