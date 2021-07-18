import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_WISHDOMAIN_MUTATION = gql`
  mutation DeleteWishdomainMutation($id: String!) {
    deleteWishdomain(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Wishdomain = ({ wishdomain }) => {
  const [deleteWishdomain] = useMutation(DELETE_WISHDOMAIN_MUTATION, {
    onCompleted: () => {
      toast.success('Wishdomain deleted')
      navigate(routes.wishdomains())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete wishdomain ' + id + '?')) {
      deleteWishdomain({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Wishdomain {wishdomain.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{wishdomain.id}</td>
            </tr><tr>
              <th>Domain</th>
              <td>{wishdomain.domain}</td>
            </tr><tr>
              <th>Created at</th>
              <td>{timeTag(wishdomain.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editWishdomain({ id: wishdomain.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(wishdomain.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Wishdomain
