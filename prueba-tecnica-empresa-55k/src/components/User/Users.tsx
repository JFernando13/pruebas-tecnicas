import { SortBy, type User } from '../../types.d'

interface UsersProps {
  changeSorting: (sort: SortBy) => void
  onDelete: (id: string) => void
  showColor: boolean
  users: User[]
}
const headers = [SortBy.PROFILE, SortBy.NAME, SortBy.LAST_NAME, SortBy.EMAIL, SortBy.COUNTRY, SortBy.GENDER]
export default function Users ({ users, showColor, onDelete, changeSorting }: UsersProps) {
  return (
    <table>
      <thead>
        {
          headers.map((header, index) => (
            <th
              key={`${header}-${index}`}
              onClick={() => changeSorting(header)}
            >
              {header[0].toLocaleUpperCase() + header.slice(1)}
            </th>))
        }
      </thead>
      <tbody>
        {
          users.map((user, index) => {
            const background = index % 2 === 0 ? '#333' : '#555'
            const color = showColor ? background : 'transparent'
            return (
              <tr key={user.id.value ?? crypto.randomUUID()} style={{ background: color }}>
                <td>
                  <img src={user.picture.thumbnail } alt={user.name.title} />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.email}</td>
                <td>{user.location.country}</td>
                <td>{user.gender}</td>
                <td><button onClick={() => { onDelete(user.login.uuid) } }>Eliminar</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
