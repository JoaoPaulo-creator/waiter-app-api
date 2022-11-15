import path from 'node:path'
import multer from 'multer'


import { Router } from 'express'
import { createCaregory } from './useCases/categories/createCategory'
import { listCaregories } from './useCases/categories/listCategories'
import { updateCaregory } from './useCases/categories/updateCategory'
import { createProduct } from './useCases/products/createProducts'
import { listProducts } from './useCases/products/listProducts'
import { listProductsByCategory } from './useCases/categories/listCateogyByProduct'
import { listOrders } from './useCases/orders/listOrders'
import { createOrder } from './useCases/orders/createOrder'
import { changeOrderStatus } from './useCases/orders/changeOrderStatus'
import { cancelOrder } from './useCases/orders/cancelOrder'

// middlware utilizado para salvar uma imagem em disco
// Este será utiliado no endpoint de cadastro de produtos, onde será necessário salvar imagens
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, callback){
            callback(null, path.resolve(__dirname, '..', 'uploads'))
        },
        // adicionado um formato de arquivo para quando a imagem for salva no server
        filename(req, file, callback){
            callback(null, `${Date.now()}-${file.originalname}`)
        }
    })

})

export const router = Router()

router.patch('/categories/:categoryId', updateCaregory)
router.get('/categories', listCaregories)
router.post('/categories', createCaregory)

router.get('/categories/:categoryId/products', listProductsByCategory)

//categorias

router.get('/products', listProducts)
router.post('/products', upload.single('image'), createProduct)

router.get('/orders', listOrders)
router.post('/orders', createOrder)

router.patch('/orders/:orderId', changeOrderStatus)

router.delete('/orders/:orderId', cancelOrder)