import prisma from "@/app/libs/prismadb";

export default async function getListings() {
  try {
    const Listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return Listings;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
