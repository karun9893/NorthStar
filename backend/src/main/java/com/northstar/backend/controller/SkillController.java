package com.northstar.backend.controller;

import com.northstar.backend.model.Skill;
import com.northstar.backend.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    // POST /api/skills/add
    @PostMapping("/add")
    public String addSkill(
            @RequestParam String email,
            @RequestParam String skillName,
            @RequestParam String level) {

        return skillService.addSkill(
                email, skillName, level);
    }

    // GET /api/skills?email=karun@gmail.com
    @GetMapping
    public List<Skill> getSkills(
            @RequestParam String email) {

        return skillService.getSkills(email);
    }

    // DELETE /api/skills/{id}
    @DeleteMapping("/{id}")
    public String deleteSkill(@PathVariable Long id) {
        return skillService.deleteSkill(id);
    }
}