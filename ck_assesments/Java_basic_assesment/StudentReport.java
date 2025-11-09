

class Student{

    String name;
    int subject1;
    int subject2;
    int subject3;


    void CalculateTotalAndAverageMarks(String name ,int subject1,int subject2  ,int subject3){

        int totalMarks = subject1+subject2+subject3;
        int averageMarks = totalMarks/3;
        System.out.println("Total and Average marks of " + name + " is "+totalMarks + " and " + averageMarks);

    }
}


class StudentReport {

    public static void main(String[] args) {

        Student student = new Student();
        

        student.CalculateTotalAndAverageMarks("saddam", 10, 20, 30);
    }
}
