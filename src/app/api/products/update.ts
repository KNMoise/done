import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { productId: string } }) {
  const { productId } = params;
  const { name, description, price, stock, imageUrl } = await req.json();

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: parseInt(productId),
      },
      data: {
        name,
        description,
        price,
        stock,
        imageUrl: imageUrl || '',
      },
    });
    return new Response(JSON.stringify(updatedProduct), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error updating product', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
