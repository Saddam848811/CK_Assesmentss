class Car{

    String modelName;
    int price;

    public Car(String modelName) {
        this.modelName = modelName;

        System.out.println("this car is :"+ modelName);
    }

    public Car(String modelName, int price) {
        
        this.modelName = modelName;
        this.price = price;

        System.out.println("this car is :"+ modelName + " and price is : "+ price);


    }
    

    
}
class ConstructorOverloading {

    public static void main(String[] args) {
        
        Car car = new Car("BMW");
        Car car1 = new Car("porsh" ,1000000);
    }
    
}
