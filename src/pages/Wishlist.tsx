/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useGetWishlistQuery } from '../redux/features/user/userApi';

const Wishlist = () => {
  const { data } = useGetWishlistQuery(undefined);
  console.log(data);

  return <div>Wishlist</div>;
};

export default Wishlist;
