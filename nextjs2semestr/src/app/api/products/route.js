export function GET(){

    const productsfromdb = [
        {
            id: 1,
            title: 'T-shirt'
        },
        {
            id: 2,
            title: 'Sneakers'
        },
        {
            id: 3,
            title: 'T-Shirt black'
        },
        {
            id: 4,
            title: 'Iphone X'
        }
    ]

    return Response.json(productsfromdb)

}

export async function POST(request){
    
    const body = await request.json()
    
    // Здесь добавление товара в бд из тела запроса

    return Response.json({
        status: 'success',
        message: `Товар ${body.title} добавлен в БД`
    })

}

// export function DELETE(){

// }

