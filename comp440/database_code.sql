-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema class_scheduler
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `class_scheduler` ;

-- -----------------------------------------------------
-- Schema class_scheduler
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `class_scheduler` DEFAULT CHARACTER SET utf8 ;
USE `class_scheduler` ;

-- -----------------------------------------------------
-- Table `class_scheduler`.`Building`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `class_scheduler`.`Building` ;

CREATE TABLE IF NOT EXISTS `class_scheduler`.`Building` (
  `id_building` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `room_count` INT ZEROFILL UNSIGNED NOT NULL,
  `building_name` VARCHAR(45) NULL,
  `building_address` VARCHAR(45) NULL,
  PRIMARY KEY (`id_building`),
  UNIQUE INDEX `id_building_UNIQUE` (`id_building` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `class_scheduler`.`Classroom`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `class_scheduler`.`Classroom` ;

CREATE TABLE IF NOT EXISTS `class_scheduler`.`Classroom` (
  `id_classroom` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_building` INT UNSIGNED NOT NULL,
  `room_number` INT ZEROFILL UNSIGNED NOT NULL,
  `capacity` INT ZEROFILL NOT NULL,
  PRIMARY KEY (`id_classroom`),
  UNIQUE INDEX `id_classroom_UNIQUE` (`id_classroom` ASC) VISIBLE,
  UNIQUE INDEX `room_number_UNIQUE` (`room_number` ASC) VISIBLE,
  INDEX `id_building_idx` (`id_building` ASC) VISIBLE,
  CONSTRAINT `id_building`
    FOREIGN KEY (`id_building`)
    REFERENCES `class_scheduler`.`Building` (`id_building`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `class_scheduler`.`Section`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `class_scheduler`.`Section` ;

CREATE TABLE IF NOT EXISTS `class_scheduler`.`Section` (
  `id_section` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_classroom` INT UNSIGNED NOT NULL,
  `semester` VARCHAR(45) NOT NULL,
  `year` INT UNSIGNED NOT NULL,
  `section_number` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id_section`),
  UNIQUE INDEX `id_section_UNIQUE` (`id_section` ASC) VISIBLE,
  INDEX `id_classroom_idx` (`id_classroom` ASC) VISIBLE,
  UNIQUE INDEX `section_number_UNIQUE` (`section_number` ASC) VISIBLE,
  CONSTRAINT `section_id_classroom`
    FOREIGN KEY (`id_classroom`)
    REFERENCES `class_scheduler`.`Classroom` (`id_classroom`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `class_scheduler`.`Time_Section`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `class_scheduler`.`Time_Section` ;

CREATE TABLE IF NOT EXISTS `class_scheduler`.`Time_Section` (
  `id_time_section` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_section` INT UNSIGNED NOT NULL,
  `start_time` TIME NOT NULL,
  `finish_time` TIME NOT NULL,
  `duration` INT UNSIGNED NOT NULL,
  `days` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_time_section`),
  INDEX `section_id_idx` (`id_section` ASC) VISIBLE,
  UNIQUE INDEX `id_time_section_UNIQUE` (`id_time_section` ASC) VISIBLE,
  CONSTRAINT `timesection_section_id`
    FOREIGN KEY (`id_section`)
    REFERENCES `class_scheduler`.`Section` (`id_section`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `class_scheduler`.`Department`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `class_scheduler`.`Department` ;

CREATE TABLE IF NOT EXISTS `class_scheduler`.`Department` (
  `dept_name` VARCHAR(45) NOT NULL,
  `id_building` INT UNSIGNED NOT NULL,
  `budget` INT ZEROFILL NOT NULL,
  `contact_email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`dept_name`),
  INDEX `id_building_idx` (`id_building` ASC) VISIBLE,
  UNIQUE INDEX `dept_name_UNIQUE` (`dept_name` ASC) VISIBLE,
  CONSTRAINT `building_id`
    FOREIGN KEY (`id_building`)
    REFERENCES `class_scheduler`.`Building` (`id_building`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `class_scheduler`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `class_scheduler`.`User` ;

CREATE TABLE IF NOT EXISTS `class_scheduler`.`User` (
  `id_user` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept_name` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `credits` INT UNSIGNED ZEROFILL NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `salary` INT UNSIGNED ZEROFILL NULL,
  PRIMARY KEY (`id_user`),
  INDEX `dept_name_idx` (`dept_name` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `id_user_UNIQUE` (`id_user` ASC) VISIBLE,
  CONSTRAINT `user_dept_name`
    FOREIGN KEY (`dept_name`)
    REFERENCES `class_scheduler`.`Department` (`dept_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `class_scheduler`.`Course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `class_scheduler`.`Course` ;

CREATE TABLE IF NOT EXISTS `class_scheduler`.`Course` (
  `id_course` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_section` INT UNSIGNED NOT NULL,
  `dept_name` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `course_number` INT UNSIGNED NOT NULL,
  `credits` INT ZEROFILL UNSIGNED NOT NULL,
  PRIMARY KEY (`id_course`),
  INDEX `id_section_idx` (`id_section` ASC) VISIBLE,
  INDEX `dept_name_idx` (`dept_name` ASC) VISIBLE,
  UNIQUE INDEX `id_course_UNIQUE` (`id_course` ASC) VISIBLE,
  UNIQUE INDEX `course_number_UNIQUE` (`course_number` ASC) VISIBLE,
  CONSTRAINT `id_section`
    FOREIGN KEY (`id_section`)
    REFERENCES `class_scheduler`.`Section` (`id_section`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `course_dept_name`
    FOREIGN KEY (`dept_name`)
    REFERENCES `class_scheduler`.`Department` (`dept_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `class_scheduler`.`Equipment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `class_scheduler`.`Equipment` ;

CREATE TABLE IF NOT EXISTS `class_scheduler`.`Equipment` (
  `id_equipment` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_classroom` INT UNSIGNED NOT NULL,
  `whiteboard_count` INT ZEROFILL NULL,
  `projector_count` INT ZEROFILL NULL,
  `marker_count` INT ZEROFILL NULL,
  `desk` INT ZEROFILL NULL,
  PRIMARY KEY (`id_equipment`),
  INDEX `id_classroom_idx` (`id_classroom` ASC) VISIBLE,
  UNIQUE INDEX `id_equipment_UNIQUE` (`id_equipment` ASC) VISIBLE,
  CONSTRAINT `equipmet_id_classroom`
    FOREIGN KEY (`id_classroom`)
    REFERENCES `class_scheduler`.`Classroom` (`id_classroom`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `class_scheduler`.`Blackout_Hour`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `class_scheduler`.`Blackout_Hour` ;

CREATE TABLE IF NOT EXISTS `class_scheduler`.`Blackout_Hour` (
  `id_blackout_hours` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_classroom` INT UNSIGNED NOT NULL,
  `id_time_slot` INT UNSIGNED NULL,
  `reason` VARCHAR(45) NULL,
  `effective_date` VARCHAR(45) NULL,
  PRIMARY KEY (`id_blackout_hours`),
  INDEX `id_classroom_idx` (`id_classroom` ASC) VISIBLE,
  INDEX `id_time_slot_idx` (`id_time_slot` ASC) VISIBLE,
  UNIQUE INDEX `id_blackout_hours_UNIQUE` (`id_blackout_hours` ASC) VISIBLE,
  CONSTRAINT `blackout_id_classroom`
    FOREIGN KEY (`id_classroom`)
    REFERENCES `class_scheduler`.`Classroom` (`id_classroom`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `blackout_id_time_slot`
    FOREIGN KEY (`id_time_slot`)
    REFERENCES `class_scheduler`.`Time_Section` (`id_time_section`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `class_scheduler`.`Classroom_Request`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `class_scheduler`.`Classroom_Request` ;

CREATE TABLE IF NOT EXISTS `class_scheduler`.`Classroom_Request` (
  `id_classroom_request` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_classroom` INT UNSIGNED NOT NULL,
  `dept_name` VARCHAR(45) NOT NULL,
  `preferred_building_id` INT UNSIGNED NULL,
  `preferred_start` TIME NULL,
  `preferred_end` TIME NULL,
  `status` VARCHAR(45) NOT NULL,
  `id_course` INT UNSIGNED NOT NULL,
  `requested_whiteboards` INT ZEROFILL NULL,
  `requested_projectors` INT ZEROFILL NULL,
  `requested_markers` INT ZEROFILL NULL,
  `requested_desks` INT ZEROFILL NULL,
  PRIMARY KEY (`id_classroom_request`),
  INDEX `id_classroom_idx` (`id_classroom` ASC) VISIBLE,
  INDEX `dept_name_idx` (`dept_name` ASC) VISIBLE,
  INDEX `id_course_idx` (`id_course` ASC) VISIBLE,
  INDEX `preferred_building_id_idx` (`preferred_building_id` ASC) VISIBLE,
  UNIQUE INDEX `id_classroom_request_UNIQUE` (`id_classroom_request` ASC) VISIBLE,
  CONSTRAINT `class_id_classroom`
    FOREIGN KEY (`id_classroom`)
    REFERENCES `class_scheduler`.`Classroom` (`id_classroom`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `class_dept_name`
    FOREIGN KEY (`dept_name`)
    REFERENCES `class_scheduler`.`Department` (`dept_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_course`
    FOREIGN KEY (`id_course`)
    REFERENCES `class_scheduler`.`Course` (`id_course`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `preferred_building_id`
    FOREIGN KEY (`preferred_building_id`)
    REFERENCES `class_scheduler`.`Building` (`id_building`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `class_scheduler`.`Conflict_Log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `class_scheduler`.`Conflict_Log` ;

CREATE TABLE IF NOT EXISTS `class_scheduler`.`Conflict_Log` (
  `id_conflict` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_classroom_request` INT UNSIGNED NOT NULL,
  `conflict_type` VARCHAR(45) NULL,
  `resolution_method` VARCHAR(45) NULL,
  `timestamp` TIME NULL,
  PRIMARY KEY (`id_conflict`),
  INDEX `id_classroom_request_idx` (`id_classroom_request` ASC) VISIBLE,
  UNIQUE INDEX `id_conflict_UNIQUE` (`id_conflict` ASC) VISIBLE,
  CONSTRAINT `id_classroom_request`
    FOREIGN KEY (`id_classroom_request`)
    REFERENCES `class_scheduler`.`Classroom_Request` (`id_classroom_request`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `class_scheduler` ;

-- -----------------------------------------------------
-- View `class_scheduler`.`view_classroom_requests`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `class_scheduler`.`view_classroom_requests` ;
USE `class_scheduler`;
CREATE  OR REPLACE VIEW view_classroom_requests AS
SELECT *
FROM Classroom_Request;

-- -----------------------------------------------------
-- View `class_scheduler`.`view_buildings`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `class_scheduler`.`view_buildings` ;
USE `class_scheduler`;
CREATE  OR REPLACE VIEW view_buildings AS
SELECT * FROM Building;

-- -----------------------------------------------------
-- View `class_scheduler`.`view_blackouts`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `class_scheduler`.`view_blackouts` ;
USE `class_scheduler`;
CREATE  OR REPLACE VIEW view_blackouts AS
SELECT * FROM Blackout_Hour;

-- -----------------------------------------------------
-- View `class_scheduler`.`view_classrooms`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `class_scheduler`.`view_classrooms` ;
USE `class_scheduler`;
CREATE  OR REPLACE VIEW view_classrooms AS
SELECT * FROM Classroom;

-- -----------------------------------------------------
-- View `class_scheduler`.`view_conflict_log`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `class_scheduler`.`view_conflict_log` ;
USE `class_scheduler`;
CREATE  OR REPLACE VIEW view_conflict_log AS
SELECT * FROM Conflict_Log;

-- -----------------------------------------------------
-- View `class_scheduler`.`view_courses`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `class_scheduler`.`view_courses` ;
USE `class_scheduler`;
CREATE  OR REPLACE VIEW view_courses AS
SELECT * FROM Course;

-- -----------------------------------------------------
-- View `class_scheduler`.`view_departments`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `class_scheduler`.`view_departments` ;
USE `class_scheduler`;
CREATE  OR REPLACE VIEW view_departments AS
SELECT * FROM Department;

-- -----------------------------------------------------
-- View `class_scheduler`.`view_equipment`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `class_scheduler`.`view_equipment` ;
USE `class_scheduler`;
CREATE  OR REPLACE VIEW view_equipment AS
SELECT * FROM Equipment;

-- -----------------------------------------------------
-- View `class_scheduler`.`view_sections`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `class_scheduler`.`view_sections` ;
USE `class_scheduler`;
CREATE  OR REPLACE VIEW view_sections AS
SELECT * FROM Section;

-- -----------------------------------------------------
-- View `class_scheduler`.`view_time_sections`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `class_scheduler`.`view_time_sections` ;
USE `class_scheduler`;
CREATE  OR REPLACE VIEW view_time_sections AS
SELECT * FROM Time_Section;

-- -----------------------------------------------------
-- View `class_scheduler`.`view_users`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `class_scheduler`.`view_users` ;
USE `class_scheduler`;
CREATE  OR REPLACE VIEW view_users AS
SELECT * FROM User;
SET SQL_MODE = '';
DROP USER IF EXISTS Student;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'Student';

GRANT SELECT ON TABLE `class_scheduler`.* TO 'Student';
SET SQL_MODE = '';
DROP USER IF EXISTS Department_Secretary;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'Department_Secretary';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE `class_scheduler`.* TO 'Department_Secretary';
GRANT SELECT, INSERT, TRIGGER ON TABLE `class_scheduler`.* TO 'Department_Secretary';
GRANT SELECT ON TABLE `class_scheduler`.* TO 'Department_Secretary';
SET SQL_MODE = '';
DROP USER IF EXISTS System_Admin;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'System_Admin';

GRANT ALL ON `class_scheduler`.* TO 'System_Admin';
GRANT SELECT ON TABLE `class_scheduler`.* TO 'System_Admin';
GRANT SELECT, INSERT, TRIGGER ON TABLE `class_scheduler`.* TO 'System_Admin';
GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE `class_scheduler`.* TO 'System_Admin';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
