package springboot.com.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springboot.com.entity.User;
import springboot.com.service.UserService;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/adduser")
	public ResponseEntity<Optional<User>> saveUser(@RequestBody User user) {
		Optional<User> newUser = userService.addUser(user);
		return new ResponseEntity<>(newUser, HttpStatus.CREATED);
	}

	@GetMapping("/getuser/{id}")
	public ResponseEntity<Optional<User>> getUser(@PathVariable("id") long id) {
		Optional<User> user = userService.getUser(id);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@GetMapping("/getallusers")
	public ResponseEntity<List<User>> getAllUser() {
		List<User> users = userService.getAllUsers();
		return new ResponseEntity<>(users, HttpStatus.OK);
	}

	@GetMapping("/search/{firstName}")
	public ResponseEntity<List<User>> getUsersByFirstName(@PathVariable("firstName") String firstName) {
		List<User> users = userService.getAllUsers();
		if (users == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			List<User> filteredUsers = new ArrayList<>();
			for (User user : users) {
				if (user.getFirstName().toLowerCase().contains(firstName.toLowerCase())) {
					filteredUsers.add(user);
				}
			}
			return filteredUsers == null ? new ResponseEntity<>(HttpStatus.NOT_FOUND)
					: new ResponseEntity<>(users, HttpStatus.OK);
		}
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Optional<User>> updateUser(@PathVariable("id") long id, @RequestBody User user) {
		Optional<User> optionalUser = userService.getUser(id);
		if (optionalUser.isPresent()) {
			user.setId(id);
			Optional<User> updatedUser = userService.updateUser(user);
			return new ResponseEntity<>(updatedUser, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable("id") long id) {
		Optional<User> optionalUser = userService.getUser(id);
		if (optionalUser.isPresent()) {
			userService.deleteUser(id);
			return new ResponseEntity<>("User deleted", HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
