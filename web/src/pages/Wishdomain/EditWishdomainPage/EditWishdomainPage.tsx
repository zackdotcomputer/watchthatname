import EditWishdomainCell from "src/components/Wishdomain/EditWishdomainCell";

type WishdomainPageProps = {
  id: string;
};

const EditWishdomainPage = ({ id }: WishdomainPageProps) => {
  return <EditWishdomainCell id={id} />;
};

export default EditWishdomainPage;
