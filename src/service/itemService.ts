import { appendFile, writeFile, readFile } from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'
import { existsSync, read } from 'fs';


class ItemService {
    async createItem(data) {
        const { name, category, price, image } = data;
        const imageBuffer = Buffer.from(image, 'base64')
        const imageName = `${uuidv4()}.jpg`;

        try {
            await writeFile(`./uploads/${imageName}`, imageBuffer)
            const data = {
                name,
                category,
                price,
                image: `./uploads/${imageName}`,
            }

            if (existsSync('itens.json')) {

                const arq = await readFile('itens.json')

                let arrayJson = JSON.parse(arq.toString())

                arrayJson.push(data)

                await writeFile('itens.json', JSON.stringify(arrayJson, null, 2), 'utf-8')
            }
            else {
                const arrayJSONVazio = '[]';
                await writeFile('itens.json', arrayJSONVazio)

                const arq = await readFile('itens.json')

                let arrayJson = JSON.parse(arq.toString())

                arrayJson.push(data)

                await writeFile('itens.json', JSON.stringify(arrayJson, null, 2), 'utf-8')
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    async listItem(){
       try{
          const result = await readFile('itens.json', 'utf-8')
          let retorno = JSON.parse(result)
          return result
       }
       catch(error){
            console.log(error)
       }
    }
}
export default new ItemService()