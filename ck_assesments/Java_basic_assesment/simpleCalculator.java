 class simpleCalculator {
    
    int add(int a, int b){
        return a+b;
    }
    int subtract(int a, int b){
        return a-b;
    }
    int  multiply(int a, int b){
        return a*b;
    }
    int  divide(int a, int b){
        return a/b;
    }
        public static void main(String[] args) {
            simpleCalculator obj  = new simpleCalculator();
            obj.add(10, 20);
            obj.divide(20, 10);
            obj.multiply(10, 20);
            obj.subtract(20, 10); 
            System.out.println(obj.add(10, 20));
            System.out.println(obj.divide(20, 10));
            System.out.println(obj.multiply(10, 20));
            System.out.println(obj.subtract(20, 10));


        }
}
