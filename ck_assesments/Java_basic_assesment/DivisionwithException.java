
import java.util.Scanner;

public class DivisionwithException {

    
    public static void main(String[] args) {
        
        Scanner scanner = new Scanner(System.in);
        int number1 = scanner.nextInt();
        int number2 = scanner.nextInt();

        try {

            int result = number1/number2;
        } catch (Exception e) {
            e.printStackTrace();
        }
        finally{
            System.out.println("division completed");
        }
    }
}
