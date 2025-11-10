import java.util.ArrayList;
import java.util.List;

class IntegerHavingTragetSum {

    public static void main(String[] args) {

        int array[] = { 4, 5, 1, 3, 4, 7 };
        int targetSum = 6;
        // return indexes for two numbers having target sum

        List<Integer> list = new ArrayList<>(); 
        for (int i = 0; i < array.length; i++) {
            list.add(array[i]);
        }

        for (int i = 0; i < list.size(); i++) {
            int number = targetSum - list.get(i);
            if (list.contains(number)) {
                System.out.println(list.indexOf(list.get(i)) + " + "+list.indexOf(number) + " has the target sum " + targetSum);
            break;
            }
        }
        System.out.println(list);


        // Map<Integer, Integer> map= new HashMap<>();
        // map.put(4, 0);
        // map.put(4, 1);
        // System.out.println(map);

    }
}
