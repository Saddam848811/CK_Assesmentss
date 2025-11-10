import java.util.LinkedHashMap;
import java.util.Map;

class FirstNonRepeatingChar {

    public static void main(String[] args) {

        // String name = "saddsm";
        // String visitedCharacter = "";
        // for(int i = 0; i<name.length() ; i++){

        // String check = name.substring(i+1,name.length());
        // System.out.println(check+"check");
        // if (!visitedCharacter.contains(String.valueOf(name.charAt(i)))) {
        // visitedCharacter = visitedCharacter+name.charAt(i);
        // System.out.println(visitedCharacter+"if inside visited char");

        // if (check.contains(String.valueOf(name.charAt(i)))) {
        // System.out.println("inside if");
        // continue;
        // }else{
        // System.out.println(name.charAt(i)+"//////////////////////////////////////////");
        // break;
        // }
        // }else{
        // System.out.println("outer else");
        // continue;
        // }
        // }

        String name = "saddam";

        Map<Character, Integer> map = new LinkedHashMap<>();
        for (int i = 0; i < name.length(); i++) {
            if (!map.containsKey(name.charAt(i))) {
                map.put(name.charAt(i), 1);
            } else {
                map.put(name.charAt(i), map.get(name.charAt(i)) + 1);
            }
        }

        for (Map.Entry<Character, Integer> number : map.entrySet()) {

            if (number.getValue() == 1) {
                System.out.println(number.getKey());
                break;
            }
        }

        System.out.println(map);

    }
}
