package com.northstar.backend.repository;

import com.northstar.backend.model.Skill;
import com.northstar.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SkillRepository
        extends JpaRepository<Skill, Long> {

    List<Skill> findByStudent(Student student);
}