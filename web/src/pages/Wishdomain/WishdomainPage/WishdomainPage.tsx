import WishdomainCell from "src/components/Wishdomain/WishdomainCell";

type WishdomainPageProps = {
  id: string;
};

const WishdomainPage = ({ id }: WishdomainPageProps) => {
  return <WishdomainCell id={id} />;
};

export default WishdomainPage;
