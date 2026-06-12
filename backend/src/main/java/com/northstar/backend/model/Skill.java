package com.northstar.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="skills")
@Data
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="student_id")
    private Student student;

    private String skillName;
    private String level;
}