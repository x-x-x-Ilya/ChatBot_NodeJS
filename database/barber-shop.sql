DROP DATABASE barbershop;
CREATE DATABASE barbershop;

\c barbershop --USE barber-shop;

CREATE TABLE barbers (
	id         serial           NOT NULL PRIMARY KEY, -- serial == AUTO_INCREMENT,
	email      VARCHAR(255) NOT NULL UNIQUE,
	first_name VARCHAR(255) NOT NULL,
	last_name  VARCHAR(255) NOT NULL,
	deleted    BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE TABLE appointments (
    id 	 serial  PRIMARY KEY,
	date  DATE NOT NULL,
	time TIME NOT NULL,
    deleted    BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE TABLE clients (
	id         INT          NOT NULL PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name  VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL UNIQUE
);


ALTER TABLE appointments ADD CONSTRAINT client_id_idx FOREIGN KEY (id) REFERENCES clients(id);--ON DELETE CASCADE;
ALTER TABLE appointments ADD CONSTRAINT barbers_id_idx FOREIGN KEY (id) REFERENCES barbers(id);-- ON DELETE CASCADE;
--ALTER TABLE `posts_tags`  ADD CONSTRAINT `posts_tags_post_id_idx`  FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE;
--ALTER TABLE `posts_tags`  ADD CONSTRAINT `posts_tags_tag_id_idx`   FOREIGN KEY (`tag_id`)  REFERENCES `tags`(`id`)  ON DELETE CASCADE;

--ALTER TABLE `likes`       ADD CONSTRAINT `likes_user_id`           FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;
--ALTER TABLE `posts`       ADD CONSTRAINT `posts`                   FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;
--ALTER TABLE `likes`       ADD CONSTRAINT `likes_post_id`           FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE;
