import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/Wishdomain/WishdomainsCell'

const DELETE_WISHDOMAIN_MUTATION = gql`
  mutation DeleteWishdomainMutation($id: String!) {
    deleteWishdomain(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const WishdomainsList = ({ wishdomains }) => {
  const [deleteWishdomain] = useMutation(DELETE_WISHDOMAIN_MUTATION, {
    onCompleted: () => {
      toast.success('Wishdomain deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete wishdomain ' + id + '?')) {
      deleteWishdomain({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Domain</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {wishdomains.map((wishdomain) => (
            <tr key={wishdomain.id}>
              <td>{truncate(wishdomain.id)}</td>
              <td>{truncate(wishdomain.domain)}</td>
              <td>{timeTag(wishdomain.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.wishdomain({ id: wishdomain.id })}
                    title={'Show wishdomain ' + wishdomain.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editWishdomain({ id: wishdomain.id })}
                    title={'Edit wishdomain ' + wishdomain.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete wishdomain ' + wishdomain.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(wishdomain.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WishdomainsList
