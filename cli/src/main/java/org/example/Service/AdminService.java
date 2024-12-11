package org.example.Service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.naming.ConfigurationException;
import java.util.Scanner;

public class AdminService {
    private static final Logger LOGGER = (Logger) LogManager.getLogger(AdminService.class);

    public void adminMenu() throws ConfigurationException {
        System.out.println("======= Please select an option =============");
        System.out.println("1. Create Event Configuration");
        System.out.println("2. View Event Configuration");
        System.out.println("3. Add more tickets to the event");
        System.out.println("4. Start Server");
        System.out.println("5. Stop Server (Only if the server is running)");
        System.out.println("6. Exit");

        Scanner scanner = new Scanner(System.in);
        int choice = scanner.nextInt();

        ConfigurationService configurationService = new ConfigurationService();

        switch (choice) {
            case 1:
                configurationService.createConfig();
                adminMenu();
                break;
            case 2:
                configurationService.viewConfigData();
                adminMenu();
                break;
            case 3:
                configurationService.addTicket();
                adminMenu();
                break;
            case 4:

                break;
            case 5:

                break;
            case 6:
                System.exit(0);
                break;
            default:
                LOGGER.info("Invalid choice");
                adminMenu();
        }

    }
}
