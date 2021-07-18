import WishdomainCell from 'src/components/Wishdomain/WishdomainCell'

type WishdomainPageProps = {
  id: String
}

const WishdomainPage = ({ id }: WishdomainPageProps) => {
  return <WishdomainCell id={id} />
}

export default WishdomainPage
