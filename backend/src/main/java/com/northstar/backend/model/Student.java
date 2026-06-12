package com.northstar.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="students")
@Data
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

    private String fullName;
    private String college;
    private String branch;
    private Integer graduationYear;
    private String phone;
    private String linkedinUrl;
    private String githubUrl;
}