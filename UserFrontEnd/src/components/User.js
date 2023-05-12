
import './User.css'
const { useState, useEffect } = require("react")

const Form = ({ currentuser, onSubmit }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        imgUrl: '',
    });
    useEffect(() => {
        if (currentuser) {
            setFormData({
                firstName: currentuser.firstName,
                lastName: currentuser.lastName,
                address: currentuser.address,
                email: currentuser.email,
                imgUrl: currentuser.imgUrl,
            })
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                address: '',
                email: '',
                imgUrl: '',
            })
        }
    }, [currentuser])
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData)
        console.log(formData);
    }

    const handleUserChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="firstName">First Name: </label>
                <input
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleUserChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name: </label>
                <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleUserChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="address">Address: </label>
                <input
                    className="form-control"
                    name="address"
                    placeholder="123 Street address"
                    value={formData.address}
                    onChange={handleUserChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleUserChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="imgUrl">Image URL: </label>
                <input
                    type="text"
                    name="imgUrl"
                    className="form-control"
                    id="imgUrl"
                    value={formData.imgUrl}
                    onChange={handleUserChange}
                    required
                />
            </div>
            <div>
                <button className="form-control btn submit" type="submit">{currentuser ? "Update" : "Add"}</button>
            </div>
        </form>
    )
}


function User() {
    const [showForm, setShowForm] = useState(false);
    const [currentuser, setCurrentuser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const baseUrl = 'http://localhost:8080/api';
    const handleEditUser = (user) => {
        setShowForm(true);
        setCurrentuser(user);
        console.log(currentuser);
    };
    const hideForm = () => setShowForm(false);
    const fetchUsers = async () => {
        fetch(`${baseUrl}/getallusers`)
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setUsers(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }
    useEffect(() => {
        fetchUsers();
    }, []);
    const updateUser = async (userId, userData) => {
        try {
            const response = await fetch(`http://localhost:8080/api/update/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const updatedUser = await response.json();
            console.log(updatedUser);
            setUsers((previousUsers) =>
                previousUsers.map((user) => (user.id === userId ? updatedUser : user))
            );
            setShowForm(false);
        } catch (error) {
            console.error(error);
        }
    }

    const createUser = async (userData) => {
        try {
            const response = await fetch('http://localhost:8080/api/adduser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            console.log(data);
            setShowForm(false);
        } catch (error) {
            console.error(error);
        }
        fetchUsers();
    }

    const deleteUser = async (userId) => {
        try {
            if (window.confirm('Do you want to delete this user?')) {
                await fetch(`http://localhost:8080/api/delete/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log("User deleted");
            }
        } catch (error) {
            console.error(error);
        }
        fetchUsers();
    }
    const handleSubmit = (formData) => {
        if (currentuser) {
            updateUser(currentuser.id, formData);
            setCurrentuser(null);
        } else {
            createUser(formData);
        }
        setCurrentuser(null);
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className='container'>
                <div>
                    <h2>User Management system</h2>
                </div>
                <div>
                    <button className='btn adduser' currentuser={null} onClick={() => handleEditUser(null)}>Add User</button>
                </div>
                <div className='table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Picture</th>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td><img src={user.imgUrl} alt='profile'></img></td>
                                    <td>{user.id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.address}</td>
                                    <td>{user.email}</td>
                                    <td className='buttonfield'>
                                        <button className='btn update' onClick={() => handleEditUser(user)}>Update</button>
                                    </td>
                                    <td className='buttonfield'>
                                        <button className='btn delete' onClick={() => deleteUser(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    {showForm ?
                        <>
                            <Form currentuser={currentuser} onSubmit={handleSubmit} />
                            <button className='btn hide' onClick={hideForm}>Hide</button>
                        </>
                        : null}
                </div>
            </div>
        );
    }
}

export default User;