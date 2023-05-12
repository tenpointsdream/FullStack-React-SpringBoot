package springboot.com.service;

import java.util.List;
import java.util.Optional;

import springboot.com.entity.User;

public interface UserService {

	public Optional<User> addUser(User user);

	public Optional<User> getUser(long id);

	public List<User> getAllUsers();

	public List<User> getUsersByFirstName(String firstName);

	public Optional<User> updateUser(User user);

	public void deleteUser(long id);
}
