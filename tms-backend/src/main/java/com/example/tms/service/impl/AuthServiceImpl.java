package com.example.tms.service.impl;

import com.example.tms.dto.LoginDto;
import com.example.tms.dto.RegisterDto;
import com.example.tms.entity.Role;
import com.example.tms.entity.User;
import com.example.tms.exception.TodoAPIException;
import com.example.tms.repository.RoleRepository;
import com.example.tms.repository.UserRepository;
import com.example.tms.security.JwtTokenProvider;
import com.example.tms.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public String register(RegisterDto registerDto) {

        // check username already exists in database
        if (userRepository.existsByEmail(registerDto.getEmail()) || userRepository.existsByUsername(registerDto.getUsername())){
            throw new TodoAPIException("Username already exists.");
        }

        // check email already exists in database
        if (userRepository.existsByEmail(registerDto.getEmail())){
            throw new TodoAPIException("Email already exists.");
        }

        User user = new User();
        user.setName(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        // The role is added like this for now
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName("ROLE_USER");
        roles.add(userRole);
        user.setRoles(roles);
        userRepository.save(user);
        return "User registered successfully.";
    }

    @Override
    public String login(LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(),
                loginDto.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtTokenProvider.generateToken(authentication);
    }
}
