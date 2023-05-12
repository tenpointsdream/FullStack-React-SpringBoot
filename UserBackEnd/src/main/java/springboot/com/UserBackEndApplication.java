package springboot.com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import springboot.com.entity.User;
import springboot.com.service.UserService;

@SpringBootApplication
public class UserBackEndApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext ctx = SpringApplication.run(UserBackEndApplication.class, args);
		UserService userService = ctx.getBean(UserService.class);
		userService.addUser(new User(0, "Khoa", "Ho", "123 No street", "noemail123@gmail.com", "https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png"));
		userService.addUser(new User(0, "John", "Doe", "234 No street", "noemail234@gmail.com", "https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png"));
		userService.addUser(new User(0, "Jimmy", "Doe", "345 No street", "noemail345@gmail.com", "https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png"));
	}

}
