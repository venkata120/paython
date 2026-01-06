package com.example.student.annotation;

import com.example.student.entity.StudentOnboard;
import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.Payload;

import java.lang.annotation.*;

/**
 * Single validation for:
 * 1. SSC → Intermediate year gap (>= 2 years)
 * 2. Hall ticket year prefix match
 * 3. Course ↔ Branch validation
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = StudentValidation.Validator.class)
@Documented
public @interface StudentValidation {

    String message() default "Student education details are invalid";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    // ================= VALIDATOR =================
    class Validator implements ConstraintValidator<StudentValidation, StudentOnboard> {

        @Override
        public boolean isValid(StudentOnboard student,
                               ConstraintValidatorContext context) {

            if (student == null) {
                return true;
            }

            boolean valid = true;
            context.disableDefaultConstraintViolation();

            /* =====================================================
             * RULE 1: SSC → INTERMEDIATE YEAR GAP (>= 2 YEARS)
             * ===================================================== */
            Integer sscYear = student.getSscPassOutYear();
            Integer interYear = student.getIntermediatePassOutYear();

            if (sscYear != null && interYear != null) {
                if (interYear < sscYear + 2) {
                    context.buildConstraintViolationWithTemplate(
                                    "Intermediate pass out year must be at least 2 years after SSC pass out year"
                            )
                            .addPropertyNode("intermediatePassOutYear")
                            .addConstraintViolation();
                    valid = false;
                }
            }

            /* =====================================================
             * RULE 2: HALL TICKET PREFIX MATCH WITH YEAR
             * ===================================================== */
            String sscHall = student.getSscHallTicketNumber();
            String interHall = student.getIntermediateHallTicketNumber();

            if (sscYear != null && sscHall != null && sscYear.toString().length() == 4) {
                String sscYearSuffix = sscYear.toString().substring(2);
                if (!sscHall.startsWith(sscYearSuffix)) {
                    context.buildConstraintViolationWithTemplate(
                                    "SSC hall ticket number must start with " + sscYearSuffix
                            )
                            .addPropertyNode("sscHallTicketNumber")
                            .addConstraintViolation();
                    valid = false;
                }
            }

            if (interYear != null && interHall != null && interYear.toString().length() == 4) {
                String interYearSuffix = interYear.toString().substring(2);
                if (!interHall.startsWith(interYearSuffix)) {
                    context.buildConstraintViolationWithTemplate(
                                    "Intermediate hall ticket number must start with " + interYearSuffix
                            )
                            .addPropertyNode("intermediateHallTicketNumber")
                            .addConstraintViolation();
                    valid = false;
                }
            }

            /* =====================================================
             * RULE 3: COURSE ↔ BRANCH VALIDATION (NEW)
             * ===================================================== */
            if (student.getCourse() != null && student.getBranch() != null) {
                if (!student.getBranch().getCourse().equals(student.getCourse())) {
                    context.buildConstraintViolationWithTemplate(
                                    "Branch " + student.getBranch()
                                            + " is not allowed for course " + student.getCourse()
                            )
                            .addPropertyNode("branch")
                            .addConstraintViolation();
                    valid = false;
                }
            }

            return valid;
        }
    }
}
