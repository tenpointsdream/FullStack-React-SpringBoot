package springboot.com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springboot.com.entity.User;
import springboot.com.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public Optional<User> addUser(User user) {
		return Optional.of(userRepository.save(user));
	}

	@Override
	public Optional<User> getUser(long id) {
		return userRepository.findById(id);
	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public List<User> getUsersByFirstName(String firstName) {
		return userRepository.findByFirstName(firstName);
	}

	@Override
	public Optional<User> updateUser(User user) {
		return Optional.of(userRepository.save(user));
	}

	@Override
	public void deleteUser(long id) {
		userRepository.deleteById(id);
	}

}
