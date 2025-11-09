 class FactorialCalculator {

    public static void main(String[] args) {
        
        int number = 5;
        int factorial = 1;
        while(number>0){
            factorial = number*factorial;
            number = number-1;
        }          
        System.out.println(factorial);
    }
}
