package com.server.server.service;

import com.server.server.enums.Role;
import com.server.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public long getTotalVendorCount() {
        return userRepository.countByRole(Role.VENDOR);
    }

    public long getTotalCustomerCount() {
        return userRepository.countByRole(Role.CUSTOMER);
    }
}
