
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

class MergeTwoSortedArraylist {

    public static void main(String[] args) {

        List<Integer> list1 = new ArrayList<>(Arrays.asList(1, 3, 4));
        List<Integer> list2 = new ArrayList<>(Arrays.asList(2, 5,6, 7, 8));

        list1.addAll(list2);

        Collections.sort(list1);
        System.out.println(list1);

    }
}
