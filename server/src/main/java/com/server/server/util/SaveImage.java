import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

public class SaveImage {

    public static String saveImage(String base64Image) {
        try {
            String base64Data = base64Image.split(",")[1];
            byte[] imageBytes = Base64.getDecoder().decode(base64Data);

            String fileName = UUID.randomUUID() + ".png";
            Path imagePath = Paths.get("path/to/save/images/" + fileName);

            // Create directory if it doesn't exist
            Files.createDirectories(imagePath.getParent());
            Files.write(imagePath, imageBytes);

            return imagePath.toString();  // Return the saved image path
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image", e);
        }
    }
}
