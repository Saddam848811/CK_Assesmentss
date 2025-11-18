import java.util.Arrays;
import java.util.List;

// Create a functional interface: NumberRule with method: boolean apply(int n);
@FunctionalInterface
interface NumberRule {

    boolean apply(int n);

}

class JavaEight {

    public static void main(String[] args) {

        List<Integer> nums = Arrays.asList(3, 10, 15, 8, 21, 14, 7);

        // Define two rules using lambda:
        // isEven → returns true if number is even,
        NumberRule nr = (n) -> n % 2 == 0;
        for (Integer i : nums) {
            // System.out.println(nr.apply(i));
        }
        // isPrime → returns true if number is prime
        boolean flag = false;
        NumberRule nr1 = (n) -> {
            boolean copy = flag;
            if(n<2) return false;
            for (int i = 2; i < n; i++) {
                System.out.println(i);   
                if(n%i == 0){
                    copy=true;
                }
            }
            return copy;
        };

            System.out.println(nr1.apply(4));
            if(flag == false){
                System.out.println("Prime");
            }        
      

    }
}
