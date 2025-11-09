class MathUtils{

    int number1;
    int number2;
    int number3;

    public MathUtils(int num1 ,int num2 ,int num3) {
    
        this.number1 = num1;
        this.number2 = num2;
        this.number3 = num3;
    }

    

    static void max(int number1, int number2, int number3){

        int num = 0;
        if(number1 > num){
            num = number1;
        }if(number2>num){
            num = number2;
        }if (number3>num) {
            num = number3;
        }
        System.out.println(num +" is the maximum ");

    }
    static  void min(int number1, int number2 ,int number3){
        int num = number1;
        if(number1 < num){
            num = number1;
        }if(number2<num){
            num = number2;
        }if (number3<num) {
            num = number3;
        }
        System.out.println(num +" is the manimum ");
    }
    static void average(int num1 ,int num2 ,int num3){
        int average = (num1+num2+num3)/3;
        System.out.println(average + " is the average ");
    }
}

class StaticUtilityClass {
    
    public static void main(String[] args) {
        
        MathUtils.max(10,20,30);
        MathUtils.min(40,20,30);
        MathUtils.average(10,20,30);
    }
}
