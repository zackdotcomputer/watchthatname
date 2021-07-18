import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type WishdomainLayoutProps = {
  children: React.ReactNode
}

const WishdomainsLayout = ({ children }: WishdomainLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.wishdomains()}
            className="rw-link"
          >
            Wishdomains
          </Link>
        </h1>
        <Link
          to={routes.newWishdomain()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Wishdomain
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default WishdomainsLayout
