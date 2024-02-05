import prisma from "@/app/libs/prismadb";

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return listings;
    // const safeListings = listings.map((listsing) => ({
    //   ...listsing,
    //   createdAt: listsing.createdAt.toISOString(),
    // }));
    // return safeListings;
  } catch (error: any) {
    throw new Error(error?.message || "Error get listings");
  }
}
