package com.fpt.hhtlmilkteaapi.controller;


import com.fpt.hhtlmilkteaapi.config.ERole;
import com.fpt.hhtlmilkteaapi.entity.Role;
import com.fpt.hhtlmilkteaapi.entity.User;
import com.fpt.hhtlmilkteaapi.payload.request.AuthRequest;
import com.fpt.hhtlmilkteaapi.payload.request.LoginRequest;
import com.fpt.hhtlmilkteaapi.payload.request.SignupRequest;
import com.fpt.hhtlmilkteaapi.payload.response.JwtResponse;
import com.fpt.hhtlmilkteaapi.payload.response.MessageResponse;
import com.fpt.hhtlmilkteaapi.repository.IRoleRepository;
import com.fpt.hhtlmilkteaapi.repository.IUserRepository;
import com.fpt.hhtlmilkteaapi.security.jwt.JwtUtils;
import com.fpt.hhtlmilkteaapi.security.service.CustomizeUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IRoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Value("${javadocfast.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        CustomizeUser customizeUser = (CustomizeUser) authentication.getPrincipal();
        List<String> roles = customizeUser.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(
                new JwtResponse(
                        jwt,
                        new Date(new Date().getTime() + jwtExpirationMs).getTime(),
                        customizeUser.getId(),
                        customizeUser.getUsername(),
                        customizeUser.getFullName(),
                        customizeUser.getBirthday(),
                        customizeUser.getAddress(),
                        customizeUser.getPhone(),
                        customizeUser.getLinkImage(),
                        customizeUser.getNameImage(),
                        customizeUser.getEmail(),
                        roles,
                        customizeUser.getCreatedAt(),
                        customizeUser.getUpdatedAt()
                )
        );
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.ok(new MessageResponse("T??i kho???n n??y ???? ???????c s??? d???ng"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.ok(new MessageResponse("Email n??y ???? ???????c s??? d???ng"));
        }

        // Create new user's account
        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword())
        );

        user.setFullName(signUpRequest.getUsername());

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null || strRoles.size() == 0) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                        roles.add(adminRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                        roles.add(userRole);
                        break;
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("????ng k?? th??nh c??ng"));
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> checkEmail(@PathVariable String email) {
        if(!userRepository.existsByEmailAndEmailNotLike(email, "admin@gmail.com")) {
            return ResponseEntity.ok(new MessageResponse("Email n??y ch??a ????ng k??"));
        }
        return ResponseEntity.ok(new MessageResponse("Email n??y ???? ????ng k??"));
    }

    @PostMapping("/reset-pass")
    public ResponseEntity<?> updatePassword(@RequestBody AuthRequest authRequest) {

        if(!userRepository.existsByEmail(authRequest.getEmail())) {
            return ResponseEntity.ok(new MessageResponse("Kh??ng t??m th???y email n??y"));
        }

        User user = userRepository.findByEmail(authRequest.getEmail()).get();
        user.setPassword(encoder.encode(authRequest.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok(HttpStatus.OK);
    }

}
