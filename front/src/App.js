import { useState, useEffect } from 'react';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const UserItem = ({firstName, lastName}) => {
  return (
    <div>
      <p>First name: {firstName}</p>
      <p>Last name: {lastName}</p>
    </div>
  )
}

const UserList = (props) => {
  const { users = [] } = props;

  const items = users.map(u => (
      <UserItem
        key={u._id}
        firstName={u.firstName}
        lastName={u.lastName}
      />
    )
  )

  return (
    <div>
      {items}
    </div>
  )
}

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/api/users`);
      const parsed = await res.json();

      setIsLoading(false);
      setUsers(parsed);
    } catch (err) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <>
      {
        !users.length && !isLoading && <div>no users</div>
      }
      {
        isLoading && <div>loading</div>
      }
      {
        users.length && !isLoading && <UserList users={users} />
      }
    </>
  )
}

export default App;
