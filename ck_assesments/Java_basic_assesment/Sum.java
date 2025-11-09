class Sum{

    public static void main(String[] args) {

        int number = 245;
        int sum = 0;
       int reminder = 0;
        while(number>0){
            reminder = number%10;
           sum = sum + reminder;
           number = number/10;
        }
        System.out.println(sum);
        
    }

    
}