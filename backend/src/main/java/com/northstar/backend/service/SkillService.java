package com.northstar.backend.service;

import com.northstar.backend.model.Skill;
import com.northstar.backend.model.Student;
import com.northstar.backend.model.User;
import com.northstar.backend.repository.SkillRepository;
import com.northstar.backend.repository.StudentRepository;
import com.northstar.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    // Skill add karo
    public String addSkill(String email,
                           String skillName, String level) {

        // 1. User dhundho
        User user = userRepository
                .findByEmail(email)
                .orElse(null);
        if(user == null) return "User not found!";

        // 2. Student dhundho
        Student student = studentRepository
                .findByUser(user)
                .orElse(null);
        if(student == null) return "Profile not found! Pehle profile banao.";

        // 3. Skill banao
        Skill skill = new Skill();
        skill.setStudent(student);
        skill.setSkillName(skillName);
        skill.setLevel(level);

        // 4. Save karo
        skillRepository.save(skill);
        return "Skill added!";
    }

    // Skills laao
    public List<Skill> getSkills(String email) {

        User user = userRepository
                .findByEmail(email)
                .orElse(null);
        if(user == null) return List.of();

        Student student = studentRepository
                .findByUser(user)
                .orElse(null);
        if(student == null) return List.of();

        return skillRepository.findByStudent(student);
    }

    // Skill delete karo
    public String deleteSkill(Long skillId) {
        skillRepository.deleteById(skillId);
        return "Skill deleted!";
    }
}