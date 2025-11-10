
class Logger {
    // Step 1: Private static instance
    private static  Logger instance = new Logger();

    // Step 2: Private constructor
    private Logger() {
        System.out.println("Logger initialized");
    }

    // Step 3: Public static method to access instance
    public static Logger getInstance() {
        return instance;
    }

    public void log(String message) {
        System.out.println("LOG: " + message);
    }
}

public class Main {
    public static void main(String[] args) {
        Logger log1 = Logger.getInstance();
        Logger log2 = Logger.getInstance();
        log1.log("Application started");

        System.out.println(log1 == log2);   
   }
}

