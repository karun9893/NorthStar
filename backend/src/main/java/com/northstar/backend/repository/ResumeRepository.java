package com.northstar.backend.repository;

import com.northstar.backend.model.Resume;
import com.northstar.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ResumeRepository
        extends JpaRepository<Resume, Long> {

    Optional<Resume> findByStudent(Student student);
}