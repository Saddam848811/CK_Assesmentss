 class ExceptionPropagation {


    void m1() {
        try {
            m2();
        } catch (ArithmeticException e) {
            System.out.println("exception caught in m1");
            e.printStackTrace();
            System.out.println("exception thrown from m1");
            throw e;
        }
    }

    void m2() {
        
        m3(); 
    }

    void m3() {
        System.out.println("exception genarted in m3");
        int result = 10 / 0;

    }

    public static void main(String[] args) {

        ExceptionPropagation ep = new ExceptionPropagation();
        try {
            
            ep.m1();
        } catch (Exception e) {

            e.printStackTrace();
        }
        

    }
}
