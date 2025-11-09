
import java.util.ArrayList;
import java.util.List;

class Customer{
    int id;
    String name;
    String email;

    public Customer() {
    }

    

    public Customer(String name, int id ,String email) {
        this.name  =name;
        this.id = id;
        this.email = email;
        
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Customer{");
        sb.append("id=").append(id);
        sb.append(", name=").append(name);
        sb.append(", email=").append(email);
        sb.append('}');
        return sb.toString();
    }

    
}
class CustomerPOJO {

    public static void main(String[] args) {
        
        Customer customer1 = new Customer("saddam" ,1 ,"sh@gmail.com");
        Customer customer2 = new Customer("saddam" ,1 ,"sh@gmail.com");
        Customer customer3 = new Customer("saddam" ,1 ,"sh@gmail.com");
    
        List<Customer> list = new ArrayList<>();
        list.add(customer1);
        list.add(customer2);
        list.add(customer3);

        for (Customer customer : list) {
            System.out.println(customer);
        }

    }


    
}
