import { prisma } from "@/app/lib/prisma"
import { Data } from './../../../../node_modules/effect/dist/esm/Schema';

export async function GET(){

    const products = await prisma.products.findMany()

    return Response.json(products)

}

export async function POST(request){
    
    const body = await request.json()
    
    const createdProduct = await prisma.products.create({
        data:{
            title: body.title,
            price: body.price
        }
    })

    return Response.json({
        status: 'success',
        message: createdProduct
    })

}

export async function DELETE(req){

    const body = await req.json()

    const deletedProduct = await prisma.products.delete({
        where: {
            id: body.id
        }
    })

    console.log(deletedProduct)
    return Response.json(deletedProduct)
}

export async function PUT(req){

    const body = await req.json()

    const updatedProduct = await prisma.products.update({
        where: {
            id: body.id
        },
        data:{
            title: body.title,
            price: body.price
        }
    })

    return Response.json(updatedProduct)

}