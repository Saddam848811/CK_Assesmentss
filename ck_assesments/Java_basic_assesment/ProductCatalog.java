 class InvalidPriceexception extends Exception{

    public InvalidPriceexception(String message) {
        super(message);
    }

    
 }
 
 class Product{
    int id;
    String name;

    public Product() {
    }

    
    
    public Product(int id, String name, int price) throws InvalidPriceexception {
        if(price<=0){
            throw new InvalidPriceexception("price must be greater than 0");
        }
        this.id = id;
        this.name = name;
        this.price = price;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getPrice() {
        return price;
    }
    public void setPrice (int price) {
        
        this.price = price;
    }
    int price;

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Product{");
        sb.append("id=").append(id);
        sb.append(", name=").append(name);
        sb.append(", price=").append(price);
        sb.append('}');
        return sb.toString();
    }
 }
 class ProductCatalog {
    
    public static void main(String[] args) {
        try {
            
            Product product = new Product(1 ,"cycle" ,1000);
            Product product1 = new Product(2 ,"bike" ,2000);
            Product product2 = new Product(3 ,"helicopter" ,3000);
            Product product3 = new Product(4 ,"plane" ,4000);
            Product product4 = new Product(5 ,"car" ,5000);
            System.out.println(product);
            System.out.println(product1);
            System.out.println(product2);
            System.out.println(product3);
            System.out.println(product4);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
}
