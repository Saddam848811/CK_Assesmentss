class CreateThis{
    static int counter = 0;

    public CreateThis() {
        counter = counter+1;
        System.out.println(counter);
    }
    
        

}

class staticCounter {

    
    public static void main(String[] args) {

        CreateThis create = new CreateThis();
        CreateThis create1 = new CreateThis();
        CreateThis create2 = new CreateThis();
        CreateThis create3 = new CreateThis();
        CreateThis create4 = new CreateThis();
        CreateThis create5 = new CreateThis();
        CreateThis create6 = new CreateThis();
        CreateThis create7 = new CreateThis();

        
    }
    
}
