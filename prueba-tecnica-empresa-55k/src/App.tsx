import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import Users from './components/User/Users'
import { SortBy, type User } from './types.d'

function App () {
  const [error, setError] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [showColor, setShowColor] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [inputFilter, setInputFilter] = useState('')

  const originalUsers = useRef<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(data => {
        setUsers(data.results)
        originalUsers.current = data.results
      })
      .catch(err => { setError(err) })
  }, [])

  const toggleColor = () => { setShowColor(!showColor) }

  const toggleSorting = () => {
    const newSorting = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSorting)
  }

  const handleDelete = (id: string) => {
    const filteredUsers = users.filter(({ login }) => login.uuid !== id)
    setUsers(filteredUsers)
  }

  const resetState = () => { setUsers(originalUsers.current) }

  const filteredUsers = useMemo(() => {
    if (inputFilter.length > 0) {
      return users.filter(user => user.location.country.toLowerCase().includes(inputFilter.toLowerCase()))
    }

    return users
  }, [inputFilter, users])

  const sortedUsers = useMemo(() => {
    console.log('Sorted Users')
    if (sorting === SortBy.COUNTRY) {
      return filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
    }

    return filteredUsers
  }, [sorting, filteredUsers])

  const changeSorting = (sort: SortBy) => {
    console.log(sort)
    setSorting(sort)
  }
  return (
    <>
      <header>
        <button onClick={toggleColor}>Mostrar Colores</button>
        <button onClick={toggleSorting}>{sorting === SortBy.COUNTRY ? 'Desordenar' : 'Ordenar por pais'}</button>
        <button onClick={resetState}>Resetear Estado</button>
        <input type="text" placeholder='Filtrar por país' onChange={e => { setInputFilter(e.target.value) }}/>
      </header>
      {error && <p>{error}</p>}
      <Users users={sortedUsers} showColor={showColor} onDelete={handleDelete} changeSorting={changeSorting} />
    </>
  )
}

export default App
