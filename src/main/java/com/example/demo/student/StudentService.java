package com.example.demo.student;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {

    @Autowired
    private final StudentRepository studentRepository;


    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    public void addStudent(Student student) {
        //check if email is taken
        if (studentRepository.selectExistsEmail(student.getEmail())){
            throw new BadRequestException("email "+ student.getEmail()+" is taken");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        // check if student exists
        if(!studentRepository.existsById(studentId)){
            throw new StudentNotFoundException(
                    "student with id " + studentId +" is not exits"
            );
        }
        studentRepository.deleteById(studentId);
    }
}
