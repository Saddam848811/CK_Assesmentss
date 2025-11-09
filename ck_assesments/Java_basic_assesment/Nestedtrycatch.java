 class Nestedtrycatch {

    public static void main(String[] args) {
        

        try{

            

            try {

                int result = 10/0;
                
            } catch (ArithmeticException e) {
                System.out.println("this is an arithmetic exception-----------");
                e.printStackTrace();
            }

            int array[] = new int[5];
            array[6] = 0;

        }catch(ArrayIndexOutOfBoundsException e){
            System.out.println("this is an array out of index exception------------");
            e.printStackTrace();
        }
    }



}
