
import java.util.ArrayList;
import java.util.List;

interface  Employee{

    void calculateSalary();
}

class ParttimeEmployee implements  Employee{

    @Override
    public void calculateSalary() {
        System.out.println("salary for Partime employee");
        
    }

    

}
class FulltimeEmployee implements Employee{

    @Override
    public void calculateSalary() {
        System.out.println("salary for Fulltime employee");

    }

    
}

class EmployeeManagementSystem {
    
    public static void main(String[] args) {
        
            Employee emp = new ParttimeEmployee();
            Employee emp1 = new FulltimeEmployee();
            List<Employee> list = new ArrayList<>();
            list.add(emp);
            list.add(emp1);
          
            for (Employee employee : list) {
                employee.calculateSalary();
            }
    }
}
