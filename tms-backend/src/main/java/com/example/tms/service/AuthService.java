package com.example.tms.service;

import com.example.tms.dto.LoginDto;
import com.example.tms.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);

    String login(LoginDto loginDto);
}
