package org.example;

import org.example.Service.AdminService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Main {
    public static void main(String[] args) {

        final Logger LOGGER = (Logger) LogManager.getLogger(Main.class);

        AdminService adminService = new AdminService();
        try {
            adminService.adminMenu();
        } catch (Exception e) {
            LOGGER.info(e.getMessage());
        }
    }
}