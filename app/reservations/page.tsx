import getReservations from "../actions/getReservations";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";

const reservationsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if ((await reservations).length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties"
      />
    );
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
};

export default reservationsPage;
