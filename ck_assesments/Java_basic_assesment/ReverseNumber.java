class ReverseNumber{

    public static void main(String[] args) {

        int number = 245;
        int reminder = 0;
        int reverse = 0;
        while(number>0){
            
            reminder = number%10;
            reverse = reverse*10 + reminder;
            number   = number/10; 
        }
        System.out.println(reverse);
        
    }

    
}