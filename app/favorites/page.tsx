import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import FavoritesClient from "./FavoritesClient";
import getFavoriteListings from "../actions/getFavoriteListings";

const listingPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const listings = await getFavoriteListings();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have not favorites listings"
      />
    );
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
};

export default listingPage;
